from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.item import Item


# Ver a lista de itens
def list_items(db: Session):
    statement = select(Item)
    return db.scalars(statement).all()


# Buscar um item
def get_item(db: Session, item_id: int):
    return db.get(Item, item_id)


# Criar um item
def create_item(db: Session, name: str, quantity: int):
    new_item = Item(
        name=name,
        quantity=quantity,
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return new_item


# Atualizar alguma informação do item
def update_item(db: Session, item_id: int, data: dict):
    item = get_item(db, item_id)

    if item is None:
        return None

    for field, value in data.items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)

    return item


# Deletar alguma informação do item
def delete_item(db: Session, item_id: int):
    item = get_item(db, item_id)

    if item is None:
        return False

    db.delete(item)
    db.commit()

    return True
