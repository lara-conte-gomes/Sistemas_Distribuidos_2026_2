from fastapi import status


# Teste de listagem de usuários
def test_list_users(client):
    client.post(
        "/users/",
        json={
            "name": "Luíza",
            "age": 22,
        },
    )

    response = client.get("/users/")

    assert response.status_code == status.HTTP_200_OK

    users = response.json()

    assert len(users) == 1
    assert users[0]["name"] == "Luíza"
    assert users[0]["age"] == 22
    assert isinstance(users[0]["id"], int)


# Teste de busca de um usuário
def test_get_user(client):
    created = client.post(
        "/users/",
        json={
            "name": "Luíza",
            "age": 22,
        },
    )

    user_id = created.json()["id"]

    response = client.get(f"/users/{user_id}")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "id": user_id,
        "name": "Luíza",
        "age": 22,
    }


# Teste de um usuário inexistente
def test_user_not_found(client):
    response = client.get("/users/999")

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {
        "detail": "Esse funcionário não foi encontrado na lista",
    }


# Teste de criação de um usuário
def test_create_user(client):
    response = client.post(
        "/users/",
        json={
            "name": "Maria",
            "age": 25,
        },
    )

    assert response.status_code == status.HTTP_201_CREATED

    user = response.json()

    assert isinstance(user["id"], int)
    assert user["name"] == "Maria"
    assert user["age"] == 25


# Teste de atualização completa de um usuário
def test_update_user(client):
    created = client.post(
        "/users/",
        json={
            "name": "Luíza",
            "age": 22,
        },
    )

    user_id = created.json()["id"]

    response = client.put(
        f"/users/{user_id}",
        json={
            "name": "Luíza Silva",
            "age": 23,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "id": user_id,
        "name": "Luíza Silva",
        "age": 23,
    }


# Teste de atualização parcial de um usuário
def test_partial_update_user(client):
    created = client.post(
        "/users/",
        json={
            "name": "Luíza",
            "age": 22,
        },
    )

    user_id = created.json()["id"]

    response = client.patch(
        f"/users/{user_id}",
        json={
            "age": 23,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "id": user_id,
        "name": "Luíza",
        "age": 23,
    }


# Teste de remoção de um usuário
def test_delete_user(client):
    created = client.post(
        "/users/",
        json={
            "name": "Luíza",
            "age": 22,
        },
    )

    user_id = created.json()["id"]

    response = client.delete(f"/users/{user_id}")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "message": "O funcionário foi removido",
    }

    # Verifica se o usuário realmente foi removido
    get_response = client.get(f"/users/{user_id}")

    assert get_response.status_code == status.HTTP_404_NOT_FOUND
