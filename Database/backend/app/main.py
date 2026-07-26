from fastapi import FastAPI
from app.auth.auth import router as auth_router
from app.routers.vendor import router as vendor_router
from app.routers.procurement import router as procurement_router

app = FastAPI(
    title="Vendor Reliability Intelligence Platform",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(vendor_router)
app.include_router(procurement_router)

@app.get("/health", tags=["system"])
async def health_check():
    return {"status": "ok"}