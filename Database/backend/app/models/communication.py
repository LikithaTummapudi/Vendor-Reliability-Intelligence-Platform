import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, Index, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.enums import MessagePriority, NotificationStatus, enum_values
from app.db.base import Base
from app.models.mixins import SoftDeleteMixin, TimestampMixin, UUIDPrimaryKeyMixin


class Message(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "messages"
    __table_args__ = (Index("ix_messages_sender_created", "sender_user_id", "created_at"),)

    sender_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    vendor_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("vendors.id", ondelete="SET NULL"), index=True)
    subject: Mapped[str] = mapped_column(String(255), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    priority: Mapped[MessagePriority] = mapped_column(
        Enum(MessagePriority, name="message_priority", values_callable=enum_values),
        nullable=False,
        default=MessagePriority.NORMAL,
    )

    recipients: Mapped[list["MessageRecipient"]] = relationship(back_populates="message", cascade="all, delete-orphan")


class MessageRecipient(TimestampMixin, Base):
    __tablename__ = "message_recipients"
    __table_args__ = (UniqueConstraint("message_id", "recipient_user_id", name="uq_message_recipients_message_user"),)

    message_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("messages.id", ondelete="CASCADE"), primary_key=True)
    recipient_user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    read_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))

    message: Mapped["Message"] = relationship(back_populates="recipients")


class Notification(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "notifications"
    __table_args__ = (Index("ix_notifications_type_created", "notification_type", "created_at"),)

    notification_type: Mapped[str] = mapped_column(String(100), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    payload: Mapped[Optional[dict]] = mapped_column(JSONB)

    users: Mapped[list["UserNotification"]] = relationship(back_populates="notification", cascade="all, delete-orphan")


class UserNotification(TimestampMixin, Base):
    __tablename__ = "user_notifications"
    __table_args__ = (
        UniqueConstraint("notification_id", "user_id", name="uq_user_notifications_notification_user"),
        Index("ix_user_notifications_user_status", "user_id", "status"),
    )

    notification_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("notifications.id", ondelete="CASCADE"), primary_key=True
    )
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    status: Mapped[NotificationStatus] = mapped_column(
        Enum(NotificationStatus, name="notification_status", values_callable=enum_values),
        nullable=False,
        default=NotificationStatus.PENDING,
    )
    is_read: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    read_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))

    notification: Mapped["Notification"] = relationship(back_populates="users")
