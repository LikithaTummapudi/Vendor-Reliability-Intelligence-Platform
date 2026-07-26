from datetime import date
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, Field

from app.core.enums import ProcurementStatus, PurchaseOrderStatus, QuotationStatus
from app.schemas.common import ListResponse, TimestampRead


class ProcurementRequestCreate(BaseModel):
    request_number: str
    requested_by_user_id: UUID | None = None
    department: str
    status: ProcurementStatus = ProcurementStatus.DRAFT
    needed_by: date | None = None
    business_justification: str | None = None


class ProcurementRequestUpdate(BaseModel):
    department: str | None = None
    status: ProcurementStatus | None = None
    needed_by: date | None = None
    business_justification: str | None = None


class ProcurementRequestRead(TimestampRead):
    request_number: str
    requested_by_user_id: UUID | None
    department: str
    status: ProcurementStatus
    needed_by: date | None
    business_justification: str | None


ProcurementRequestResponse = ProcurementRequestRead
ProcurementRequestListResponse = ListResponse[ProcurementRequestRead]


class ProcurementItemCreate(BaseModel):
    request_id: UUID
    sku: str | None = None
    description: str
    quantity: Decimal = Field(gt=0)
    unit_of_measure: str
    estimated_unit_price: Decimal | None = Field(default=None, ge=0)


class ProcurementItemUpdate(BaseModel):
    sku: str | None = None
    description: str | None = None
    quantity: Decimal | None = Field(default=None, gt=0)
    unit_of_measure: str | None = None
    estimated_unit_price: Decimal | None = Field(default=None, ge=0)


class ProcurementItemRead(TimestampRead):
    request_id: UUID
    sku: str | None
    description: str
    quantity: Decimal
    unit_of_measure: str
    estimated_unit_price: Decimal | None


ProcurementItemResponse = ProcurementItemRead
ProcurementItemListResponse = ListResponse[ProcurementItemRead]


class VendorQuotationCreate(BaseModel):
    quotation_number: str
    request_id: UUID
    vendor_id: UUID
    status: QuotationStatus = QuotationStatus.REQUESTED
    valid_until: date | None = None
    currency: str = Field(default="USD", min_length=3, max_length=3)
    total_amount: Decimal = Field(default=0, ge=0)


class VendorQuotationUpdate(BaseModel):
    status: QuotationStatus | None = None
    valid_until: date | None = None
    currency: str | None = Field(default=None, min_length=3, max_length=3)
    total_amount: Decimal | None = Field(default=None, ge=0)


class VendorQuotationRead(TimestampRead):
    quotation_number: str
    request_id: UUID
    vendor_id: UUID
    status: QuotationStatus
    valid_until: date | None
    currency: str
    total_amount: Decimal


VendorQuotationResponse = VendorQuotationRead
VendorQuotationListResponse = ListResponse[VendorQuotationRead]


class VendorQuotationItemCreate(BaseModel):
    quotation_id: UUID
    procurement_item_id: UUID
    quantity: Decimal = Field(gt=0)
    unit_price: Decimal = Field(ge=0)


class VendorQuotationItemUpdate(BaseModel):
    quantity: Decimal | None = Field(default=None, gt=0)
    unit_price: Decimal | None = Field(default=None, ge=0)


class VendorQuotationItemRead(TimestampRead):
    quotation_id: UUID
    procurement_item_id: UUID
    quantity: Decimal
    unit_price: Decimal


VendorQuotationItemResponse = VendorQuotationItemRead


class PurchaseOrderCreate(BaseModel):
    po_number: str
    vendor_id: UUID
    quotation_id: UUID | None = None
    issued_by_user_id: UUID | None = None
    status: PurchaseOrderStatus = PurchaseOrderStatus.DRAFT
    issued_at: date | None = None
    expected_delivery_date: date | None = None
    currency: str = Field(default="USD", min_length=3, max_length=3)
    total_amount: Decimal = Field(default=0, ge=0)


class PurchaseOrderUpdate(BaseModel):
    status: PurchaseOrderStatus | None = None
    issued_at: date | None = None
    expected_delivery_date: date | None = None
    currency: str | None = Field(default=None, min_length=3, max_length=3)
    total_amount: Decimal | None = Field(default=None, ge=0)


class PurchaseOrderRead(TimestampRead):
    po_number: str
    vendor_id: UUID
    quotation_id: UUID | None
    issued_by_user_id: UUID | None
    status: PurchaseOrderStatus
    issued_at: date | None
    expected_delivery_date: date | None
    currency: str
    total_amount: Decimal


PurchaseOrderResponse = PurchaseOrderRead
PurchaseOrderListResponse = ListResponse[PurchaseOrderRead]


class PurchaseOrderItemCreate(BaseModel):
    purchase_order_id: UUID
    description: str
    quantity: Decimal = Field(gt=0)
    unit_price: Decimal = Field(ge=0)

class PurchaseOrderItemUpdate(BaseModel):
    description: str | None = None
    quantity: Decimal | None = Field(default=None, gt=0)
    unit_price: Decimal | None = Field(default=None, ge=0)

class PurchaseOrderItemRead(TimestampRead):
    purchase_order_id: UUID
    description: str
    quantity: Decimal
    unit_price: Decimal

PurchaseOrderItemResponse = PurchaseOrderItemRead

class VendorQuotationItemCreate(BaseModel):
    quotation_id: UUID
    procurement_item_id: UUID
    quantity: Decimal
    unit_price: Decimal


class VendorQuotationItemUpdate(BaseModel):
    quantity: Decimal | None = None
    unit_price: Decimal | None = None


class VendorQuotationItemRead(TimestampRead):
    quotation_id: UUID
    procurement_item_id: UUID
    quantity: Decimal
    unit_price: Decimal


VendorQuotationItemResponse = VendorQuotationItemRead
VendorQuotationItemListResponse = ListResponse[VendorQuotationItemRead]