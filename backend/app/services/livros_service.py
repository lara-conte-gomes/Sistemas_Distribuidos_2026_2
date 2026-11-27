from sqlalchemy.orm import Session

from app.repositories import livros_repositories as livro_rst
from app.schemas.livros_schemas import CriarLivro, LivroPatch, LivroUpdate


class LivroDuplicadoError(Exception):
    pass


# Funcao para verificar se o titulo ja existe
def validar_titulo(db: Session, titulo: str, livro_id: int | None = None):
    livro_existente = livro_rst.get_livro_by_titulo(db, titulo)

    if livro_existente is not None and livro_existente.id != livro_id:
        raise LivroDuplicadoError("Já existe um livro com esse título")


# Funcao para retornar a lista de livro
def lista_livro(db: Session):
    return livro_rst.list_livros(db)


# Funcao para buscar algum livro
def get_livro(db: Session, livro_id: int):
    return livro_rst.get_livro(db, livro_id)


# Funca para adicionar um novo livro
def adicionar_livro(db: Session, livro: CriarLivro):
    validar_titulo(db, livro.titulo)

    return livro_rst.adicionar_livro(
        db,
        titulo=livro.titulo,
        genero=livro.genero,
        publico_alvo=livro.publico_alvo,
        quantidade=livro.quantidade,
    )


# Funcao para atualizar os dados do livro
def update_livro(db: Session, livro_id: int, livro: LivroUpdate):
    if livro_rst.get_livro(db, livro_id) is None:
        return None

    validar_titulo(db, livro.titulo, livro_id)

    return livro_rst.update_livro(
        db,
        livro_id,
        livro.model_dump(exclude_unset=True),
    )


# Funcao para atualizar parcialmente as informacoes de um livro
def partial_update_livro(db: Session, livro_id: int, livro: LivroPatch):
    if livro_rst.get_livro(db, livro_id) is None:
        return None

    if livro.titulo is not None:
        validar_titulo(db, livro.titulo, livro_id)

    return livro_rst.update_livro(
        db,
        livro_id,
        livro.model_dump(exclude_unset=True),
    )


# Funcao para deletar um livro
def delete_livro(db: Session, livro_id: int):
    return livro_rst.delete_livro(db, livro_id)
