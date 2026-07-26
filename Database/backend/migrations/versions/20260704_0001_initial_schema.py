"""Initial production schema for Vendor Reliability Intelligence Platform.

Revision ID: 20260704_0001
Revises:
Create Date: 2026-07-04
"""

from pathlib import Path

from alembic import op

revision = "20260704_0001"
down_revision = None
branch_labels = None
depends_on = None


def _schema_sql() -> str:
    return Path(__file__).resolve().parents[3].joinpath("docs", "schema.sql").read_text(encoding="utf-8")


def upgrade() -> None:
    op.execute(_schema_sql())


def downgrade() -> None:
    op.execute(
        """
        DROP TABLE IF EXISTS dashboard_metrics CASCADE;
        DROP TABLE IF EXISTS reports CASCADE;
        DROP TABLE IF EXISTS user_notifications CASCADE;
        DROP TABLE IF EXISTS notifications CASCADE;
        DROP TABLE IF EXISTS message_recipients CASCADE;
        DROP TABLE IF EXISTS messages CASCADE;
        DROP TABLE IF EXISTS contract_notifications CASCADE;
        DROP TABLE IF EXISTS contract_documents CASCADE;
        DROP TABLE IF EXISTS contract_terms CASCADE;
        DROP TABLE IF EXISTS contracts CASCADE;
        DROP TABLE IF EXISTS purchase_order_items CASCADE;
        DROP TABLE IF EXISTS purchase_orders CASCADE;
        DROP TABLE IF EXISTS vendor_quotation_items CASCADE;
        DROP TABLE IF EXISTS vendor_quotations CASCADE;
        DROP TABLE IF EXISTS procurement_items CASCADE;
        DROP TABLE IF EXISTS procurement_requests CASCADE;
        DROP TABLE IF EXISTS vendor_compliance_status CASCADE;
        DROP TABLE IF EXISTS risk_assessment_factors CASCADE;
        DROP TABLE IF EXISTS risk_assessments CASCADE;
        DROP TABLE IF EXISTS risk_factors CASCADE;
        DROP TABLE IF EXISTS vendor_kpi_history CASCADE;
        DROP TABLE IF EXISTS vendor_reliability_scores CASCADE;
        DROP TABLE IF EXISTS performance_metrics CASCADE;
        DROP TABLE IF EXISTS vendor_documents CASCADE;
        DROP TABLE IF EXISTS vendor_addresses CASCADE;
        DROP TABLE IF EXISTS vendor_contacts CASCADE;
        DROP TABLE IF EXISTS vendors CASCADE;
        DROP TABLE IF EXISTS vendor_categories CASCADE;
        DROP TABLE IF EXISTS audit_logs CASCADE;
        DROP TABLE IF EXISTS login_history CASCADE;
        DROP TABLE IF EXISTS role_permissions CASCADE;
        DROP TABLE IF EXISTS user_roles CASCADE;
        DROP TABLE IF EXISTS permissions CASCADE;
        DROP TABLE IF EXISTS roles CASCADE;
        DROP TABLE IF EXISTS users CASCADE;

        DROP TYPE IF EXISTS message_priority;
        DROP TYPE IF EXISTS audit_action;
        DROP TYPE IF EXISTS document_type;
        DROP TYPE IF EXISTS notification_status;
        DROP TYPE IF EXISTS contract_status;
        DROP TYPE IF EXISTS purchase_order_status;
        DROP TYPE IF EXISTS quotation_status;
        DROP TYPE IF EXISTS procurement_status;
        DROP TYPE IF EXISTS compliance_status;
        DROP TYPE IF EXISTS risk_level;
        DROP TYPE IF EXISTS vendor_status;
        DROP TYPE IF EXISTS user_status;
        """
    )
