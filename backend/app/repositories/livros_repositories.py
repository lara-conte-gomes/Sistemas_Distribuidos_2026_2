from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.livros_models import Livro


# Ver a lista de livros
def list_livros(db: Session):
    statement = select(Livro)
    return db.scalars(statement).all()


# Buscar um livro
def get_livro(db: Session, livro_id: int):
    return db.get(Livro, livro_id)


# Adicionar um livro
def adicionar_livro(
    db: Session, titulo: str, genero: str, publico_alvo: str, quantidade: int
):
    novo_livro = Livro(
        titulo=titulo, genero=genero, publico_alvo=publico_alvo, quantidade=quantidade
    )

    db.add(novo_livro)
    db.commit()
    db.refresh(novo_livro)

    return novo_livro


# Atualizar os dados do livro
def update_livro(db: Session, livro_id, data: dict):
    livro = get_livro(db, livro_id)

    if livro is None:
        return None

    for field, value in data.items():
        setattr(livro, field, value)

    db.commit()
    db.refresh(livro)

    return livro


# Deletar um livro
def delete_livro(db: Session, livro_id):
    livro = get_livro(db, livro_id)

    if livro is None:
        return False

    db.delete(livro)
    db.commit()

    return True
