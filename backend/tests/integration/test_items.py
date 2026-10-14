from fastapi import status


# Teste de listagem dos itens
def test_list_items(client):
    client.post(
        "/items/",
        json={
            "name": "notebook",
            "quantity": 50,
        },
    )

    response = client.get("/items/")

    assert response.status_code == status.HTTP_200_OK

    items = response.json()

    assert len(items) == 1
    assert items[0]["name"] == "notebook"
    assert items[0]["quantity"] == 50
    assert isinstance(items[0]["id"], int)


# Teste de busca de um item
def test_get_item(client):
    created = client.post(
        "/items/",
        json={
            "name": "notebook",
            "quantity": 50,
        },
    )

    item_id = created.json()["id"]

    response = client.get(f"/items/{item_id}")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "id": item_id,
        "name": "notebook",
        "quantity": 50,
    }


# Teste de item inexistente
def test_item_not_found(client):
    response = client.get("/items/999")

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {
        "detail": "Item não encontrado",
    }


# Teste de criação de um item
def test_create_item(client):
    response = client.post(
        "/items/",
        json={
            "name": "mouse",
            "quantity": 20,
        },
    )

    assert response.status_code == status.HTTP_201_CREATED

    item = response.json()

    assert isinstance(item["id"], int)
    assert item["name"] == "mouse"
    assert item["quantity"] == 20


# Teste de atualização completa de um item
def test_update_item(client):
    created = client.post(
        "/items/",
        json={
            "name": "notebook",
            "quantity": 50,
        },
    )

    item_id = created.json()["id"]

    response = client.put(
        f"/items/{item_id}",
        json={
            "name": "notebook-gamer",
            "quantity": 30,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "id": item_id,
        "name": "notebook-gamer",
        "quantity": 30,
    }


# Teste de atualização parcial de um item
def test_partial_update_item(client):
    created = client.post(
        "/items/",
        json={
            "name": "notebook",
            "quantity": 50,
        },
    )

    item_id = created.json()["id"]

    response = client.patch(
        f"/items/{item_id}",
        json={
            "quantity": 25,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "id": item_id,
        "name": "notebook",
        "quantity": 25,
    }


# Teste de remoção de um item
def test_delete_item(client):
    created = client.post(
        "/items/",
        json={
            "name": "notebook",
            "quantity": 50,
        },
    )

    item_id = created.json()["id"]

    response = client.delete(f"/items/{item_id}")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "message": "Item removido",
    }

    # Confirma que o item realmente foi excluído
    get_response = client.get(f"/items/{item_id}")

    assert get_response.status_code == status.HTTP_404_NOT_FOUND
