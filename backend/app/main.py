# imports
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.checar_api import router as check_router
from app.api.routes.funcionarios import router as funcionarios_router
from app.api.routes.livros import router as livros_router
from app.api.routes.revistas import router as revistas_router

# Criação da instância da aplicação do FastAPI
app = FastAPI()

# Comunicacao entre API e Frontend
cors_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type"],
)

# Registrando o conjunto de rotas da API
app.include_router(funcionarios_router)
app.include_router(livros_router)
app.include_router(revistas_router)
app.include_router(check_router)
