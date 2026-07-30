import uuid
from datetime import date
from typing import Optional

from sqlalchemy import Boolean, CheckConstraint, Enum, ForeignKey, Index, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.enums import DocumentType, VendorStatus, enum_values
from app.db.base import Base
from app.models.mixins import SoftDeleteMixin, TimestampMixin, UUIDPrimaryKeyMixin


class VendorCategory(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "vendor_categories"

    name: Mapped[str] = mapped_column(String(150), nullable=False, unique=True)
    description: Mapped[Optional[str]] = mapped_column(Text)

    vendors: Mapped[list["Vendor"]] = relationship(back_populates="category")


class Vendor(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "vendors"
    __table_args__ = (
        UniqueConstraint("legal_name", "tax_identifier", name="uq_vendors_legal_tax"),
        Index("ix_vendors_category_status", "category_id", "status"),
    )

    category_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("vendor_categories.id", ondelete="SET NULL"), index=True
    )
    legal_name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    display_name: Mapped[str] = mapped_column(String(255), nullable=False)
    tax_identifier: Mapped[str] = mapped_column(String(100), nullable=False)
    registration_number: Mapped[Optional[str]] = mapped_column(String(100), unique=True)
    website: Mapped[Optional[str]] = mapped_column(String(255))
    status: Mapped[VendorStatus] = mapped_column(
        Enum(VendorStatus, name="vendor_status", values_callable=enum_values), nullable=False, default=VendorStatus.DRAFT
    )
    onboarding_date: Mapped[Optional[date]]

    category: Mapped[Optional["VendorCategory"]] = relationship(back_populates="vendors")
    contacts: Mapped[list["VendorContact"]] = relationship(back_populates="vendor", cascade="all, delete-orphan")
    addresses: Mapped[list["VendorAddress"]] = relationship(back_populates="vendor", cascade="all, delete-orphan")
    documents: Mapped[list["VendorDocument"]] = relationship(back_populates="vendor", cascade="all, delete-orphan")


class VendorContact(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "vendor_contacts"
    __table_args__ = (UniqueConstraint("vendor_id", "email", name="uq_vendor_contacts_vendor_email"),)

    vendor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vendors.id", ondelete="CASCADE"), index=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    title: Mapped[Optional[str]] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[Optional[str]] = mapped_column(String(30))
    is_primary: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    vendor: Mapped["Vendor"] = relationship(back_populates="contacts")


class VendorAddress(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "vendor_addresses"
    __table_args__ = (Index("ix_vendor_addresses_vendor_type", "vendor_id", "address_type"),)

    vendor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vendors.id", ondelete="CASCADE"), index=True)
    address_type: Mapped[str] = mapped_column(String(50), nullable=False)
    line1: Mapped[str] = mapped_column(String(255), nullable=False)
    line2: Mapped[Optional[str]] = mapped_column(String(255))
    city: Mapped[str] = mapped_column(String(100), nullable=False)
    state: Mapped[Optional[str]] = mapped_column(String(100))
    postal_code: Mapped[str] = mapped_column(String(30), nullable=False)
    country: Mapped[str] = mapped_column(String(2), nullable=False)
    is_primary: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    vendor: Mapped["Vendor"] = relationship(back_populates="addresses")


class VendorDocument(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "vendor_documents"
    __table_args__ = (
        CheckConstraint("expires_at IS NULL OR issued_at IS NULL OR expires_at >= issued_at", name="vendor_doc_valid_dates"),
        Index("ix_vendor_documents_vendor_type", "vendor_id", "document_type"),
    )

    vendor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vendors.id", ondelete="CASCADE"), index=True)
    document_type: Mapped[DocumentType] = mapped_column(
        Enum(DocumentType, name="document_type", values_callable=enum_values), nullable=False
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    storage_key: Mapped[str] = mapped_column(String(500), nullable=False)
    file_url: Mapped[Optional[str]] = mapped_column(String(1000))
    issued_at: Mapped[Optional[date]]
    expires_at: Mapped[Optional[date]]
    verified_by_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))

    vendor: Mapped["Vendor"] = relationship(back_populates="documents")
