from datetime import datetime
from uuid import UUID

from pydantic import BaseModel

from app.core.enums import MessagePriority, NotificationStatus
from app.schemas.common import ListResponse, ORMModel, TimestampRead


class MessageCreate(BaseModel):
    sender_user_id: UUID | None = None
    vendor_id: UUID | None = None
    subject: str
    body: str
    priority: MessagePriority = MessagePriority.NORMAL


class MessageUpdate(BaseModel):
    subject: str | None = None
    body: str | None = None
    priority: MessagePriority | None = None


class MessageRead(TimestampRead):
    sender_user_id: UUID | None
    vendor_id: UUID | None
    subject: str
    body: str
    priority: MessagePriority


MessageResponse = MessageRead
MessageListResponse = ListResponse[MessageRead]


class MessageRecipientCreate(BaseModel):
    message_id: UUID
    recipient_user_id: UUID


class MessageRecipientUpdate(BaseModel):
    read_at: datetime | None = None


class MessageRecipientRead(ORMModel):
    message_id: UUID
    recipient_user_id: UUID
    read_at: datetime | None


MessageRecipientResponse = MessageRecipientRead


class NotificationCreate(BaseModel):
    notification_type: str
    title: str
    body: str
    payload: dict | None = None


class NotificationUpdate(BaseModel):
    title: str | None = None
    body: str | None = None
    payload: dict | None = None


class NotificationRead(TimestampRead):
    notification_type: str
    title: str
    body: str
    payload: dict | None


NotificationResponse = NotificationRead
NotificationListResponse = ListResponse[NotificationRead]


class UserNotificationCreate(BaseModel):
    notification_id: UUID
    user_id: UUID
    status: NotificationStatus = NotificationStatus.PENDING


class UserNotificationUpdate(BaseModel):
    status: NotificationStatus | None = None
    is_read: bool | None = None
    read_at: datetime | None = None


class UserNotificationRead(ORMModel):
    notification_id: UUID
    user_id: UUID
    status: NotificationStatus
    is_read: bool
    read_at: datetime | None


UserNotificationResponse = UserNotificationRead
