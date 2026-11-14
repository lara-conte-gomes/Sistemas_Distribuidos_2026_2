# imports
from fastapi import FastAPI

from app.api.routes.checar_api import router as check_router
from app.api.routes.funcionarios import router as funcionarios_router
from app.api.routes.livros import router as livros_router
from app.api.routes.revistas import router as revistas_router

# Criação da instância da aplicação do FastAPI
app = FastAPI()

# Registrando o conjunto de rotas da API
app.include_router(funcionarios_router)
app.include_router(livros_router)
app.include_router(revistas_router)
app.include_router(check_router)
