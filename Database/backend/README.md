# Vendor Reliability Intelligence Platform Backend

This backend scaffold contains the production database architecture for the Vendor Reliability Intelligence Platform.

## Generated Artifacts
- `docs/architecture.md`: Requirements, design decisions, ER diagram, implementation notes, API order, and scalability guidance.
- `docs/schema.sql`: Complete PostgreSQL DDL.
- `docs/seed_data.sql`: Initial RBAC, master data, and sample records.
- `backend/app/models/`: SQLAlchemy 2.0 ORM models.
- `backend/app/schemas/`: Pydantic v2 request/response schemas.
- `backend/migrations/versions/20260704_0001_initial_schema.py`: Initial Alembic migration.

## First Run
1. Create a PostgreSQL database named `vendor_reliability`.
2. Install FastAPI, SQLAlchemy 2.0, Alembic, asyncpg, psycopg, and Pydantic v2 dependencies.
3. From `backend/`, run Alembic upgrade head.
4. Apply `docs/seed_data.sql` for local development seed data.
