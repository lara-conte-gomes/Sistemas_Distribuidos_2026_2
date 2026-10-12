from fastapi import APIRouter, HTTPException, status

from app.schemas.item import CreateItem, ItemPatch, ItemUpdate
from app.services import item_service

router = APIRouter(prefix="/items", tags=["Items"])


# Rota para mostrar a lista de items
@router.get("/")
def list_items():
    return item_service.list_items()


# Rota para buscar um item
@router.get("/{item_name}")
def get_item(item_name: str):
    item = item_service.get_item(item_name)

    # Exceção se o item não existir
    if item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esse item não foi encontrado na lista",
        )

    return item


# Rota para criar um item
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_item(item: CreateItem):
    return item_service.create_item(item)


# Rota para atualizar um item
@router.put("/{item_name}")
def update_item(item_name: str, item: ItemUpdate):
    updated_item = item_service.update_item(item_name, item)

    # Exceção se o item não existir
    if updated_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esse item não foi encontrado",
        )

    return updated_item


# Rota para atualização parcial do item
@router.patch("/{item_name}")
def partial_update_item(item_name: str, item: ItemPatch):
    updated_item = item_service.partial_update_item(item_name, item)

    # Exceção se o item não existir
    if updated_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esse item não foi encontrado",
        )

    return updated_item


# Rota para deletar um item
@router.delete("/{item_name}")
def delete_item(item_name: str):
    deleted = item_service.delete_item(item_name)

    # Exceção se o item não existir
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esse item não foi encontrado",
        )

    return {"message": "O item foi removido"}
