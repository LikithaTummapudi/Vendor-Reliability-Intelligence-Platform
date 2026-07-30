from fastapi import APIRouter

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.get("/test")
async def test():
    return {"message": "Auth API working"}