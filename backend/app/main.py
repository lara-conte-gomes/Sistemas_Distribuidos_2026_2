from fastapi import FastAPI

from app.api.routes.items import router as items_router
from app.api.routes.message_check import router as message_router
from app.api.routes.users import router as users_router

app = FastAPI()

app.include_router(users_router)
app.include_router(items_router)
app.include_router(message_router)
