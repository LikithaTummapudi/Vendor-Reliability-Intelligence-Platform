from datetime import datetime
from typing import Generic, TypeVar
from uuid import UUID

from pydantic import BaseModel, ConfigDict

T = TypeVar("T")


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class TimestampRead(ORMModel):
    id: UUID
    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None = None


class ListResponse(BaseModel, Generic[T]):
    items: list[T]
    total: int
