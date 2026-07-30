from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.procurement import (
    create_procurement_request,
    get_all_procurement_requests,
    get_procurement_request_by_id,
    update_procurement_request,
    delete_procurement_request,
    get_procurement_request_by_number,
    create_procurement_item,
    get_all_procurement_items,
    get_procurement_item_by_id,
    update_procurement_item,
    delete_procurement_item,
    get_procurement_request_by_id,
    create_vendor_quotation,
    get_all_vendor_quotations,
    get_vendor_quotation_by_id,
    update_vendor_quotation,
    delete_vendor_quotation,
    get_vendor_quotation_by_number,
    create_vendor_quotation_item,
    get_all_vendor_quotation_items,
    get_vendor_quotation_item_by_id,
    update_vendor_quotation_item,
    delete_vendor_quotation_item,
)

from app.schemas.procurement import (
    ProcurementRequestCreate,
    ProcurementRequestUpdate,
    ProcurementItemCreate,
    ProcurementItemUpdate,
    VendorQuotationCreate,
    VendorQuotationUpdate,
)

async def create_procurement_request_service(
    db: AsyncSession,
    procurement_data: ProcurementRequestCreate,
):
    existing_request = await get_procurement_request_by_number(
        db,
        procurement_data.request_number,
    )

    if existing_request:
        raise HTTPException(
            status_code=409,
            detail="Procurement request number already exists.",
        )

    return await create_procurement_request(
        db,
        procurement_data,
    )

async def get_all_procurement_requests_service(
    db: AsyncSession,
):
    procurement_requests = await get_all_procurement_requests(db)

    return {
        "items": procurement_requests,
        "total": len(procurement_requests),
    }

async def get_procurement_request_by_id_service(
    db: AsyncSession,
    procurement_request_id: UUID,
):
    procurement_request = await get_procurement_request_by_id(
        db,
        procurement_request_id,
    )

    if not procurement_request:
        raise HTTPException(
            status_code=404,
            detail="Procurement request not found.",
        )

    return procurement_request

async def update_procurement_request_service(
    db: AsyncSession,
    procurement_request_id: UUID,
    procurement_data: ProcurementRequestUpdate,
):
    procurement_request = await get_procurement_request_by_id(
        db,
        procurement_request_id,
    )

    if not procurement_request:
        raise HTTPException(
            status_code=404,
            detail="Procurement request not found.",
        )

    return await update_procurement_request(
        db,
        procurement_request,
        procurement_data,
    )

async def delete_procurement_request_service(
    db: AsyncSession,
    procurement_request_id: UUID,
):
    procurement_request = await get_procurement_request_by_id(
        db,
        procurement_request_id,
    )

    if not procurement_request:
        raise HTTPException(
            status_code=404,
            detail="Procurement request not found.",
        )

    return await delete_procurement_request(
        db,
        procurement_request,
    )

async def create_procurement_item_service(
    db: AsyncSession,
    item_data: ProcurementItemCreate,
):
    procurement_request = await get_procurement_request_by_id(
        db,
        item_data.request_id,
    )

    if not procurement_request:
        raise HTTPException(
            status_code=404,
            detail="Procurement request not found.",
        )

    return await create_procurement_item(
        db=db,
        item_data=item_data,
    )


async def get_all_procurement_items_service(
    db: AsyncSession,
):
    items = await get_all_procurement_items(db)

    return {
        "items": items,
        "total": len(items),
    }


async def get_procurement_item_by_id_service(
    db: AsyncSession,
    procurement_item_id: UUID,
):
    item = await get_procurement_item_by_id(
        db,
        procurement_item_id,
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Procurement item not found.",
        )

    return item


async def update_procurement_item_service(
    db: AsyncSession,
    procurement_item_id: UUID,
    item_data: ProcurementItemUpdate,
):
    item = await get_procurement_item_by_id(
        db,
        procurement_item_id,
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Procurement item not found.",
        )

    return await update_procurement_item(
        db,
        item,
        item_data,
    )


async def delete_procurement_item_service(
    db: AsyncSession,
    procurement_item_id: UUID,
):
    item = await get_procurement_item_by_id(
        db,
        procurement_item_id,
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Procurement item not found.",
        )

    return await delete_procurement_item(
        db,
        item,
    )

async def create_vendor_quotation_service(
    db: AsyncSession,
    quotation_data: VendorQuotationCreate,
):
    existing_quotation = await get_vendor_quotation_by_number(
        db,
        quotation_data.quotation_number,
    )

    if existing_quotation:
        raise HTTPException(
            status_code=409,
            detail=f"Vendor quotation '{quotation_data.quotation_number}' already exists.",
        )

    return await create_vendor_quotation(
        db=db,
        quotation_data=quotation_data,
    )


async def get_all_vendor_quotations_service(
    db: AsyncSession,
):
    quotations = await get_all_vendor_quotations(db)

    return {
        "items": quotations,
        "total": len(quotations),
    }


async def get_vendor_quotation_by_id_service(
    db: AsyncSession,
    quotation_id: UUID,
):
    quotation = await get_vendor_quotation_by_id(
        db,
        quotation_id,
    )

    if not quotation:
        raise HTTPException(
            status_code=404,
            detail="Vendor quotation not found.",
        )

    return quotation


async def update_vendor_quotation_service(
    db: AsyncSession,
    quotation_id: UUID,
    quotation_data: VendorQuotationUpdate,
):
    quotation = await get_vendor_quotation_by_id(
        db,
        quotation_id,
    )

    if not quotation:
        raise HTTPException(
            status_code=404,
            detail="Vendor quotation not found.",
        )

    return await update_vendor_quotation(
        db,
        quotation,
        quotation_data,
    )


async def delete_vendor_quotation_service(
    db: AsyncSession,
    quotation_id: UUID,
):
    quotation = await get_vendor_quotation_by_id(
        db,
        quotation_id,
    )

    if not quotation:
        raise HTTPException(
            status_code=404,
            detail="Vendor quotation not found.",
        )

    return await delete_vendor_quotation(
        db,
        quotation,
    )

async def create_vendor_quotation_item_service(
    db: AsyncSession,
    item_data: VendorQuotationItemCreate,
):
    return await create_vendor_quotation_item(
        db=db,
        item_data=item_data,
    )

async def get_all_vendor_quotation_items_service(
    db: AsyncSession,
):
    items = await get_all_vendor_quotation_items(db)

    return {
        "items": items,
        "total": len(items),
    }

async def get_vendor_quotation_item_by_id_service(
    db: AsyncSession,
    quotation_item_id: UUID,
):
    item = await get_vendor_quotation_item_by_id(
        db,
        quotation_item_id,
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Vendor quotation item not found.",
        )

    return item

async def update_vendor_quotation_item_service(
    db: AsyncSession,
    quotation_item_id: UUID,
    item_data: VendorQuotationItemUpdate,
):
    item = await get_vendor_quotation_item_by_id(
        db,
        quotation_item_id,
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Vendor quotation item not found.",
        )

    return await update_vendor_quotation_item(
        db,
        item,
        item_data,
    )

async def delete_vendor_quotation_item_service(
    db: AsyncSession,
    quotation_item_id: UUID,
):
    item = await get_vendor_quotation_item_by_id(
        db,
        quotation_item_id,
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Vendor quotation item not found.",
        )

    return await delete_vendor_quotation_item(
        db,
        item,
    )