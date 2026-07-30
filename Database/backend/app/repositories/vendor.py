from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.vendor import Vendor
from app.schemas.vendor import VendorCreate

from datetime import datetime, UTC

async def create_vendor(
    db: AsyncSession,
    vendor_data: VendorCreate,
):
    vendor = Vendor(
        category_id=vendor_data.category_id,
        legal_name=vendor_data.legal_name,
        display_name=vendor_data.display_name,
        tax_identifier=vendor_data.tax_identifier,
        registration_number=vendor_data.registration_number,
        website=vendor_data.website,
        status=vendor_data.status,
        onboarding_date=vendor_data.onboarding_date,
    )
    db.add(vendor)
    await db.commit()
    await db.refresh(vendor)

    return vendor

async def get_all_vendors(
    db: AsyncSession,
):
    result = await db.execute(
        select(Vendor).where(
            Vendor.deleted_at.is_(None)
        )
    )

    return result.scalars().all()

from uuid import UUID

async def get_vendor_by_id(
    db: AsyncSession,
    vendor_id: UUID,
):
    result = await db.execute(
        select(Vendor).where(
            Vendor.id == vendor_id,
            Vendor.deleted_at.is_(None)
        )
    )

    return result.scalar_one_or_none()

from app.schemas.vendor import VendorUpdate

async def update_vendor(
    db: AsyncSession,
    vendor: Vendor,
    vendor_data: VendorUpdate,
):
    update_data = vendor_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(vendor, key, value)

    await db.commit()
    await db.refresh(vendor)

    return vendor

async def delete_vendor(
    db: AsyncSession,
    vendor: Vendor,
):
    vendor.deleted_at = datetime.now(UTC)

    await db.commit()
    await db.refresh(vendor)

    return vendor

async def get_vendor_by_tax_identifier(
    db: AsyncSession,
    tax_identifier: str,
):
    result = await db.execute(
        select(Vendor).where(
            Vendor.tax_identifier == tax_identifier,
            Vendor.deleted_at.is_(None)
        )
    )

    return result.scalar_one_or_none()