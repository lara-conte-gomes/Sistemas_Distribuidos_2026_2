from fastapi import status

# Teste de listagem das revistas
def test_list_revista(client):
    created = client.post(
        "/revista/",
        json={
            "titulo": "Mundo Estranho",
            "genero": "tecnologia",
            "edicao": "Novembro",
            "quantidade": 10,
        }
    )

    assert created.status_code == status.HTTP_201_CREATED
    response = client.get("/revista/")
    assert response.status_code == status.HTTP_200_OK

    revistas = response.json()

    assert isinstance(revistas[0]["id"], int)
    assert revistas[0]["titulo"] == "Mundo Estranho"
    


# Teste de busca de uma revista
def test_get_revista(client):
    created = client.post(
        "/revista/",
        json={
            "titulo": "Mundo Estranho",
            "genero": "tecnologia",
            "edicao": "Novembro",
            "quantidade": 10,
        }
    )

    assert created.status_code == status.HTTP_201_CREATED

    revista_id = created.json()["id"]

    response = client.get(f"/revista/{revista_id}")


    assert response.status_code == status.HTTP_200_OK
    assert response.json()["titulo"] == "Mundo Estranho"
    
# Teste de criacao de uma revista
def test_adicionar_revista(client):
    response = client.post(
        "/revista/",
        json={
            "titulo": "Quatro Rodas",
            "genero": "carro",
            "edicao": "Setembro",
            "quantidade": 35,
        },
    )

    assert response.status_code == status.HTTP_201_CREATED

    revistas = response.json()

    assert isinstance(revistas["id"], int)
    assert revistas["titulo"] == "Quatro Rodas"
    assert revistas["genero"] == "carro"
    assert revistas["edicao"] == "Setembro"
    assert revistas["quantidade"] == 35


# Teste de atualizacao completa de uma revista
def test_update_revista(client):
    created = client.post(
        "/revista/",
        json={
            "titulo": "Mundo Estranho",
            "genero": "tecnologia",
            "edicao": "Novembro",
            "quantidade": 10,
        }
    )

    assert created.status_code == status.HTTP_201_CREATED
    revista_id = created.json()["id"]

    response = client.put(
        f"/revista/{revista_id}",
        json={
            "titulo": "Super Interessante",
            "genero": "curiosidades",
            "edicao": "Abril",
            "quantidade": 14,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["titulo"] == "Super Interessante"
    assert response.json()["genero"] == "curiosidades"
    assert response.json()["edicao"] == "Abril"
    assert response.json()["quantidade"] == 14


# Teste de atualizacao parcial de uma revista
def test_partial_update_revista(client):
    created = client.post(
        "/revista/",
        json={
            "titulo": "Mundo Estranho",
            "genero": "tecnologia",
            "edicao": "Novembro",
            "quantidade": 10,
        }
    )

    assert created.status_code == status.HTTP_201_CREATED
    revista_id = created.json()["id"]

    response = client.patch(
        f"/revista/{revista_id}",
        json={
            "quantidade": 55,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["titulo"] == "Mundo Estranho"
    assert response.json()["quantidade"] == 55


# Teste de remocao de uma revista
def test_delete_revista(client):
    created = client.post(
        "/revista/",
        json={
            "titulo": "Mundo Estranho",
            "genero": "tecnologia",
            "edicao": "Novembro",
            "quantidade": 10,
        }
    )

    assert created.status_code == status.HTTP_201_CREATED
    revista_id = created.json()["id"]

    response = client.delete(
        f"/revista/{revista_id}",
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "mensagem": "A revista foi removida com sucesso"
    }

    #Confirma se foi deletada
    get_response = client.get(f"/revista/{revista_id}")

    assert get_response.status_code == status.HTTP_404_NOT_FOUND


