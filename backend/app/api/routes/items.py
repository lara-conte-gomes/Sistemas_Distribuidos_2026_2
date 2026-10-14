from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.item import CreateItem, ItemPatch, ItemResponse, ItemUpdate
from app.services import item_service

router = APIRouter(prefix="/items", tags=["Items"])

DbSession = Annotated[Session, Depends(get_db)]


# Mstrar a lista de items
@router.get("/", response_model=list[ItemResponse])
def list_items(db: DbSession):
    return item_service.list_items(db)


# Buscar um item específico
@router.get("/{item_id}", response_model=ItemResponse)
def get_item(item_id: int, db: DbSession):
    item = item_service.get_item(db, item_id)

    if item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item não encontrado",
        )

    return item


# Criar um item
@router.post(
    "/",
    response_model=ItemResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_item(item: CreateItem, db: DbSession):
    return item_service.create_item(db, item)


# Atualizar completamente um item
@router.put("/{item_id}", response_model=ItemResponse)
def update_item(
    item_id: int,
    item: ItemUpdate,
    db: DbSession,
):
    updated_item = item_service.update_item(db, item_id, item)

    if updated_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item não encontrado",
        )

    return updated_item


# Atualizar parcialmente um item
@router.patch("/{item_id}", response_model=ItemResponse)
def partial_update_item(
    item_id: int,
    item: ItemPatch,
    db: DbSession,
):
    updated_item = item_service.partial_update_item(db, item_id, item)

    if updated_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item não encontrado",
        )

    return updated_item


# Deletar um item
@router.delete("/{item_id}")
def delete_item(item_id: int, db: DbSession):
    deleted = item_service.delete_item(db, item_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item não encontrado",
        )

    return {"message": "Item removido"}
