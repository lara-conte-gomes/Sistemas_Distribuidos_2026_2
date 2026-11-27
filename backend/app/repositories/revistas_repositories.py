from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.revistas_models import Revista


# Ver a lista de revistas
def list_revistas(db: Session):
    statement = select(Revista)
    return db.scalars(statement).all()


# Buscar uma revista
def get_revista(db: Session, revista_id: int):
    return db.get(Revista, revista_id)


# Buscar uma revista pelo titulo
def get_revista_by_titulo(db: Session, titulo: str):
    statement = select(Revista).where(Revista.titulo == titulo)
    return db.scalars(statement).first()


# Adicionar uma revista
def adicionar_revista(
    db: Session, titulo: str, genero: str, edicao: str, quantidade: int
):
    nova_revista = Revista(
        titulo=titulo, genero=genero, edicao=edicao, quantidade=quantidade
    )

    db.add(nova_revista)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise

    db.refresh(nova_revista)

    return nova_revista


# Atualizar os dados da revista
def update_revista(db: Session, revista_id, data: dict):
    revista = get_revista(db, revista_id)

    if revista is None:
        return None

    for field, value in data.items():
        setattr(revista, field, value)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise

    db.refresh(revista)

    return revista


# Deletar uma revista
def delete_revista(db: Session, revista_id):
    revista = get_revista(db, revista_id)

    if revista is None:
        return False

    db.delete(revista)
    db.commit()

    return True
