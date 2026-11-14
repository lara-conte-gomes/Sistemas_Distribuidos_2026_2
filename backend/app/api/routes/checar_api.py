# imports
from fastapi import APIRouter

router = APIRouter(tags=["Checar API"])


# Criação da rota inicial
@router.get("/")
def root():
    return {"mensagem": "Seja Bem-Vindo a BookStore!"}


@router.get("/health")
def health_check():
    return {"status da aplicação": "ok"}
