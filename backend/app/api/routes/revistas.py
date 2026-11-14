from fastapi import APIRouter, HTTPException, status

from app.api.schemas.revistas_schemas import CriarRevista, RevistaPatch, RevistaUpdate
from app.api.services import revistas_service

router = APIRouter(prefix="/revista", tags=["Revista"])


# Rota para mostrar a lista de revistas que tem na loja
@router.get("/")
def lista_revistas():
    return revistas_service.lista_livros()


# Rota para buscar uma revista específica
@router.get("/{revista_titulo}")
def get_revista(revista_titulo: str):
    revista = revistas_service.get_revista(revista_titulo)

    # Exceção para caso a revista não exista na lista
    if revista is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="A revista que você busca não foi encontrada",
        )

    return revista


# Rota para a adição de uma revista nova
@router.post("/", status_code=status.HTTP_201_CREATED)
def adicionar_revista(revista: CriarRevista):
    return revistas_service.adicionar_revista(revista)


# Rota para atualizar uma revista
@router.put("/{revista_titulo}")
def update_revista(revista_titulo: str, revista: RevistaUpdate):
    updated_revista = revistas_service.update_funcionario(revista_titulo, revista)

    # Exceção para caso a revista não exista na lista
    if updated_revista is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="A revista que você busca não foi encontrada",
        )

    return updated_revista


# Rota para atualização parcial dos dados de um revista
@router.patch("/{revista_titulo}")
def partial_update_revista(revista_titulo: str, revista: RevistaPatch):
    parcial_updated_revista = revistas_service.partial_update_revista(
        revista_titulo, revista
    )

    # Exceção para caso a revista não exista na lista
    if parcial_updated_revista is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="A revista que você busca não foi encontrada",
        )

    return parcial_updated_revista


# Rota para deletar uma revista
@router.delete("/{revista_titulo}")
def delete_revista(revista_titulo: str):
    deletar = revistas_service.delete_funcionario(revista_titulo)

    # Exceção para caso a revista não exista na lista
    if not deletar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="A revista que você busca não foi encontrada",
        )

    return {"mensagem": "A revista foi removida com sucesso"}
