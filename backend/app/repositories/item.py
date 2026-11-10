from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.item import Item


# Listar todos os itens que existem
def list_items(db: Session):
    statement = select(Item)
    return db.scalars(statement).all()


# Buscar um item pelo ID
def get_item(db: Session, item_id: int):
    return db.get(Item, item_id)


# Criar um item novo
def create_item(
    db: Session,
    name: str,
    quantity: int,
    description: str | None = None,
):
    new_item = Item(
        name=name,
        quantity=quantity,
        description=description,
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return new_item


# Atualizar um item da plataforma
def update_item(db: Session, item_id: int, data: dict):
    item = get_item(db, item_id)

    if item is None:
        return None

    for field, value in data.items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)

    return item


# Excluir um item da plataforma
def delete_item(db: Session, item_id: int):
    item = get_item(db, item_id)

    if item is None:
        return False

    db.delete(item)
    db.commit()

    return True
