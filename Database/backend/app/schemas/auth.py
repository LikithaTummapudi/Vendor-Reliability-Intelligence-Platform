from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field

from app.core.enums import AuditAction, UserStatus
from app.schemas.common import ListResponse, ORMModel, TimestampRead


class UserCreate(BaseModel):
    email: EmailStr
    username: str = Field(min_length=3, max_length=100)
    password: str = Field(min_length=12, max_length=128)
    first_name: str
    last_name: str
    phone: str | None = None
    status: UserStatus = UserStatus.PENDING


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    username: str | None = Field(default=None, min_length=3, max_length=100)
    first_name: str | None = None
    last_name: str | None = None
    phone: str | None = None
    status: UserStatus | None = None


class UserRead(TimestampRead):
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    phone: str | None
    status: UserStatus
    is_superuser: bool
    last_login_at: datetime | None


UserResponse = UserRead
UserListResponse = ListResponse[UserRead]


class RoleCreate(BaseModel):
    name: str
    description: str | None = None
    is_system_role: bool = False


class RoleUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    is_system_role: bool | None = None


class RoleRead(TimestampRead):
    name: str
    description: str | None
    is_system_role: bool


RoleResponse = RoleRead
RoleListResponse = ListResponse[RoleRead]


class PermissionCreate(BaseModel):
    resource: str
    action: str
    description: str | None = None


class PermissionUpdate(BaseModel):
    resource: str | None = None
    action: str | None = None
    description: str | None = None


class PermissionRead(ORMModel):
    id: UUID
    resource: str
    action: str
    description: str | None


PermissionResponse = PermissionRead
PermissionListResponse = ListResponse[PermissionRead]


class UserRoleCreate(BaseModel):
    user_id: UUID
    role_id: UUID


class UserRoleRead(ORMModel):
    user_id: UUID
    role_id: UUID
    created_at: datetime
    updated_at: datetime


UserRoleResponse = UserRoleRead


class RolePermissionCreate(BaseModel):
    role_id: UUID
    permission_id: UUID


class RolePermissionRead(ORMModel):
    role_id: UUID
    permission_id: UUID
    created_at: datetime
    updated_at: datetime


RolePermissionResponse = RolePermissionRead


class LoginHistoryRead(ORMModel):
    id: UUID
    user_id: UUID | None
    ip_address: str | None
    user_agent: str | None
    successful: bool
    failure_reason: str | None
    created_at: datetime


LoginHistoryResponse = LoginHistoryRead
LoginHistoryListResponse = ListResponse[LoginHistoryRead]


class AuditLogRead(ORMModel):
    id: UUID
    user_id: UUID | None
    action: AuditAction
    entity_type: str
    entity_id: UUID | None
    before_data: dict | None
    after_data: dict | None
    ip_address: str | None
    created_at: datetime


AuditLogResponse = AuditLogRead
AuditLogListResponse = ListResponse[AuditLogRead]
