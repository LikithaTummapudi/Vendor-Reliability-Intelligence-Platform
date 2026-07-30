from datetime import date, datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, Field

from app.core.enums import ContractStatus, DocumentType, NotificationStatus
from app.schemas.common import ListResponse, TimestampRead


class ContractCreate(BaseModel):
    contract_number: str
    vendor_id: UUID
    title: str
    status: ContractStatus = ContractStatus.DRAFT
    start_date: date
    end_date: date
    renewal_date: date | None = None
    currency: str = Field(default="USD", min_length=3, max_length=3)
    contract_value: Decimal = Field(default=0, ge=0)
    owner_user_id: UUID | None = None


class ContractUpdate(BaseModel):
    title: str | None = None
    status: ContractStatus | None = None
    start_date: date | None = None
    end_date: date | None = None
    renewal_date: date | None = None
    currency: str | None = Field(default=None, min_length=3, max_length=3)
    contract_value: Decimal | None = Field(default=None, ge=0)
    owner_user_id: UUID | None = None


class ContractRead(TimestampRead):
    contract_number: str
    vendor_id: UUID
    title: str
    status: ContractStatus
    start_date: date
    end_date: date
    renewal_date: date | None
    currency: str
    contract_value: Decimal
    owner_user_id: UUID | None


ContractResponse = ContractRead
ContractListResponse = ListResponse[ContractRead]


class ContractTermCreate(BaseModel):
    contract_id: UUID
    term_key: str
    term_value: str
    is_critical: bool = False


class ContractTermUpdate(BaseModel):
    term_key: str | None = None
    term_value: str | None = None
    is_critical: bool | None = None


class ContractTermRead(TimestampRead):
    contract_id: UUID
    term_key: str
    term_value: str
    is_critical: bool


ContractTermResponse = ContractTermRead
ContractTermListResponse = ListResponse[ContractTermRead]


class ContractDocumentCreate(BaseModel):
    contract_id: UUID
    document_type: DocumentType
    name: str
    storage_key: str
    file_url: str | None = None
    uploaded_by_user_id: UUID | None = None


class ContractDocumentUpdate(BaseModel):
    document_type: DocumentType | None = None
    name: str | None = None
    storage_key: str | None = None
    file_url: str | None = None
    uploaded_by_user_id: UUID | None = None


class ContractDocumentRead(TimestampRead):
    contract_id: UUID
    document_type: DocumentType
    name: str
    storage_key: str
    file_url: str | None
    uploaded_by_user_id: UUID | None


ContractDocumentResponse = ContractDocumentRead
ContractDocumentListResponse = ListResponse[ContractDocumentRead]


class ContractNotificationCreate(BaseModel):
    contract_id: UUID
    notify_at: datetime
    status: NotificationStatus = NotificationStatus.PENDING
    recipient_user_id: UUID | None = None
    message: str


class ContractNotificationUpdate(BaseModel):
    notify_at: datetime | None = None
    status: NotificationStatus | None = None
    recipient_user_id: UUID | None = None
    message: str | None = None


class ContractNotificationRead(TimestampRead):
    contract_id: UUID
    notify_at: datetime
    status: NotificationStatus
    recipient_user_id: UUID | None
    message: str


ContractNotificationResponse = ContractNotificationRead
ContractNotificationListResponse = ListResponse[ContractNotificationRead]
