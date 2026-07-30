from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.vendor import (
    create_vendor,
    get_vendor_by_tax_identifier,
    get_all_vendors,
    get_vendor_by_id,
    update_vendor,
    delete_vendor,
)

from uuid import UUID
from app.schemas.vendor import (
    VendorCreate,
    VendorUpdate,
)

async def create_vendor_service(
    db: AsyncSession,
    vendor_data: VendorCreate,
):
    """
    Create a new vendor after validating
    that the tax identifier is unique.
    """

    existing_vendor = await get_vendor_by_tax_identifier(
        db,
        vendor_data.tax_identifier,
    )

    if existing_vendor:
        raise HTTPException(
            status_code=409,
            detail=f"Vendor with tax identifier '{vendor_data.tax_identifier}' already exists.",        
        )

    return await create_vendor(
        db=db,
        vendor_data=vendor_data,
    )

async def get_all_vendors_service(
    db: AsyncSession,
):
    vendors = await get_all_vendors(db)

    return {
        "items": vendors,
        "total": len(vendors),
    }

async def get_vendor_by_id_service(
    db: AsyncSession,
    vendor_id: UUID,
):
    vendor = await get_vendor_by_id(
        db,
        vendor_id,
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found.",
        )

    return vendor

async def update_vendor_service(
    db: AsyncSession,
    vendor_id: UUID,
    vendor_data: VendorUpdate,
):
    vendor = await get_vendor_by_id(
        db,
        vendor_id,
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found.",
        )

    return await update_vendor(
        db,
        vendor,
        vendor_data,
    )

async def delete_vendor_service(
    db: AsyncSession,
    vendor_id: UUID,
):
    vendor = await get_vendor_by_id(
        db,
        vendor_id,
    )

    if not vendor:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found.",
        )

    return await delete_vendor(
        db,
        vendor,
    )