from fastapi import APIRouter

router = APIRouter(tags=["Message Check"])


# Mensagem inicial da API
@router.get("/")
def root():
    return {"message": "Sistema para cadastro de funcionários e itens de uma loja"}


# Rota para checagem da saúde da API
@router.get("/health")
def health_check():
    return {"status": "ok"}
