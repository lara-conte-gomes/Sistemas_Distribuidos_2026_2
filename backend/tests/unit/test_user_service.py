from app.schemas.user import User
from app.services import user_service


def setup_function():
    user_service.users.clear()
    user_service.users.append({"name": "Luíza", "age": 22})


# Teste de listagem de usuários
def test_list_users():
    users = user_service.list_users()

    assert len(users) == 1
    assert users[0]["name"] == "Luíza"


# Teste de busca de um usuário
def test_get_user():
    user = user_service.get_user("Luíza")

    assert user is not None
    assert user["name"] == "Luíza"
    assert user["age"] == 22


# Teste de busca de um usuário inexistente
def test_get_user_not_found():
    user = user_service.get_user("Maria")

    assert user is None


# Teste de criação de um usuário
def test_create_user():
    user = User(name="Maria", age=25)

    created_user = user_service.create_user(user)

    assert created_user["name"] == "Maria"
    assert created_user["age"] == 25
    assert len(user_service.users) == 2


# Teste de remoção de um usuário
def test_delete_user():
    deleted = user_service.delete_user("Luíza")

    assert deleted is True
    assert len(user_service.users) == 0
