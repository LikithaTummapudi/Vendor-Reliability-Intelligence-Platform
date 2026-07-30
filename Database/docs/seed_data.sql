INSERT INTO roles (id, name, description, is_system_role) VALUES
('00000000-0000-0000-0000-000000000001', 'platform_admin', 'Full platform administration', true),
('00000000-0000-0000-0000-000000000002', 'procurement_manager', 'Procurement and purchase order management', true),
('00000000-0000-0000-0000-000000000003', 'risk_analyst', 'Risk and compliance review', true),
('00000000-0000-0000-0000-000000000004', 'vendor_manager', 'Vendor profile and document management', true);

INSERT INTO permissions (id, resource, action, description) VALUES
('10000000-0000-0000-0000-000000000001', 'users', 'manage', 'Create and manage users'),
('10000000-0000-0000-0000-000000000002', 'vendors', 'manage', 'Create and manage vendors'),
('10000000-0000-0000-0000-000000000003', 'risk', 'review', 'Review vendor risk'),
('10000000-0000-0000-0000-000000000004', 'procurement', 'approve', 'Approve procurement requests'),
('10000000-0000-0000-0000-000000000005', 'contracts', 'manage', 'Manage contracts'),
('10000000-0000-0000-0000-000000000006', 'reports', 'read', 'Read reports and dashboards');

INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, id FROM permissions;

INSERT INTO role_permissions (role_id, permission_id) VALUES
('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000004'),
('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000006'),
('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003'),
('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000006'),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002');

INSERT INTO users (id, email, username, password_hash, first_name, last_name, status, is_superuser) VALUES
('20000000-0000-0000-0000-000000000001', 'admin@example.com', 'admin', '$argon2id$v=19$replace-with-real-hash', 'Platform', 'Admin', 'active', true),
('20000000-0000-0000-0000-000000000002', 'procurement@example.com', 'procurement.manager', '$argon2id$v=19$replace-with-real-hash', 'Priya', 'Shah', 'active', false),
('20000000-0000-0000-0000-000000000003', 'risk@example.com', 'risk.analyst', '$argon2id$v=19$replace-with-real-hash', 'Arjun', 'Mehta', 'active', false);

INSERT INTO user_roles (user_id, role_id) VALUES
('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002'),
('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003');

INSERT INTO vendor_categories (id, name, description) VALUES
('30000000-0000-0000-0000-000000000001', 'Technology Services', 'Software, cloud, security, and IT operations vendors'),
('30000000-0000-0000-0000-000000000002', 'Logistics', 'Freight, warehousing, and distribution vendors'),
('30000000-0000-0000-0000-000000000003', 'Facilities', 'Office, maintenance, and facilities vendors');

INSERT INTO vendors (id, category_id, legal_name, display_name, tax_identifier, registration_number, website, status, onboarding_date) VALUES
('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'Northstar Cloud Services LLC', 'Northstar Cloud', 'US-99-1234567', 'REG-NS-001', 'https://northstar.example.com', 'active', '2025-01-15'),
('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', 'RapidRoute Logistics Pvt Ltd', 'RapidRoute', 'IN-AAACR0000A', 'REG-RR-002', 'https://rapidroute.example.com', 'active', '2025-03-20');

INSERT INTO vendor_contacts (vendor_id, name, title, email, phone, is_primary) VALUES
('40000000-0000-0000-0000-000000000001', 'Maya Chen', 'Account Director', 'maya.chen@northstar.example.com', '+1-555-0101', true),
('40000000-0000-0000-0000-000000000002', 'Rohan Iyer', 'Operations Lead', 'rohan.iyer@rapidroute.example.com', '+91-80-555-0102', true);

INSERT INTO performance_metrics (id, code, name, description, weight, unit, higher_is_better) VALUES
('50000000-0000-0000-0000-000000000001', 'ON_TIME_DELIVERY', 'On-Time Delivery', 'Percentage of deliveries completed by committed date', 30.00, 'percent', true),
('50000000-0000-0000-0000-000000000002', 'QUALITY_SCORE', 'Quality Score', 'Composite quality score from acceptance and defect data', 30.00, 'score', true),
('50000000-0000-0000-0000-000000000003', 'SLA_COMPLIANCE', 'SLA Compliance', 'Percentage of contractual SLA targets met', 25.00, 'percent', true),
('50000000-0000-0000-0000-000000000004', 'INCIDENT_RATE', 'Incident Rate', 'Normalized incident rate', 15.00, 'rate', false);

INSERT INTO risk_factors (id, code, name, description, weight) VALUES
('60000000-0000-0000-0000-000000000001', 'FINANCIAL_STABILITY', 'Financial Stability', 'Liquidity, credit, and continuity risk', 30.00),
('60000000-0000-0000-0000-000000000002', 'REGULATORY_COMPLIANCE', 'Regulatory Compliance', 'Compliance posture and certification status', 30.00),
('60000000-0000-0000-0000-000000000003', 'CYBER_SECURITY', 'Cyber Security', 'Security controls and incident exposure', 25.00),
('60000000-0000-0000-0000-000000000004', 'OPERATIONAL_RESILIENCE', 'Operational Resilience', 'Business continuity and delivery concentration risk', 15.00);

INSERT INTO dashboard_metrics (code, name, metric_query_key, display_order, config) VALUES
('ACTIVE_VENDOR_COUNT', 'Active Vendors', 'active_vendor_count', 1, '{"format":"integer"}'),
('HIGH_RISK_VENDOR_COUNT', 'High Risk Vendors', 'high_risk_vendor_count', 2, '{"format":"integer"}'),
('EXPIRING_CONTRACT_COUNT', 'Expiring Contracts', 'expiring_contract_count', 3, '{"format":"integer"}');

INSERT INTO reports (code, name, description, definition, owner_user_id, is_public) VALUES
('VENDOR_RELIABILITY_SUMMARY', 'Vendor Reliability Summary', 'Reliability, KPI, and risk overview by vendor', '{"dataset":"vendor_reliability","filters":["date_range","category","risk_level"]}', '20000000-0000-0000-0000-000000000001', true);
