import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import Optional

from sqlalchemy import CheckConstraint, Enum, ForeignKey, Index, Numeric, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.enums import ContractStatus, DocumentType, NotificationStatus, enum_values
from app.db.base import Base
from app.models.mixins import SoftDeleteMixin, TimestampMixin, UUIDPrimaryKeyMixin


class Contract(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "contracts"
    __table_args__ = (
        CheckConstraint("end_date >= start_date", name="contract_valid_dates"),
        CheckConstraint("contract_value >= 0", name="contract_value_nonnegative"),
        UniqueConstraint("contract_number", name="uq_contracts_number"),
        Index("ix_contracts_vendor_status", "vendor_id", "status"),
    )

    contract_number: Mapped[str] = mapped_column(String(50), nullable=False)
    vendor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vendors.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[ContractStatus] = mapped_column(
        Enum(ContractStatus, name="contract_status", values_callable=enum_values), nullable=False
    )
    start_date: Mapped[date] = mapped_column(nullable=False)
    end_date: Mapped[date] = mapped_column(nullable=False)
    renewal_date: Mapped[Optional[date]]
    currency: Mapped[str] = mapped_column(String(3), nullable=False, default="USD")
    contract_value: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False, default=0)
    owner_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))

    terms: Mapped[list["ContractTerm"]] = relationship(back_populates="contract", cascade="all, delete-orphan")
    documents: Mapped[list["ContractDocument"]] = relationship(back_populates="contract", cascade="all, delete-orphan")
    notifications: Mapped[list["ContractNotification"]] = relationship(back_populates="contract", cascade="all, delete-orphan")


class ContractTerm(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "contract_terms"
    __table_args__ = (UniqueConstraint("contract_id", "term_key", name="uq_contract_terms_contract_key"),)

    contract_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("contracts.id", ondelete="CASCADE"), index=True)
    term_key: Mapped[str] = mapped_column(String(100), nullable=False)
    term_value: Mapped[str] = mapped_column(Text, nullable=False)
    is_critical: Mapped[bool] = mapped_column(nullable=False, default=False)

    contract: Mapped["Contract"] = relationship(back_populates="terms")


class ContractDocument(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "contract_documents"

    contract_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("contracts.id", ondelete="CASCADE"), index=True)
    document_type: Mapped[DocumentType] = mapped_column(
        Enum(DocumentType, name="document_type", values_callable=enum_values), nullable=False
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    storage_key: Mapped[str] = mapped_column(String(500), nullable=False)
    file_url: Mapped[Optional[str]] = mapped_column(String(1000))
    uploaded_by_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))

    contract: Mapped["Contract"] = relationship(back_populates="documents")


class ContractNotification(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "contract_notifications"
    __table_args__ = (Index("ix_contract_notifications_due_status", "notify_at", "status"),)

    contract_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("contracts.id", ondelete="CASCADE"), index=True)
    notify_at: Mapped[datetime] = mapped_column(nullable=False)
    status: Mapped[NotificationStatus] = mapped_column(
        Enum(NotificationStatus, name="notification_status", values_callable=enum_values),
        nullable=False,
        default=NotificationStatus.PENDING,
    )
    recipient_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    message: Mapped[str] = mapped_column(Text, nullable=False)

    contract: Mapped["Contract"] = relationship(back_populates="notifications")
