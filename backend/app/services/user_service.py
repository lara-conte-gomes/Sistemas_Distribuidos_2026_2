from sqlalchemy.orm import Session

from app.repositories import user as user_repository
from app.schemas.user import User, UserPatch, UserUpdate


# Retornar a lista de usuários
def list_users(db: Session):
    return user_repository.list_users(db)


# Função para buscar um usuário
def get_user(db: Session, user_id: int):
    return user_repository.get_user(db, user_id)


# Função para criar um usuário
def create_user(db: Session, user: User):
    return user_repository.create_user(
        db,
        name=user.name,
        age=user.age,
    )


# Função para atualizar completamente um usuário
def update_user(db: Session, user_id: int, user: UserUpdate):
    return user_repository.update_user(
        db,
        user_id,
        user.model_dump(),
    )


# Função para atualizar parcialmente um usuário
def partial_update_user(db: Session, user_id: int, user: UserPatch):
    return user_repository.update_user(
        db,
        user_id,
        user.model_dump(exclude_unset=True),
    )


# Função para deletar um usuário
def delete_user(db: Session, user_id: int):
    return user_repository.delete_user(db, user_id)
