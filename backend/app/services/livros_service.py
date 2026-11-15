from sqlalchemy.orm import Session

from app.repositories import livros_repositories as livro_rst
from app.schemas.livros_schemas import CriarLivro, LivroPatch, LivroUpdate


# Funcao para retornar a lista de livro
def lista_livro(db: Session):
    return livro_rst.list_livros(db)


# Funcao para buscar algum livro
def get_livro(db: Session, livro_id: int):
    return livro_rst.get_livro(db, livro_id)


# Funca para adicionar um novo livro
def adicionar_livro(db: Session, livro: CriarLivro):
    return livro_rst.adicionar_livro(
        db,
        titulo=livro.titulo,
        genero=livro.genero,
        publico_alvo=livro.publico_alvo,
        quantidade=livro.quantidade,
    )


# Funcao para atualizar os dados do livro
def update_livro(db: Session, livro_id: int, livro: LivroUpdate):
    return livro_rst.update_livro(
        db,
        livro_id,
        livro.model_dump(exclude_unset=True),
    )


# Funcao para atualizar parcialmente as informacoes de um livro
def partial_update_livro(db: Session, livro_id: int, livro: LivroPatch):
    return livro_rst.update_livro(
        db,
        livro_id,
        livro.model_dump(exclude_unset=True),
    )


# Funcao para deletar um livro
def delete_livro(db: Session, livro_id: int):
    return livro_rst.delete_livro(db, livro_id)
