import uuid
from datetime import date
from decimal import Decimal
from typing import Optional

from sqlalchemy import CheckConstraint, Enum, ForeignKey, Index, Numeric, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.enums import ComplianceStatus, RiskLevel, enum_values
from app.db.base import Base
from app.models.mixins import SoftDeleteMixin, TimestampMixin, UUIDPrimaryKeyMixin


class RiskFactor(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "risk_factors"
    __table_args__ = (
        CheckConstraint("weight >= 0 AND weight <= 100", name="risk_factor_weight_range"),
        UniqueConstraint("code", name="uq_risk_factors_code"),
    )

    code: Mapped[str] = mapped_column(String(50), nullable=False)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    weight: Mapped[Decimal] = mapped_column(Numeric(5, 2), nullable=False)

    assessment_factors: Mapped[list["RiskAssessmentFactor"]] = relationship(back_populates="risk_factor")


class RiskAssessment(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "risk_assessments"
    __table_args__ = (
        CheckConstraint("overall_score >= 0 AND overall_score <= 100", name="risk_assessment_score_range"),
        Index("ix_risk_assessments_vendor_level", "vendor_id", "risk_level"),
    )

    vendor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vendors.id", ondelete="CASCADE"), index=True)
    assessed_by_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    assessment_date: Mapped[date] = mapped_column(nullable=False)
    risk_level: Mapped[RiskLevel] = mapped_column(
        Enum(RiskLevel, name="risk_level", values_callable=enum_values), nullable=False
    )
    overall_score: Mapped[Decimal] = mapped_column(Numeric(5, 2), nullable=False)
    notes: Mapped[Optional[str]] = mapped_column(Text)

    vendor: Mapped["Vendor"] = relationship()
    factors: Mapped[list["RiskAssessmentFactor"]] = relationship(back_populates="assessment", cascade="all, delete-orphan")


class RiskAssessmentFactor(TimestampMixin, Base):
    __tablename__ = "risk_assessment_factors"
    __table_args__ = (
        CheckConstraint("score >= 0 AND score <= 100", name="risk_assessment_factor_score_range"),
        UniqueConstraint("assessment_id", "risk_factor_id", name="uq_risk_assessment_factor"),
    )

    assessment_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("risk_assessments.id", ondelete="CASCADE"), primary_key=True
    )
    risk_factor_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("risk_factors.id", ondelete="RESTRICT"), primary_key=True
    )
    score: Mapped[Decimal] = mapped_column(Numeric(5, 2), nullable=False)
    notes: Mapped[Optional[str]] = mapped_column(Text)

    assessment: Mapped["RiskAssessment"] = relationship(back_populates="factors")
    risk_factor: Mapped["RiskFactor"] = relationship(back_populates="assessment_factors")


class VendorComplianceStatus(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "vendor_compliance_status"
    __table_args__ = (
        CheckConstraint("expires_at IS NULL OR expires_at >= effective_at", name="vendor_compliance_valid_dates"),
        UniqueConstraint("vendor_id", "compliance_type", name="uq_vendor_compliance_type"),
    )

    vendor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vendors.id", ondelete="CASCADE"), index=True)
    compliance_type: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[ComplianceStatus] = mapped_column(
        Enum(ComplianceStatus, name="compliance_status", values_callable=enum_values), nullable=False
    )
    effective_at: Mapped[date] = mapped_column(nullable=False)
    expires_at: Mapped[Optional[date]]
    verified_by_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    notes: Mapped[Optional[str]] = mapped_column(Text)

    vendor: Mapped["Vendor"] = relationship()
