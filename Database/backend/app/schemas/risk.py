from datetime import date
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, Field

from app.core.enums import ComplianceStatus, RiskLevel
from app.schemas.common import ListResponse, ORMModel, TimestampRead


class RiskFactorCreate(BaseModel):
    code: str
    name: str
    description: str | None = None
    weight: Decimal = Field(ge=0, le=100)


class RiskFactorUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    weight: Decimal | None = Field(default=None, ge=0, le=100)


class RiskFactorRead(TimestampRead):
    code: str
    name: str
    description: str | None
    weight: Decimal


RiskFactorResponse = RiskFactorRead
RiskFactorListResponse = ListResponse[RiskFactorRead]


class RiskAssessmentCreate(BaseModel):
    vendor_id: UUID
    assessed_by_user_id: UUID | None = None
    assessment_date: date
    risk_level: RiskLevel
    overall_score: Decimal = Field(ge=0, le=100)
    notes: str | None = None


class RiskAssessmentUpdate(BaseModel):
    risk_level: RiskLevel | None = None
    overall_score: Decimal | None = Field(default=None, ge=0, le=100)
    notes: str | None = None


class RiskAssessmentRead(TimestampRead):
    vendor_id: UUID
    assessed_by_user_id: UUID | None
    assessment_date: date
    risk_level: RiskLevel
    overall_score: Decimal
    notes: str | None


RiskAssessmentResponse = RiskAssessmentRead
RiskAssessmentListResponse = ListResponse[RiskAssessmentRead]


class RiskAssessmentFactorCreate(BaseModel):
    assessment_id: UUID
    risk_factor_id: UUID
    score: Decimal = Field(ge=0, le=100)
    notes: str | None = None


class RiskAssessmentFactorUpdate(BaseModel):
    score: Decimal | None = Field(default=None, ge=0, le=100)
    notes: str | None = None


class RiskAssessmentFactorRead(ORMModel):
    assessment_id: UUID
    risk_factor_id: UUID
    score: Decimal
    notes: str | None


RiskAssessmentFactorResponse = RiskAssessmentFactorRead


class VendorComplianceStatusCreate(BaseModel):
    vendor_id: UUID
    compliance_type: str
    status: ComplianceStatus
    effective_at: date
    expires_at: date | None = None
    verified_by_user_id: UUID | None = None
    notes: str | None = None


class VendorComplianceStatusUpdate(BaseModel):
    status: ComplianceStatus | None = None
    effective_at: date | None = None
    expires_at: date | None = None
    verified_by_user_id: UUID | None = None
    notes: str | None = None


class VendorComplianceStatusRead(TimestampRead):
    vendor_id: UUID
    compliance_type: str
    status: ComplianceStatus
    effective_at: date
    expires_at: date | None
    verified_by_user_id: UUID | None
    notes: str | None


VendorComplianceStatusResponse = VendorComplianceStatusRead
VendorComplianceStatusListResponse = ListResponse[VendorComplianceStatusRead]
