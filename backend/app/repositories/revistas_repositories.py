from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.revistas_models import Revistas

#Ver a lista de revistas
def list_revistas(db: Session):
    statement = select(Revistas)
    return db.scalars(statement).all()

#Buscar uma revista
def get_revista(db: Session, revista_id: int):
    return db.get(Revistas, revista_id)

#Adicionar uma revista
def adicionar_revista(db: Session, titulo: str, genero: str, edicao: str, quantidade: int):
    nova_revista= Revistas(
        titulo=titulo,
        genero=genero,
        edicao=edicao,
        quantidade=quantidade
    )

    db.add(nova_revista)
    db.commit()
    db.refresh(nova_revista)

    return nova_revista

#Atualizar os dados da revista
def update_revista(db: Session, revista_id, data:dict):
    revista = get_revista(db, revista_id)

    if revista is None:
        return None

    for field, value in data.revistas():
        setattr(revista, field, value)

    db.commit()
    db.refresh(revista)

    return revista

#Deletar uma revista
def deletar_revista(db: Session, revista_id):
    revista = get_revista(db, revista_id)

    if revista is None:
        return False

    db.delete(revista)
    db.commit()

    return revista
