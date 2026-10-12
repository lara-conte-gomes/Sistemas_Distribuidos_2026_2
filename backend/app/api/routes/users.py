from fastapi import APIRouter, HTTPException, status

from app.schemas.user import User, UserPatch, UserUpdate
from app.services import user_service

router = APIRouter(prefix="/users", tags=["Users"])


# Rota para mostrar a lista de usuários
@router.get("/")
def list_users():
    return user_service.list_users()


# Rota para buscar um usuário específico
@router.get("/{user_name}")
def get_user(user_name: str):
    user = user_service.get_user(user_name)

    # Exceção caso o usuário não existir
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esse funcionário não foi encontrado na lista",
        )

    return user


# Rota para criar um usuário
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(user: User):
    return user_service.create_user(user)


# Rota para atualizar completamente um usuário
@router.put("/{user_name}")
def update_user(user_name: str, user: UserUpdate):
    updated_user = user_service.update_user(user_name, user)

    # Exceção caso o usuário não existir
    if updated_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esse funcionário não foi encontrado",
        )

    return updated_user


# Rota para atualizar parcialmente um usuário
@router.patch("/{user_name}")
def partial_update_user(user_name: str, user: UserPatch):
    updated_user = user_service.partial_update_user(user_name, user)

    # Exceção caso o usuário não existir
    if updated_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esse funcionário não foi encontrado",
        )

    return updated_user


# Rota para deletar um usuário
@router.delete("/{user_name}")
def delete_user(user_name: str):
    deleted = user_service.delete_user(user_name)

    # Exceção caso o usuário não existir
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Esse funcionário não foi encontrado",
        )

    return {"message": "O funcionário foi removido"}
