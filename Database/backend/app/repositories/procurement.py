from datetime import UTC, datetime
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.procurement import (
    ProcurementRequest,
    ProcurementItem,
)
from app.schemas.procurement import (
    ProcurementRequestCreate,
    ProcurementRequestUpdate,
    ProcurementItemCreate,
    ProcurementItemUpdate,
)

async def create_procurement_request(
    db: AsyncSession,
    procurement_data: ProcurementRequestCreate,
):
    procurement_request = ProcurementRequest(
        request_number=procurement_data.request_number,
        requested_by_user_id=procurement_data.requested_by_user_id,
        department=procurement_data.department,
        status=procurement_data.status,
        needed_by=procurement_data.needed_by,
        business_justification=procurement_data.business_justification,
    )

    db.add(procurement_request)

    await db.commit()
    await db.refresh(procurement_request)

    return procurement_request

async def get_all_procurement_requests(
    db: AsyncSession,
):
    result = await db.execute(
        select(ProcurementRequest).where(
            ProcurementRequest.deleted_at.is_(None)
        )
    )

    return result.scalars().all()

async def get_procurement_request_by_id(
    db: AsyncSession,
    procurement_request_id: UUID,
):
    result = await db.execute(
        select(ProcurementRequest).where(
            ProcurementRequest.id == procurement_request_id,
            ProcurementRequest.deleted_at.is_(None),
        )
    )

    return result.scalar_one_or_none()

async def update_procurement_request(
    db: AsyncSession,
    procurement_request: ProcurementRequest,
    procurement_data: ProcurementRequestUpdate,
):
    update_data = procurement_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(procurement_request, key, value)

    await db.commit()
    await db.refresh(procurement_request)

    return procurement_request

async def delete_procurement_request(
    db: AsyncSession,
    procurement_request: ProcurementRequest,
):
    procurement_request.deleted_at = datetime.now(UTC)

    await db.commit()
    await db.refresh(procurement_request)

    return procurement_request

async def get_procurement_request_by_number(
    db: AsyncSession,
    request_number: str,
):
    result = await db.execute(
        select(ProcurementRequest).where(
            ProcurementRequest.request_number == request_number,
            ProcurementRequest.deleted_at.is_(None),
        )
    )

    return result.scalar_one_or_none()

async def create_procurement_item(
    db: AsyncSession,
    item_data: ProcurementItemCreate,
):
    procurement_item = ProcurementItem(
        request_id=item_data.request_id,
        sku=item_data.sku,
        description=item_data.description,
        quantity=item_data.quantity,
        unit_of_measure=item_data.unit_of_measure,
        estimated_unit_price=item_data.estimated_unit_price,
    )

    db.add(procurement_item)

    await db.commit()
    await db.refresh(procurement_item)

    return procurement_item


async def get_all_procurement_items(
    db: AsyncSession,
):
    result = await db.execute(
        select(ProcurementItem)
    )

    return result.scalars().all()


async def get_procurement_item_by_id(
    db: AsyncSession,
    procurement_item_id: UUID,
):
    result = await db.execute(
        select(ProcurementItem).where(
            ProcurementItem.id == procurement_item_id
        )
    )

    return result.scalar_one_or_none()


async def update_procurement_item(
    db: AsyncSession,
    procurement_item: ProcurementItem,
    item_data: ProcurementItemUpdate,
):
    update_data = item_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(procurement_item, key, value)

    await db.commit()
    await db.refresh(procurement_item)

    return procurement_item


async def delete_procurement_item(
    db: AsyncSession,
    procurement_item: ProcurementItem,
):
    await db.delete(procurement_item)

    await db.commit()

    return procurement_item

from app.models.procurement import VendorQuotation
from app.schemas.procurement import (
    VendorQuotationCreate,
    VendorQuotationUpdate,
)

async def create_vendor_quotation(
    db: AsyncSession,
    quotation_data: VendorQuotationCreate,
):
    quotation = VendorQuotation(
        quotation_number=quotation_data.quotation_number,
        request_id=quotation_data.request_id,
        vendor_id=quotation_data.vendor_id,
        status=quotation_data.status,
        valid_until=quotation_data.valid_until,
        currency=quotation_data.currency,
        total_amount=quotation_data.total_amount,
    )

    db.add(quotation)

    await db.commit()
    await db.refresh(quotation)

    return quotation


async def get_all_vendor_quotations(
    db: AsyncSession,
):
    result = await db.execute(
        select(VendorQuotation).where(
            VendorQuotation.deleted_at.is_(None)
        )
    )

    return result.scalars().all()


async def get_vendor_quotation_by_id(
    db: AsyncSession,
    quotation_id: UUID,
):
    result = await db.execute(
        select(VendorQuotation).where(
            VendorQuotation.id == quotation_id,
            VendorQuotation.deleted_at.is_(None),
        )
    )

    return result.scalar_one_or_none()


async def update_vendor_quotation(
    db: AsyncSession,
    quotation: VendorQuotation,
    quotation_data: VendorQuotationUpdate,
):
    update_data = quotation_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(quotation, key, value)

    await db.commit()
    await db.refresh(quotation)

    return quotation

async def delete_vendor_quotation(
    db: AsyncSession,
    quotation: VendorQuotation,
):
    quotation.deleted_at = datetime.now(UTC)

    await db.commit()
    await db.refresh(quotation)

    return quotation


async def get_vendor_quotation_by_number(
    db: AsyncSession,
    quotation_number: str,
):
    result = await db.execute(
        select(VendorQuotation).where(
            VendorQuotation.quotation_number == quotation_number,
            VendorQuotation.deleted_at.is_(None),
        )
    )

    return result.scalar_one_or_none()

from app.models.procurement import VendorQuotationItem
from app.schemas.procurement import (
    VendorQuotationItemCreate,
    VendorQuotationItemUpdate,
)

async def create_vendor_quotation_item(
    db: AsyncSession,
    item_data: VendorQuotationItemCreate,
):
    quotation_item = VendorQuotationItem(
        quotation_id=item_data.quotation_id,
        procurement_item_id=item_data.procurement_item_id,
        quantity=item_data.quantity,
        unit_price=item_data.unit_price,
    )

    db.add(quotation_item)

    await db.commit()
    await db.refresh(quotation_item)

    return quotation_item

async def get_all_vendor_quotation_items(
    db: AsyncSession,
):
    result = await db.execute(
    select(VendorQuotationItem)
)
    return result.scalars().all()

async def get_vendor_quotation_item_by_id(
    db: AsyncSession,
    quotation_item_id: UUID,
):
    result = await db.execute(
    select(VendorQuotationItem).where(
        VendorQuotationItem.id == quotation_item_id,
    )
)

    return result.scalar_one_or_none()

async def update_vendor_quotation_item(
    db: AsyncSession,
    quotation_item: VendorQuotationItem,
    item_data: VendorQuotationItemUpdate,
):
    update_data = item_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(quotation_item, key, value)

    await db.commit()
    await db.refresh(quotation_item)

    return quotation_item

async def delete_vendor_quotation_item(
    db: AsyncSession,
    quotation_item: VendorQuotationItem,
):
    await db.delete(quotation_item)
    await db.commit()

    return quotation_item