# Database Table Guide

## Authentication & User Management
- `users`: Internal application users authenticated by JWT. Stores account identity, password hash, status, and soft-delete metadata.
- `roles`: RBAC roles such as platform administrator, procurement manager, risk analyst, and vendor manager.
- `permissions`: Atomic resource/action permissions used to authorize API operations.
- `user_roles`: Junction table assigning many roles to many users.
- `role_permissions`: Junction table assigning many permissions to many roles.
- `login_history`: Append-only login success/failure history for security monitoring.
- `audit_logs`: Append-only change history with before/after JSON snapshots and actor information.

## Vendor Management
- `vendor_categories`: Classification master data for vendor segmentation.
- `vendors`: Canonical vendor master records with tax identity, registration, status, and category.
- `vendor_contacts`: Vendor people and communication points.
- `vendor_addresses`: Vendor operational, billing, registered, or shipping addresses.
- `vendor_documents`: Vendor document metadata and storage references.

## Vendor Performance
- `performance_metrics`: KPI definitions, weights, units, and scoring direction.
- `vendor_reliability_scores`: Periodic aggregate vendor reliability scores.
- `vendor_kpi_history`: Periodic metric-level KPI facts per vendor.

## Risk Management
- `risk_factors`: Weighted risk dimensions used during assessments.
- `risk_assessments`: Vendor-level risk assessment header records.
- `risk_assessment_factors`: Factor-level scores for each risk assessment.
- `vendor_compliance_status`: Current compliance status by compliance type for each vendor.

## Procurement
- `procurement_requests`: Internal demand requests raised by departments.
- `procurement_items`: Line items requested for procurement.
- `vendor_quotations`: Vendor quotation headers linked to procurement requests.
- `vendor_quotation_items`: Quoted prices for requested items.
- `purchase_orders`: Purchase order headers issued to vendors.
- `purchase_order_items`: Purchase order line items.

## Contract Management
- `contracts`: Vendor contracts with value, owner, dates, and status.
- `contract_terms`: Structured key/value contract terms.
- `contract_documents`: Contract document metadata and storage references.
- `contract_notifications`: Scheduled contract reminders, renewals, and expiry notices.

## Communication
- `messages`: Vendor-contextual or internal messages.
- `message_recipients`: Message delivery and read state per user.
- `notifications`: Notification templates or generated notification events.
- `user_notifications`: Notification delivery and read state per user.

## Reporting
- `reports`: Report definitions stored as JSONB metadata.
- `dashboard_metrics`: Dashboard metric registry and display configuration.

## Operational Notes
- Soft-deleted rows keep historical integrity while hiding inactive business records from normal application queries.
- Audit and login tables are append-only and should be partitioned as volume grows.
- Document tables store metadata only; binary content belongs in object storage.
- JSONB is intentionally limited to extension points where strict 3NF tables would make reporting and notification configuration unnecessarily rigid.
