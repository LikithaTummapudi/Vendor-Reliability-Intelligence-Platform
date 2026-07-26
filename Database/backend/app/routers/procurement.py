from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.schemas.procurement import (
    ProcurementRequestCreate,
    ProcurementRequestUpdate,
    ProcurementRequestResponse,
    ProcurementRequestListResponse,
    ProcurementItemCreate,
    ProcurementItemUpdate,
    ProcurementItemResponse,
    ProcurementItemListResponse,
    VendorQuotationCreate,
    VendorQuotationUpdate,
    VendorQuotationResponse,
    VendorQuotationListResponse,
    VendorQuotationItemCreate,
    VendorQuotationItemUpdate,
    VendorQuotationItemResponse,
    VendorQuotationItemListResponse,
)
from app.services.procurement import (
    create_procurement_request_service,
    get_all_procurement_requests_service,
    get_procurement_request_by_id_service,
    update_procurement_request_service,
    delete_procurement_request_service,
    create_procurement_item_service,
    get_all_procurement_items_service,
    get_procurement_item_by_id_service,
    update_procurement_item_service,
    delete_procurement_item_service,
    create_vendor_quotation_service,
    get_all_vendor_quotations_service,
    get_vendor_quotation_by_id_service,
    update_vendor_quotation_service,
    delete_vendor_quotation_service,
    create_vendor_quotation_item_service,
    get_all_vendor_quotation_items_service,
    get_vendor_quotation_item_by_id_service,
    update_vendor_quotation_item_service,
    delete_vendor_quotation_item_service,
)

router = APIRouter(
    prefix="/procurement-requests",
    tags=["Procurement Management"],
)

@router.post("/", response_model=ProcurementRequestResponse)
async def create_procurement_request(
    procurement_data: ProcurementRequestCreate,
    db: AsyncSession = Depends(get_db),
):
    return await create_procurement_request_service(
        db=db,
        procurement_data=procurement_data,
    )

@router.get("/", response_model=ProcurementRequestListResponse)
async def get_all_procurement_requests(
    db: AsyncSession = Depends(get_db),
):
    return await get_all_procurement_requests_service(db=db)

# Procurement Item APIs
@router.post(
    "/procurement-items",
    response_model=ProcurementItemResponse,
)
async def create_procurement_item(
    item_data: ProcurementItemCreate,
    db: AsyncSession = Depends(get_db),
):
    return await create_procurement_item_service(
        db=db,
        item_data=item_data,
    )

@router.get(
    "/procurement-items",
    response_model=ProcurementItemListResponse,
)
async def get_all_procurement_items(
    db: AsyncSession = Depends(get_db),
):
    return await get_all_procurement_items_service(db)

@router.get(
    "/procurement-items/{procurement_item_id}",
    response_model=ProcurementItemResponse,
)
async def get_procurement_item_by_id(
    procurement_item_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    return await get_procurement_item_by_id_service(
        db=db,
        procurement_item_id=procurement_item_id,
    )

@router.put(
    "/procurement-items/{procurement_item_id}",
    response_model=ProcurementItemResponse,
)
async def update_procurement_item(
    procurement_item_id: UUID,
    item_data: ProcurementItemUpdate,
    db: AsyncSession = Depends(get_db),
):
    return await update_procurement_item_service(
        db=db,
        procurement_item_id=procurement_item_id,
        item_data=item_data,
    )

@router.delete(
    "/procurement-items/{procurement_item_id}",
    response_model=ProcurementItemResponse,
)
async def delete_procurement_item(
    procurement_item_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    return await delete_procurement_item_service(
        db=db,
        procurement_item_id=procurement_item_id,
    )

@router.post(
    "/vendor-quotations",
    response_model=VendorQuotationResponse,
)
async def create_vendor_quotation(
    quotation_data: VendorQuotationCreate,
    db: AsyncSession = Depends(get_db),
):
    return await create_vendor_quotation_service(
        db=db,
        quotation_data=quotation_data,
    )


@router.get(
    "/vendor-quotations",
    response_model=VendorQuotationListResponse,
)
async def get_all_vendor_quotations(
    db: AsyncSession = Depends(get_db),
):
    return await get_all_vendor_quotations_service(db)


@router.get(
    "/vendor-quotations/{quotation_id}",
    response_model=VendorQuotationResponse,
)
async def get_vendor_quotation_by_id(
    quotation_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    return await get_vendor_quotation_by_id_service(
        db=db,
        quotation_id=quotation_id,
    )


@router.put(
    "/vendor-quotations/{quotation_id}",
    response_model=VendorQuotationResponse,
)
async def update_vendor_quotation(
    quotation_id: UUID,
    quotation_data: VendorQuotationUpdate,
    db: AsyncSession = Depends(get_db),
):
    return await update_vendor_quotation_service(
        db=db,
        quotation_id=quotation_id,
        quotation_data=quotation_data,
    )

@router.delete(
    "/vendor-quotations/{quotation_id}",
    response_model=VendorQuotationResponse,
)
async def delete_vendor_quotation(
    quotation_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    return await delete_vendor_quotation_service(
        db=db,
        quotation_id=quotation_id,
    )

@router.post(
    "/vendor-quotation-items",
    response_model=VendorQuotationItemResponse,
)
async def create_vendor_quotation_item(
    item_data: VendorQuotationItemCreate,
    db: AsyncSession = Depends(get_db),
):
    return await create_vendor_quotation_item_service(
        db=db,
        item_data=item_data,
    )

@router.get(
    "/vendor-quotation-items",
    response_model=VendorQuotationItemListResponse,
)
async def get_all_vendor_quotation_items(
    db: AsyncSession = Depends(get_db),
):
    return await get_all_vendor_quotation_items_service(db)

@router.get(
    "/vendor-quotation-items/{quotation_item_id}",
    response_model=VendorQuotationItemResponse,
)
async def get_vendor_quotation_item_by_id(
    quotation_item_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    return await get_vendor_quotation_item_by_id_service(
        db=db,
        quotation_item_id=quotation_item_id,
    )

@router.put(
    "/vendor-quotation-items/{quotation_item_id}",
    response_model=VendorQuotationItemResponse,
)
async def update_vendor_quotation_item(
    quotation_item_id: UUID,
    item_data: VendorQuotationItemUpdate,
    db: AsyncSession = Depends(get_db),
):
    return await update_vendor_quotation_item_service(
        db=db,
        quotation_item_id=quotation_item_id,
        item_data=item_data,
    )

@router.delete(
    "/vendor-quotation-items/{quotation_item_id}",
    response_model=VendorQuotationItemResponse,
)
async def delete_vendor_quotation_item(
    quotation_item_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    return await delete_vendor_quotation_item_service(
        db=db,
        quotation_item_id=quotation_item_id,
    )

# Procurement Request by ID APIs
@router.get("/{procurement_request_id}", response_model=ProcurementRequestResponse)
async def get_procurement_request_by_id(
    procurement_request_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    return await get_procurement_request_by_id_service(
        db=db,
        procurement_request_id=procurement_request_id,
    )

@router.put("/{procurement_request_id}", response_model=ProcurementRequestResponse)
async def update_procurement_request(
    procurement_request_id: UUID,
    procurement_data: ProcurementRequestUpdate,
    db: AsyncSession = Depends(get_db),
):
    return await update_procurement_request_service(
        db=db,
        procurement_request_id=procurement_request_id,
        procurement_data=procurement_data,
    )

@router.delete("/{procurement_request_id}")
async def delete_procurement_request(
    procurement_request_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    await delete_procurement_request_service(
        db=db,
        procurement_request_id=procurement_request_id,
    )

    return {
        "message": "Procurement request deleted successfully."
    }