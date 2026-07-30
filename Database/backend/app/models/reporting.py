import uuid
from typing import Optional

from sqlalchemy import Boolean, ForeignKey, Index, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.mixins import SoftDeleteMixin, TimestampMixin, UUIDPrimaryKeyMixin


class Report(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "reports"
    __table_args__ = (
        UniqueConstraint("code", name="uq_reports_code"),
        Index("ix_reports_owner_created", "owner_user_id", "created_at"),
    )

    code: Mapped[str] = mapped_column(String(100), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    definition: Mapped[dict] = mapped_column(JSONB, nullable=False)
    owner_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    is_public: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)


class DashboardMetric(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "dashboard_metrics"
    __table_args__ = (UniqueConstraint("code", name="uq_dashboard_metrics_code"),)

    code: Mapped[str] = mapped_column(String(100), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    metric_query_key: Mapped[str] = mapped_column(String(100), nullable=False)
    display_order: Mapped[int] = mapped_column(nullable=False, default=0)
    config: Mapped[Optional[dict]] = mapped_column(JSONB)
