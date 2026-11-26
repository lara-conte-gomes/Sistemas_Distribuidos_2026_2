from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.revistas_schemas import CriarRevista, RevistaPatch, RevistaUpdate
from app.services import revistas_service

router = APIRouter(prefix="/revista", tags=["Revista"])

DbSession = Annotated[Session, Depends(get_db)]


# Rota para mostrar a lista de revistas que tem na loja
@router.get("/")
def lista_revistas(db: DbSession):
    return revistas_service.lista_revistas(db)


# Rota para buscar uma revista específica
@router.get("/{revista_id}")
def get_revista(revista_id: int, db: DbSession):
    revista = revistas_service.get_revista(db, revista_id)

    # Exceção para caso a revista não exista na lista
    if revista is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="A revista que você busca não foi encontrada",
        )

    return revista


# Rota para a adição de uma revista nova
@router.post("/", status_code=status.HTTP_201_CREATED)
def adicionar_revista(revista: CriarRevista, db: DbSession):
    try:
        return revistas_service.adicionar_revista(db, revista)

    except revistas_service.RevistaDuplicadaError as erro:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(erro),
        ) from erro


# Rota para atualizar uma revista
@router.put("/{revista_id}")
def update_revista(revista_id: int, revista: RevistaUpdate, db: DbSession):
    try:
        updated_revista = revistas_service.update_revista(db, revista_id, revista)

    except revistas_service.RevistaDuplicadaError as erro:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(erro),
        ) from erro

    # Exceção para caso a revista não exista na lista
    if updated_revista is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="A revista que você busca não foi encontrada",
        )

    return updated_revista


# Rota para atualização parcial dos dados de uma revista
@router.patch("/{revista_id}")
def partial_update_revista(revista_id: int, revista: RevistaPatch, db: DbSession):
    try:
        parcial_updated_revista = revistas_service.partial_update_revista(
            db, revista_id, revista
        )

    except revistas_service.RevistaDuplicadaError as erro:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(erro),
        ) from erro

    # Exceção para caso a revista não exista na lista
    if parcial_updated_revista is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="A revista que você busca não foi encontrada",
        )

    return parcial_updated_revista


# Rota para deletar uma revista
@router.delete("/{revista_id}")
def delete_revista(revista_id: int, db: DbSession):
    deletar = revistas_service.delete_revista(db, revista_id)

    # Exceção para caso a revista não exista na lista
    if not deletar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="A revista que você busca não foi encontrada",
        )

    return {"mensagem": "A revista foi removida com sucesso"}
