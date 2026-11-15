from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db

from app.schemas.livros_schemas import CriarLivro, LivroPatch, LivroUpdate
from app.services import livros_service

router = APIRouter(prefix="/livro", tags=["Livros"])

DbSession = Annotated[Session, Depends(get_db)]

# Rota para mostrar a lista de livros que exitem na loja
@router.get("/")
def lista_livros(db: DbSession):
    return livros_service.lista_livro(db)


# Rota para buscar um livro específico
@router.get("/{livro_id}")
def get_livro(livro_id: int, db: DbSession):
    livro = livros_service.get_livro(db, livro_id)

    # Exceção para caso o livro não exista na lista
    if livro is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="O livro que você busca não foi encontrado",
        )

    return livro


# Rota para a adição de um livro novo
@router.post("/", status_code=status.HTTP_201_CREATED)
def adicionar_livro(livro: CriarLivro, db: DbSession):
    return livros_service.adicionar_livro(db, livro)


# Rota para atualizar um livro
@router.put("/{livro_id}")
def update_livro(livro_id: int, livro: LivroUpdate, db: DbSession):
    updated_livro = livros_service.update_livro(db, livro_id, livro)

    # Exceção para caso o livro não exista na lista
    if updated_livro is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="O livro que você busca não foi encontrado",
        )

    return updated_livro


# Rota para atualização parcial dos dados de um livro
@router.patch("/{livro_id}")
def partial_update_livro(livro_id: int, livro: LivroPatch, db: DbSession):
    parcial_updated_livro = livros_service.partial_update_livro(db, livro_id, livro)

    # Exceção para caso o livro não exista na lista
    if parcial_updated_livro is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="O livro que você busca não foi encontrado",
        )

    return parcial_updated_livro


# Rota para deletar um livro
@router.delete("/{livro_id}")
def delete_livro(livro_id: int, db: DbSession):
    deletar = livros_service.delete_livro(db, livro_id)

    # Exceção para caso o livro não exista na lista
    if not deletar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="O livro que você busca não foi encontrado",
        )

    return {"mensagem": "O livro foi removido com sucesso"}
