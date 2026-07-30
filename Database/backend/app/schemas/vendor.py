from datetime import date
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field

from app.core.enums import DocumentType, VendorStatus
from app.schemas.common import ListResponse, TimestampRead


class VendorCategoryCreate(BaseModel):
    name: str
    description: str | None = None


class VendorCategoryUpdate(BaseModel):
    name: str | None = None
    description: str | None = None


class VendorCategoryRead(TimestampRead):
    name: str
    description: str | None


VendorCategoryResponse = VendorCategoryRead
VendorCategoryListResponse = ListResponse[VendorCategoryRead]


class VendorCreate(BaseModel):
    category_id: UUID | None = None
    legal_name: str
    display_name: str
    tax_identifier: str
    registration_number: str | None = None
    website: str | None = None
    status: VendorStatus = VendorStatus.DRAFT
    onboarding_date: date | None = None


class VendorUpdate(BaseModel):
    category_id: UUID | None = None
    legal_name: str | None = None
    display_name: str | None = None
    tax_identifier: str | None = None
    registration_number: str | None = None
    website: str | None = None
    status: VendorStatus | None = None
    onboarding_date: date | None = None


class VendorRead(TimestampRead):
    category_id: UUID | None
    legal_name: str
    display_name: str
    tax_identifier: str
    registration_number: str | None
    website: str | None
    status: VendorStatus
    onboarding_date: date | None


VendorResponse = VendorRead
VendorListResponse = ListResponse[VendorRead]


class VendorContactCreate(BaseModel):
    vendor_id: UUID
    name: str
    title: str | None = None
    email: EmailStr
    phone: str | None = None
    is_primary: bool = False


class VendorContactUpdate(BaseModel):
    name: str | None = None
    title: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    is_primary: bool | None = None


class VendorContactRead(TimestampRead):
    vendor_id: UUID
    name: str
    title: str | None
    email: EmailStr
    phone: str | None
    is_primary: bool


VendorContactResponse = VendorContactRead
VendorContactListResponse = ListResponse[VendorContactRead]


class VendorAddressCreate(BaseModel):
    vendor_id: UUID
    address_type: str
    line1: str
    line2: str | None = None
    city: str
    state: str | None = None
    postal_code: str
    country: str = Field(min_length=2, max_length=2)
    is_primary: bool = False


class VendorAddressUpdate(BaseModel):
    address_type: str | None = None
    line1: str | None = None
    line2: str | None = None
    city: str | None = None
    state: str | None = None
    postal_code: str | None = None
    country: str | None = Field(default=None, min_length=2, max_length=2)
    is_primary: bool | None = None


class VendorAddressRead(TimestampRead):
    vendor_id: UUID
    address_type: str
    line1: str
    line2: str | None
    city: str
    state: str | None
    postal_code: str
    country: str
    is_primary: bool


VendorAddressResponse = VendorAddressRead
VendorAddressListResponse = ListResponse[VendorAddressRead]


class VendorDocumentCreate(BaseModel):
    vendor_id: UUID
    document_type: DocumentType
    name: str
    storage_key: str
    file_url: str | None = None
    issued_at: date | None = None
    expires_at: date | None = None


class VendorDocumentUpdate(BaseModel):
    document_type: DocumentType | None = None
    name: str | None = None
    storage_key: str | None = None
    file_url: str | None = None
    issued_at: date | None = None
    expires_at: date | None = None
    verified_by_user_id: UUID | None = None


class VendorDocumentRead(TimestampRead):
    vendor_id: UUID
    document_type: DocumentType
    name: str
    storage_key: str
    file_url: str | None
    issued_at: date | None
    expires_at: date | None
    verified_by_user_id: UUID | None


VendorDocumentResponse = VendorDocumentRead
VendorDocumentListResponse = ListResponse[VendorDocumentRead]
