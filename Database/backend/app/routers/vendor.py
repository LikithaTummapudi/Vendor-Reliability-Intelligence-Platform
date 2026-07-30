from uuid import UUID
from fastapi import Path
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, Path

from app.db.session import get_db
from app.schemas.vendor import (
    VendorCreate,
    VendorUpdate,
    VendorResponse,
    VendorListResponse,
    VendorRead,
)

from app.services.vendor import (
    create_vendor_service,
    get_all_vendors_service,
    get_vendor_by_id_service,
    update_vendor_service,
    delete_vendor_service,
)

router = APIRouter(
    prefix="/vendors",
    tags=["Vendor Management"],
)

@router.post("/", response_model=VendorResponse)
async def create_vendor(
    vendor_data: VendorCreate,
    db: AsyncSession = Depends(get_db),
):
    return await create_vendor_service(
        db=db,
        vendor_data=vendor_data,
    )

@router.get("/", response_model=VendorListResponse)
async def get_all_vendors(
    db: AsyncSession = Depends(get_db),
):
    return await get_all_vendors_service(db)

@router.get("/{vendor_id}", response_model=VendorRead)
async def get_vendor_by_id(
    vendor_id: UUID = Path(...),
    db: AsyncSession = Depends(get_db),
):
    return await get_vendor_by_id_service(
        db=db,
        vendor_id=vendor_id,
    )

@router.put("/{vendor_id}", response_model=VendorResponse)
async def update_vendor(
    vendor_id: UUID,
    vendor_data: VendorUpdate,
    db: AsyncSession = Depends(get_db),
):
    return await update_vendor_service(
        db=db,
        vendor_id=vendor_id,
        vendor_data=vendor_data,
    )

@router.delete("/{vendor_id}")
async def delete_vendor(
    vendor_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    await delete_vendor_service(
        db=db,
        vendor_id=vendor_id,
    )

    return {
        "message": "Vendor deleted successfully."
    } 