from fastapi import status
from fastapi.testclient import TestClient

from app.main import app
from app.services import user_service

client = TestClient(app)


def setup_function():
    user_service.users.clear()
    user_service.users.append({"name": "Luíza", "age": 22})


# Teste de listagem de usuários
def test_list_users():
    response = client.get("/users/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {
            "name": "Luíza",
            "age": 22,
        }
    ]


# Teste de busca de um usuário
def test_get_user():
    response = client.get("/users/Luíza")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "name": "Luíza",
        "age": 22,
    }


# Teste de um usuário inexistente
def test_user_not_found():
    response = client.get("/users/Maria")

    assert response.status_code == status.HTTP_404_NOT_FOUND


# Teste de criação de um usuário
def test_create_user():
    response = client.post(
        "/users/",
        json={
            "name": "Maria",
            "age": 25,
        },
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json() == {
        "name": "Maria",
        "age": 25,
    }


# Teste de atualização completa de um usuário
def test_update_user():
    response = client.put(
        "/users/Luíza",
        json={
            "name": "Luíza Silva",
            "age": 23,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "name": "Luíza Silva",
        "age": 23,
    }


# Teste de atualização parical de um usuário
def test_partial_update_user():
    response = client.patch(
        "/users/Luíza",
        json={
            "age": 23,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "name": "Luíza",
        "age": 23,
    }


# Teste de remoção de um usuário
def test_delete_user():
    response = client.delete("/users/Luíza")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"message": "O funcionário foi removido"}
