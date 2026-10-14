from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.user import User, UserPatch, UserResponse, UserUpdate
from app.services import user_service

router = APIRouter(prefix="/users", tags=["Users"])

DbSession = Annotated[Session, Depends(get_db)]


# Mstrar a lista de usuários
@router.get("/", response_model=list[UserResponse])
def list_users(db: DbSession):
    return user_service.list_users(db)


# Buscar um usuário específico
@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: DbSession):
    user = user_service.get_user(db, user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esse funcionário não foi encontrado na lista",
        )

    return user


# Criar um usuário
@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_user(user: User, db: DbSession):
    return user_service.create_user(db, user)


# Atualizar completamente um usuário
@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    user: UserUpdate,
    db: DbSession,
):
    updated_user = user_service.update_user(db, user_id, user)

    if updated_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esse funcionário não foi encontrado",
        )

    return updated_user


# Atualizar parcialmente um usuário
@router.patch("/{user_id}", response_model=UserResponse)
def partial_update_user(
    user_id: int,
    user: UserPatch,
    db: DbSession,
):
    updated_user = user_service.partial_update_user(db, user_id, user)

    if updated_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esse funcionário não foi encontrado",
        )

    return updated_user


# Deletar um usuário
@router.delete("/{user_id}")
def delete_user(user_id: int, db: DbSession):
    deleted = user_service.delete_user(db, user_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esse funcionário não foi encontrado",
        )

    return {"message": "O funcionário foi removido"}
