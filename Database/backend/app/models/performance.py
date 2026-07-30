import uuid
from datetime import date
from decimal import Decimal
from typing import Optional

from sqlalchemy import CheckConstraint, ForeignKey, Index, Numeric, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import SoftDeleteMixin, TimestampMixin, UUIDPrimaryKeyMixin


class PerformanceMetric(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "performance_metrics"
    __table_args__ = (
        CheckConstraint("weight >= 0 AND weight <= 100", name="performance_metric_weight_range"),
        UniqueConstraint("code", name="uq_performance_metrics_code"),
    )

    code: Mapped[str] = mapped_column(String(50), nullable=False)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    weight: Mapped[Decimal] = mapped_column(Numeric(5, 2), nullable=False)
    unit: Mapped[Optional[str]] = mapped_column(String(30))
    higher_is_better: Mapped[bool] = mapped_column(nullable=False, default=True)

    kpi_history: Mapped[list["VendorKpiHistory"]] = relationship(back_populates="metric")


class VendorReliabilityScore(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "vendor_reliability_scores"
    __table_args__ = (
        CheckConstraint("overall_score >= 0 AND overall_score <= 100", name="vendor_reliability_score_range"),
        UniqueConstraint("vendor_id", "score_period_start", "score_period_end", name="uq_vendor_reliability_period"),
        Index("ix_vendor_reliability_vendor_period", "vendor_id", "score_period_end"),
    )

    vendor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vendors.id", ondelete="CASCADE"), index=True)
    score_period_start: Mapped[date] = mapped_column(nullable=False)
    score_period_end: Mapped[date] = mapped_column(nullable=False)
    overall_score: Mapped[Decimal] = mapped_column(Numeric(5, 2), nullable=False)
    grade: Mapped[Optional[str]] = mapped_column(String(5))
    calculated_by_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))

    vendor: Mapped["Vendor"] = relationship()


class VendorKpiHistory(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "vendor_kpi_history"
    __table_args__ = (
        CheckConstraint("score >= 0 AND score <= 100", name="vendor_kpi_score_range"),
        UniqueConstraint("vendor_id", "metric_id", "period_start", "period_end", name="uq_vendor_kpi_period"),
        Index("ix_vendor_kpi_vendor_metric_period", "vendor_id", "metric_id", "period_end"),
    )

    vendor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vendors.id", ondelete="CASCADE"), index=True)
    metric_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("performance_metrics.id", ondelete="RESTRICT"))
    period_start: Mapped[date] = mapped_column(nullable=False)
    period_end: Mapped[date] = mapped_column(nullable=False)
    actual_value: Mapped[Decimal] = mapped_column(Numeric(12, 4), nullable=False)
    target_value: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 4))
    score: Mapped[Decimal] = mapped_column(Numeric(5, 2), nullable=False)

    vendor: Mapped["Vendor"] = relationship()
    metric: Mapped["PerformanceMetric"] = relationship(back_populates="kpi_history")
