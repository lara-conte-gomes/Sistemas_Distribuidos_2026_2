from fastapi import APIRouter, HTTPException, status

from app.api.schemas.livros_schemas import CriarLivro, LivroPatch, LivroUpdate
from app.api.services import livros_service

router = APIRouter(prefix="/livros", tags=["Livros"])


# Rota para mostrar a lista de livros que exitem na loja
@router.get("/")
def lista_livros():
    return livros_service.lista_livros()


# Rota para buscar um livro específico
@router.get("/{livro_titulo}")
def get_livro(livro_titulo: str):
    livro = livros_service.get_livro(livro_titulo)

    # Exceção para caso o livro não exista na lista
    if livro is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="O livro que você busca não foi encontrado",
        )

    return livro


# Rota para a adição de um livro novo
@router.post("/", status_code=status.HTTP_201_CREATED)
def adicionar_livro(livro: CriarLivro):
    return livros_service.adicionar_livro(livro)


# Rota para atualizar um livro
@router.put("/{livro_titulo}")
def update_livro(livro_titulo: str, livro: LivroUpdate):
    updated_livro = livros_service.update_livro(livro_titulo, livro)

    # Exceção para caso o livro não exista na lista
    if updated_livro is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="O livro que você busca não foi encontrado",
        )

    return updated_livro


# Rota para atualização parcial dos dados de um livro
@router.patch("/{livro_titulo}")
def partial_update_livro(livro_titulo: str, livro: LivroPatch):
    parcial_updated_livro = livros_service.partial_update_livro(livro_titulo, livro)

    # Exceção para caso o livro não exista na lista
    if parcial_updated_livro is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="O livro que você busca não foi encontrado",
        )

    return parcial_updated_livro


# Rota para deletar um livro
@router.delete("/{livro_titulo}")
def delete_livro(livro_titulo: str):
    deletar = livros_service.delete_livro(livro_titulo)

    # Exceção para caso o livro não exista na lista
    if not deletar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="O livro que você busca não foi encontrado",
        )

    return {"mensagem": "O livro foi removido com sucesso"}
