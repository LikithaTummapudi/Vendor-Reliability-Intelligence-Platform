from uuid import UUID

from pydantic import BaseModel

from app.schemas.common import ListResponse, TimestampRead


class ReportCreate(BaseModel):
    code: str
    name: str
    description: str | None = None
    definition: dict
    owner_user_id: UUID | None = None
    is_public: bool = False


class ReportUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    definition: dict | None = None
    is_public: bool | None = None


class ReportRead(TimestampRead):
    code: str
    name: str
    description: str | None
    definition: dict
    owner_user_id: UUID | None
    is_public: bool


ReportResponse = ReportRead
ReportListResponse = ListResponse[ReportRead]


class DashboardMetricCreate(BaseModel):
    code: str
    name: str
    metric_query_key: str
    display_order: int = 0
    config: dict | None = None


class DashboardMetricUpdate(BaseModel):
    name: str | None = None
    metric_query_key: str | None = None
    display_order: int | None = None
    config: dict | None = None


class DashboardMetricRead(TimestampRead):
    code: str
    name: str
    metric_query_key: str
    display_order: int
    config: dict | None


DashboardMetricResponse = DashboardMetricRead
DashboardMetricListResponse = ListResponse[DashboardMetricRead]
