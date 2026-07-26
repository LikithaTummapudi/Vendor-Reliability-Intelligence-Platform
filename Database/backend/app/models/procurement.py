import uuid
from datetime import date
from decimal import Decimal
from typing import Optional

from sqlalchemy import CheckConstraint, Enum, ForeignKey, Index, Numeric, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.enums import ProcurementStatus, PurchaseOrderStatus, QuotationStatus, enum_values
from app.db.base import Base
from app.models.mixins import SoftDeleteMixin, TimestampMixin, UUIDPrimaryKeyMixin


class ProcurementRequest(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "procurement_requests"
    __table_args__ = (UniqueConstraint("request_number", name="uq_procurement_requests_number"),)

    request_number: Mapped[str] = mapped_column(String(50), nullable=False)
    requested_by_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    department: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[ProcurementStatus] = mapped_column(
        Enum(ProcurementStatus, name="procurement_status", values_callable=enum_values),
        nullable=False,
        default=ProcurementStatus.DRAFT,
    )
    needed_by: Mapped[Optional[date]]
    business_justification: Mapped[Optional[str]] = mapped_column(Text)

    items: Mapped[list["ProcurementItem"]] = relationship(back_populates="request", cascade="all, delete-orphan")
    quotations: Mapped[list["VendorQuotation"]] = relationship(back_populates="request")


class ProcurementItem(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "procurement_items"
    __table_args__ = (CheckConstraint("quantity > 0", name="procurement_item_quantity_positive"),)

    request_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("procurement_requests.id", ondelete="CASCADE"), index=True)
    sku: Mapped[Optional[str]] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(Text, nullable=False)
    quantity: Mapped[Decimal] = mapped_column(Numeric(14, 4), nullable=False)
    unit_of_measure: Mapped[str] = mapped_column(String(30), nullable=False)
    estimated_unit_price: Mapped[Optional[Decimal]] = mapped_column(Numeric(14, 2))

    request: Mapped["ProcurementRequest"] = relationship(back_populates="items")


class VendorQuotation(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "vendor_quotations"
    __table_args__ = (
        CheckConstraint("total_amount >= 0", name="vendor_quotation_total_nonnegative"),
        UniqueConstraint("quotation_number", name="uq_vendor_quotations_number"),
        Index("ix_vendor_quotations_vendor_status", "vendor_id", "status"),
    )

    quotation_number: Mapped[str] = mapped_column(String(50), nullable=False)
    request_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("procurement_requests.id", ondelete="CASCADE"), index=True)
    vendor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vendors.id", ondelete="CASCADE"), index=True)
    status: Mapped[QuotationStatus] = mapped_column(
        Enum(QuotationStatus, name="quotation_status", values_callable=enum_values),
        nullable=False,
        default=QuotationStatus.REQUESTED,
    )
    valid_until: Mapped[Optional[date]]
    currency: Mapped[str] = mapped_column(String(3), nullable=False, default="USD")
    total_amount: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False, default=0)

    request: Mapped["ProcurementRequest"] = relationship(back_populates="quotations")
    items: Mapped[list["VendorQuotationItem"]] = relationship(back_populates="quotation", cascade="all, delete-orphan")


class VendorQuotationItem(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "vendor_quotation_items"
    __table_args__ = (
        CheckConstraint("quantity > 0", name="vendor_quotation_item_quantity_positive"),
        CheckConstraint("unit_price >= 0", name="vendor_quotation_item_unit_price_nonnegative"),
    )

    quotation_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vendor_quotations.id", ondelete="CASCADE"), index=True)
    procurement_item_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("procurement_items.id", ondelete="CASCADE"), index=True
    )
    quantity: Mapped[Decimal] = mapped_column(Numeric(14, 4), nullable=False)
    unit_price: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False)

    quotation: Mapped["VendorQuotation"] = relationship(back_populates="items")


class PurchaseOrder(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "purchase_orders"
    __table_args__ = (
        CheckConstraint("total_amount >= 0", name="purchase_order_total_nonnegative"),
        UniqueConstraint("po_number", name="uq_purchase_orders_number"),
        Index("ix_purchase_orders_vendor_status", "vendor_id", "status"),
    )

    po_number: Mapped[str] = mapped_column(String(50), nullable=False)
    vendor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vendors.id", ondelete="CASCADE"), index=True)
    quotation_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("vendor_quotations.id", ondelete="SET NULL"))
    issued_by_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    status: Mapped[PurchaseOrderStatus] = mapped_column(
        Enum(PurchaseOrderStatus, name="purchase_order_status", values_callable=enum_values),
        nullable=False,
        default=PurchaseOrderStatus.DRAFT,
    )
    issued_at: Mapped[Optional[date]]
    expected_delivery_date: Mapped[Optional[date]]
    currency: Mapped[str] = mapped_column(String(3), nullable=False, default="USD")
    total_amount: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False, default=0)

    items: Mapped[list["PurchaseOrderItem"]] = relationship(back_populates="purchase_order", cascade="all, delete-orphan")


class PurchaseOrderItem(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "purchase_order_items"
    __table_args__ = (
        CheckConstraint("quantity > 0", name="purchase_order_item_quantity_positive"),
        CheckConstraint("unit_price >= 0", name="purchase_order_item_unit_price_nonnegative"),
    )

    purchase_order_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("purchase_orders.id", ondelete="CASCADE"), index=True
    )
    description: Mapped[str] = mapped_column(Text, nullable=False)
    quantity: Mapped[Decimal] = mapped_column(Numeric(14, 4), nullable=False)
    unit_price: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False)

    purchase_order: Mapped["PurchaseOrder"] = relationship(back_populates="items")
