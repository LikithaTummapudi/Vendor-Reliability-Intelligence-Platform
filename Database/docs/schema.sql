CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE user_status AS ENUM ('active', 'inactive', 'locked', 'pending');
CREATE TYPE vendor_status AS ENUM ('draft', 'active', 'suspended', 'blacklisted', 'archived');
CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE compliance_status AS ENUM ('compliant', 'non_compliant', 'pending_review', 'expired');
CREATE TYPE procurement_status AS ENUM ('draft', 'submitted', 'approved', 'rejected', 'cancelled', 'fulfilled');
CREATE TYPE quotation_status AS ENUM ('requested', 'received', 'accepted', 'rejected', 'expired');
CREATE TYPE purchase_order_status AS ENUM ('draft', 'issued', 'acknowledged', 'partially_received', 'received', 'cancelled', 'closed');
CREATE TYPE contract_status AS ENUM ('draft', 'active', 'expired', 'terminated', 'renewal_pending');
CREATE TYPE notification_status AS ENUM ('pending', 'sent', 'failed', 'read');
CREATE TYPE document_type AS ENUM ('tax', 'compliance', 'contract', 'insurance', 'certification', 'other');
CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'login', 'logout', 'approve', 'reject');
CREATE TYPE message_priority AS ENUM ('low', 'normal', 'high', 'urgent');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    status user_status NOT NULL DEFAULT 'pending',
    is_superuser BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
COMMENT ON TABLE users IS 'Application users authenticated by JWT; password_hash stores only a secure hash.';

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_system_role BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
COMMENT ON TABLE roles IS 'Role names used for RBAC authorization.';

CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource VARCHAR(100) NOT NULL,
    action VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_permissions_resource_action UNIQUE (resource, action)
);
COMMENT ON TABLE permissions IS 'Atomic permissions for resource/action based access control.';

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT uq_user_roles_user_role UNIQUE (user_id, role_id)
);

CREATE TABLE role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (role_id, permission_id),
    CONSTRAINT uq_role_permissions_role_permission UNIQUE (role_id, permission_id)
);

CREATE TABLE login_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    ip_address INET,
    user_agent TEXT,
    successful BOOLEAN NOT NULL,
    failure_reason VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action audit_action NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID,
    before_data JSONB,
    after_data JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE audit_logs IS 'Append-only audit history for security and compliance.';

CREATE TABLE vendor_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES vendor_categories(id) ON DELETE SET NULL,
    legal_name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    tax_identifier VARCHAR(100) NOT NULL,
    registration_number VARCHAR(100) UNIQUE,
    website VARCHAR(255),
    status vendor_status NOT NULL DEFAULT 'draft',
    onboarding_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_vendors_legal_tax UNIQUE (legal_name, tax_identifier)
);
COMMENT ON TABLE vendors IS 'Canonical vendor master records.';

CREATE TABLE vendor_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    title VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_vendor_contacts_vendor_email UNIQUE (vendor_id, email)
);

CREATE TABLE vendor_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    address_type VARCHAR(50) NOT NULL,
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(30) NOT NULL,
    country VARCHAR(2) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT ck_vendor_addresses_country_len CHECK (char_length(country) = 2)
);

CREATE TABLE vendor_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    name VARCHAR(255) NOT NULL,
    storage_key VARCHAR(500) NOT NULL,
    file_url VARCHAR(1000),
    issued_at DATE,
    expires_at DATE,
    verified_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT ck_vendor_doc_valid_dates CHECK (expires_at IS NULL OR issued_at IS NULL OR expires_at >= issued_at)
);

CREATE TABLE performance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    weight NUMERIC(5,2) NOT NULL,
    unit VARCHAR(30),
    higher_is_better BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT ck_performance_metric_weight_range CHECK (weight >= 0 AND weight <= 100)
);

CREATE TABLE vendor_reliability_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    score_period_start DATE NOT NULL,
    score_period_end DATE NOT NULL,
    overall_score NUMERIC(5,2) NOT NULL,
    grade VARCHAR(5),
    calculated_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_vendor_reliability_score_range CHECK (overall_score >= 0 AND overall_score <= 100),
    CONSTRAINT ck_vendor_reliability_period CHECK (score_period_end >= score_period_start),
    CONSTRAINT uq_vendor_reliability_period UNIQUE (vendor_id, score_period_start, score_period_end)
);

CREATE TABLE vendor_kpi_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    metric_id UUID NOT NULL REFERENCES performance_metrics(id) ON DELETE RESTRICT,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    actual_value NUMERIC(12,4) NOT NULL,
    target_value NUMERIC(12,4),
    score NUMERIC(5,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_vendor_kpi_score_range CHECK (score >= 0 AND score <= 100),
    CONSTRAINT ck_vendor_kpi_period CHECK (period_end >= period_start),
    CONSTRAINT uq_vendor_kpi_period UNIQUE (vendor_id, metric_id, period_start, period_end)
);

CREATE TABLE risk_factors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    weight NUMERIC(5,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT ck_risk_factor_weight_range CHECK (weight >= 0 AND weight <= 100)
);

CREATE TABLE risk_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    assessed_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    assessment_date DATE NOT NULL,
    risk_level risk_level NOT NULL,
    overall_score NUMERIC(5,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT ck_risk_assessment_score_range CHECK (overall_score >= 0 AND overall_score <= 100)
);

CREATE TABLE risk_assessment_factors (
    assessment_id UUID NOT NULL REFERENCES risk_assessments(id) ON DELETE CASCADE,
    risk_factor_id UUID NOT NULL REFERENCES risk_factors(id) ON DELETE RESTRICT,
    score NUMERIC(5,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (assessment_id, risk_factor_id),
    CONSTRAINT ck_risk_assessment_factor_score_range CHECK (score >= 0 AND score <= 100),
    CONSTRAINT uq_risk_assessment_factor UNIQUE (assessment_id, risk_factor_id)
);

CREATE TABLE vendor_compliance_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    compliance_type VARCHAR(100) NOT NULL,
    status compliance_status NOT NULL,
    effective_at DATE NOT NULL,
    expires_at DATE,
    verified_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT ck_vendor_compliance_valid_dates CHECK (expires_at IS NULL OR expires_at >= effective_at),
    CONSTRAINT uq_vendor_compliance_type UNIQUE (vendor_id, compliance_type)
);

CREATE TABLE procurement_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_number VARCHAR(50) NOT NULL UNIQUE,
    requested_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    department VARCHAR(100) NOT NULL,
    status procurement_status NOT NULL DEFAULT 'draft',
    needed_by DATE,
    business_justification TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE procurement_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES procurement_requests(id) ON DELETE CASCADE,
    sku VARCHAR(100),
    description TEXT NOT NULL,
    quantity NUMERIC(14,4) NOT NULL,
    unit_of_measure VARCHAR(30) NOT NULL,
    estimated_unit_price NUMERIC(14,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_procurement_item_quantity_positive CHECK (quantity > 0),
    CONSTRAINT ck_procurement_item_estimated_price CHECK (estimated_unit_price IS NULL OR estimated_unit_price >= 0)
);

CREATE TABLE vendor_quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_number VARCHAR(50) NOT NULL UNIQUE,
    request_id UUID NOT NULL REFERENCES procurement_requests(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    status quotation_status NOT NULL DEFAULT 'requested',
    valid_until DATE,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    total_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT ck_vendor_quotation_total_nonnegative CHECK (total_amount >= 0),
    CONSTRAINT ck_vendor_quotation_currency_len CHECK (char_length(currency) = 3)
);

CREATE TABLE vendor_quotation_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id UUID NOT NULL REFERENCES vendor_quotations(id) ON DELETE CASCADE,
    procurement_item_id UUID NOT NULL REFERENCES procurement_items(id) ON DELETE CASCADE,
    quantity NUMERIC(14,4) NOT NULL,
    unit_price NUMERIC(14,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_vendor_quotation_item_quantity_positive CHECK (quantity > 0),
    CONSTRAINT ck_vendor_quotation_item_unit_price_nonnegative CHECK (unit_price >= 0)
);

CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_number VARCHAR(50) NOT NULL UNIQUE,
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    quotation_id UUID REFERENCES vendor_quotations(id) ON DELETE SET NULL,
    issued_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status purchase_order_status NOT NULL DEFAULT 'draft',
    issued_at DATE,
    expected_delivery_date DATE,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    total_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT ck_purchase_order_total_nonnegative CHECK (total_amount >= 0),
    CONSTRAINT ck_purchase_order_currency_len CHECK (char_length(currency) = 3)
);

CREATE TABLE purchase_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_order_id UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity NUMERIC(14,4) NOT NULL,
    unit_price NUMERIC(14,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_purchase_order_item_quantity_positive CHECK (quantity > 0),
    CONSTRAINT ck_purchase_order_item_unit_price_nonnegative CHECK (unit_price >= 0)
);

CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_number VARCHAR(50) NOT NULL UNIQUE,
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    status contract_status NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    renewal_date DATE,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    contract_value NUMERIC(14,2) NOT NULL DEFAULT 0,
    owner_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT ck_contract_valid_dates CHECK (end_date >= start_date),
    CONSTRAINT ck_contract_value_nonnegative CHECK (contract_value >= 0),
    CONSTRAINT ck_contract_currency_len CHECK (char_length(currency) = 3)
);

CREATE TABLE contract_terms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    term_key VARCHAR(100) NOT NULL,
    term_value TEXT NOT NULL,
    is_critical BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_contract_terms_contract_key UNIQUE (contract_id, term_key)
);

CREATE TABLE contract_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    name VARCHAR(255) NOT NULL,
    storage_key VARCHAR(500) NOT NULL,
    file_url VARCHAR(1000),
    uploaded_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE contract_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    notify_at TIMESTAMPTZ NOT NULL,
    status notification_status NOT NULL DEFAULT 'pending',
    recipient_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    priority message_priority NOT NULL DEFAULT 'normal',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE message_recipients (
    message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    recipient_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (message_id, recipient_user_id),
    CONSTRAINT uq_message_recipients_message_user UNIQUE (message_id, recipient_user_id)
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    notification_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    payload JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE user_notifications (
    notification_id UUID NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status notification_status NOT NULL DEFAULT 'pending',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (notification_id, user_id),
    CONSTRAINT uq_user_notifications_notification_user UNIQUE (notification_id, user_id)
);

CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    definition JSONB NOT NULL,
    owner_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE dashboard_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    metric_query_key VARCHAR(100) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    config JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX ix_users_email ON users(email);
CREATE INDEX ix_users_username ON users(username);
CREATE INDEX ix_users_deleted_at ON users(deleted_at);
CREATE INDEX ix_login_history_user_created ON login_history(user_id, created_at);
CREATE INDEX ix_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX ix_audit_logs_user_created ON audit_logs(user_id, created_at);
CREATE INDEX ix_vendors_legal_name ON vendors(legal_name);
CREATE INDEX ix_vendors_category_status ON vendors(category_id, status);
CREATE INDEX ix_vendor_contacts_vendor_id ON vendor_contacts(vendor_id);
CREATE INDEX ix_vendor_addresses_vendor_type ON vendor_addresses(vendor_id, address_type);
CREATE INDEX ix_vendor_documents_vendor_type ON vendor_documents(vendor_id, document_type);
CREATE INDEX ix_vendor_reliability_vendor_period ON vendor_reliability_scores(vendor_id, score_period_end);
CREATE INDEX ix_vendor_kpi_vendor_metric_period ON vendor_kpi_history(vendor_id, metric_id, period_end);
CREATE INDEX ix_risk_assessments_vendor_level ON risk_assessments(vendor_id, risk_level);
CREATE INDEX ix_vendor_compliance_status_vendor_id ON vendor_compliance_status(vendor_id);
CREATE INDEX ix_procurement_items_request_id ON procurement_items(request_id);
CREATE INDEX ix_vendor_quotations_vendor_status ON vendor_quotations(vendor_id, status);
CREATE INDEX ix_vendor_quotation_items_quotation_id ON vendor_quotation_items(quotation_id);
CREATE INDEX ix_vendor_quotation_items_procurement_item_id ON vendor_quotation_items(procurement_item_id);
CREATE INDEX ix_purchase_orders_vendor_status ON purchase_orders(vendor_id, status);
CREATE INDEX ix_purchase_order_items_purchase_order_id ON purchase_order_items(purchase_order_id);
CREATE INDEX ix_contracts_vendor_status ON contracts(vendor_id, status);
CREATE INDEX ix_contract_terms_contract_id ON contract_terms(contract_id);
CREATE INDEX ix_contract_documents_contract_id ON contract_documents(contract_id);
CREATE INDEX ix_contract_notifications_due_status ON contract_notifications(notify_at, status);
CREATE INDEX ix_messages_sender_created ON messages(sender_user_id, created_at);
CREATE INDEX ix_messages_vendor_id ON messages(vendor_id);
CREATE INDEX ix_notifications_type_created ON notifications(notification_type, created_at);
CREATE INDEX ix_user_notifications_user_status ON user_notifications(user_id, status);
CREATE INDEX ix_reports_owner_created ON reports(owner_user_id, created_at);
