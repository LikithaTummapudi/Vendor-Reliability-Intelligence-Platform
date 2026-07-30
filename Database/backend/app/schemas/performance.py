from datetime import date
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, Field

from app.schemas.common import ListResponse, TimestampRead


class PerformanceMetricCreate(BaseModel):
    code: str
    name: str
    description: str | None = None
    weight: Decimal = Field(ge=0, le=100)
    unit: str | None = None
    higher_is_better: bool = True


class PerformanceMetricUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    weight: Decimal | None = Field(default=None, ge=0, le=100)
    unit: str | None = None
    higher_is_better: bool | None = None


class PerformanceMetricRead(TimestampRead):
    code: str
    name: str
    description: str | None
    weight: Decimal
    unit: str | None
    higher_is_better: bool


PerformanceMetricResponse = PerformanceMetricRead
PerformanceMetricListResponse = ListResponse[PerformanceMetricRead]


class VendorReliabilityScoreCreate(BaseModel):
    vendor_id: UUID
    score_period_start: date
    score_period_end: date
    overall_score: Decimal = Field(ge=0, le=100)
    grade: str | None = None
    calculated_by_user_id: UUID | None = None


class VendorReliabilityScoreUpdate(BaseModel):
    overall_score: Decimal | None = Field(default=None, ge=0, le=100)
    grade: str | None = None
    calculated_by_user_id: UUID | None = None


class VendorReliabilityScoreRead(TimestampRead):
    vendor_id: UUID
    score_period_start: date
    score_period_end: date
    overall_score: Decimal
    grade: str | None
    calculated_by_user_id: UUID | None


VendorReliabilityScoreResponse = VendorReliabilityScoreRead
VendorReliabilityScoreListResponse = ListResponse[VendorReliabilityScoreRead]


class VendorKpiHistoryCreate(BaseModel):
    vendor_id: UUID
    metric_id: UUID
    period_start: date
    period_end: date
    actual_value: Decimal
    target_value: Decimal | None = None
    score: Decimal = Field(ge=0, le=100)


class VendorKpiHistoryUpdate(BaseModel):
    actual_value: Decimal | None = None
    target_value: Decimal | None = None
    score: Decimal | None = Field(default=None, ge=0, le=100)


class VendorKpiHistoryRead(TimestampRead):
    vendor_id: UUID
    metric_id: UUID
    period_start: date
    period_end: date
    actual_value: Decimal
    target_value: Decimal | None
    score: Decimal


VendorKpiHistoryResponse = VendorKpiHistoryRead
VendorKpiHistoryListResponse = ListResponse[VendorKpiHistoryRead]
