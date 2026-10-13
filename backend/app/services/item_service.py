from sqlalchemy.orm import Session

from app.repositories import item as item_repository
from app.schemas.item import CreateItem, ItemPatch, ItemUpdate

# Implementando agora com ligação com repositories

# Ver a lista de itens
def list_items(db: Session):
    return item_repository.list_items(db)


# Buscando um item
def get_item(db: Session, item_id: int):
    return item_repository.get_item(db, item_id)


# Criando um item
def create_item(db: Session, item: CreateItem):
    return item_repository.create_item(
        db,
        name=item.name,
        quantity=item.quantity,
    )


# Atualizando um item
def update_item(db: Session, item_id: int, item: ItemUpdate):
    return item_repository.update_item(
        db,
        item_id,
        item.model_dump(),
    )


# Atualização parcial de um item
def partial_update_item(db: Session, item_id: int, item: ItemPatch):
    return item_repository.update_item(
        db,
        item_id,
        item.model_dump(exclude_unset=True),
    )


# Deletando um item
def delete_item(db: Session, item_id: int):
    return item_repository.delete_item(db, item_id)
