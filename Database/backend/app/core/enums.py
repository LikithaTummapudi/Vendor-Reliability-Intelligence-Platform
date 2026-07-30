from enum import StrEnum


def enum_values(enum_cls: type[StrEnum]) -> list[str]:
    return [member.value for member in enum_cls]


class UserStatus(StrEnum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    LOCKED = "locked"
    PENDING = "pending"


class VendorStatus(StrEnum):
    DRAFT = "draft"
    ACTIVE = "active"
    SUSPENDED = "suspended"
    BLACKLISTED = "blacklisted"
    ARCHIVED = "archived"


class RiskLevel(StrEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class ComplianceStatus(StrEnum):
    COMPLIANT = "compliant"
    NON_COMPLIANT = "non_compliant"
    PENDING_REVIEW = "pending_review"
    EXPIRED = "expired"


class ProcurementStatus(StrEnum):
    DRAFT = "draft"
    SUBMITTED = "submitted"
    APPROVED = "approved"
    REJECTED = "rejected"
    CANCELLED = "cancelled"
    FULFILLED = "fulfilled"


class QuotationStatus(StrEnum):
    REQUESTED = "requested"
    RECEIVED = "received"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    EXPIRED = "expired"


class PurchaseOrderStatus(StrEnum):
    DRAFT = "draft"
    ISSUED = "issued"
    ACKNOWLEDGED = "acknowledged"
    PARTIALLY_RECEIVED = "partially_received"
    RECEIVED = "received"
    CANCELLED = "cancelled"
    CLOSED = "closed"


class ContractStatus(StrEnum):
    DRAFT = "draft"
    ACTIVE = "active"
    EXPIRED = "expired"
    TERMINATED = "terminated"
    RENEWAL_PENDING = "renewal_pending"


class NotificationStatus(StrEnum):
    PENDING = "pending"
    SENT = "sent"
    FAILED = "failed"
    READ = "read"


class DocumentType(StrEnum):
    TAX = "tax"
    COMPLIANCE = "compliance"
    CONTRACT = "contract"
    INSURANCE = "insurance"
    CERTIFICATION = "certification"
    OTHER = "other"


class AuditAction(StrEnum):
    CREATE = "create"
    UPDATE = "update"
    DELETE = "delete"
    LOGIN = "login"
    LOGOUT = "logout"
    APPROVE = "approve"
    REJECT = "reject"


class MessagePriority(StrEnum):
    LOW = "low"
    NORMAL = "normal"
    HIGH = "high"
    URGENT = "urgent"
