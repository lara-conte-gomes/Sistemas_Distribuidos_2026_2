from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User


# Retornar a lista de usuários
def list_users(db: Session):
    statement = select(User)
    return db.scalars(statement).all()


# Buscar um usuário pelo ID
def get_user(db: Session, user_id: int):
    return db.get(User, user_id)


# Criar um usuário
def create_user(db: Session, name: str, age: int):
    new_user = User(name=name, age=age)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# Atualizar um usuário
def update_user(db: Session, user_id: int, data: dict):
    user = get_user(db, user_id)

    if user is None:
        return None

    for field, value in data.items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)

    return user


# Deletar um usuário
def delete_user(db: Session, user_id: int):
    user = get_user(db, user_id)

    if user is None:
        return False

    db.delete(user)
    db.commit()

    return True
