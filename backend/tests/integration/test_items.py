from fastapi import status
from fastapi.testclient import TestClient

from app.main import app
from app.services import item_service

client = TestClient(app)


def setup_function():
    item_service.items.clear()
    item_service.items.append({"name": "notebook", "quantity": 50})


# Teste de listagem dos itens
def test_list_items():
    response = client.get("/items/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {
            "name": "notebook",
            "quantity": 50,
        }
    ]


# Teste de busca de um item
def test_get_item():
    response = client.get("/items/notebook")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "name": "notebook",
        "quantity": 50,
    }


# Teste de Item inexistente
def test_item_not_found():
    response = client.get("/items/mouse")

    assert response.status_code == status.HTTP_404_NOT_FOUND


# Teste de criação de um item
def test_create_item():
    response = client.post(
        "/items/",
        json={
            "name": "mouse",
            "quantity": 20,
        },
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json() == {
        "name": "mouse",
        "quantity": 20,
    }


# Teste de atualização completa de um item
def test_update_item():
    response = client.put(
        "/items/notebook",
        json={
            "name": "notebook-gamer",
            "quantity": 30,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "name": "notebook-gamer",
        "quantity": 30,
    }


# Teste de atualização parcial de um item
def test_partial_update_item():
    response = client.patch(
        "/items/notebook",
        json={
            "quantity": 25,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "name": "notebook",
        "quantity": 25,
    }


# Teste de remoção de um item
def test_delete_item():
    response = client.delete("/items/notebook")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"message": "O item foi removido"}
