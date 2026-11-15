from fastapi import status


# Teste de listagem dos livros
def test_list_livro(client):
    created = client.post(
        "/livro/",
        json={
            "titulo": "A Bússola de Ouro",
            "genero": "aventura",
            "publico_alvo": "jovens",
            "quantidade": 10,
        },
    )

    assert created.status_code == status.HTTP_201_CREATED
    response = client.get("/livro/")
    assert response.status_code == status.HTTP_200_OK

    livros = response.json()

    assert isinstance(livros[0]["id"], int)
    assert livros[0]["titulo"] == "A Bússola de Ouro"


# Teste de busca de um livro
def test_get_livro(client):
    created = client.post(
        "/livro/",
        json={
            "titulo": "A Bússola de Ouro",
            "genero": "aventura",
            "publico_alvo": "jovens",
            "quantidade": 10,
        },
    )

    assert created.status_code == status.HTTP_201_CREATED
    livro_id = created.json()["id"]

    response = client.get(f"/livro/{livro_id}")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["titulo"] == "A Bússola de Ouro"


# Teste de criacao de um livro
def test_adicionar_livro(client):
    response = client.post(
        "/livro/",
        json={
            "titulo": "Desventuras em Série",
            "genero": "aventura",
            "publico_alvo": "todas as idades",
            "quantidade": 30,
        },
    )

    assert response.status_code == status.HTTP_201_CREATED

    livros = response.json()

    assert isinstance(livros["id"], int)
    assert livros["titulo"] == "Desventuras em Série"
    assert livros["genero"] == "aventura"
    assert livros["publico_alvo"] == "todas as idades"
    assert livros["quantidade"] == 30


# Teste de atualizacao completa de um livro
def test_update_livro(client):
    created = client.post(
        "/livro/",
        json={
            "titulo": "A Bússola de Ouro",
            "genero": "aventura",
            "publico_alvo": "jovens",
            "quantidade": 10,
        },
    )

    assert created.status_code == status.HTTP_201_CREATED
    livro_id = created.json()["id"]

    response = client.put(
        f"/livro/{livro_id}",
        json={
            "titulo": "Coração de Tinta",
            "genero": "ação",
            "publico_alvo": "todas as idades",
            "quantidade": 50,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["titulo"] == "Coração de Tinta"
    assert response.json()["genero"] == "ação"
    assert response.json()["publico_alvo"] == "todas as idades"
    assert response.json()["quantidade"] == 50


# Teste de atualizacao parcial de um livro
def test_partial_update_livro(client):
    created = client.post(
        "/livro/",
        json={
            "titulo": "A Bússola de Ouro",
            "genero": "aventura",
            "publico_alvo": "jovens",
            "quantidade": 10,
        },
    )

    assert created.status_code == status.HTTP_201_CREATED
    livro_id = created.json()["id"]

    response = client.patch(
        f"/livro/{livro_id}",
        json={
            "genero": "aventura e fantasia",
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["titulo"] == "A Bússola de Ouro"
    assert response.json()["genero"] == "aventura e fantasia"
    assert response.json()["quantidade"] == 10


# Teste de remocao de um livro
def test_delete_livro(client):
    created = client.post(
        "/livro/",
        json={
            "titulo": "A Bússola de Ouro",
            "genero": "aventura e fantasia",
            "publico_alvo": "jovens",
            "quantidade": 10,
        },
    )

    assert created.status_code == status.HTTP_201_CREATED
    livro_id = created.json()["id"]

    response = client.delete(
        f"/livro/{livro_id}",
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"mensagem": "O livro foi removido com sucesso"}

    # Confirma se foi deletado
    get_response = client.get(f"/livro/{livro_id}")

    assert get_response.status_code == status.HTTP_404_NOT_FOUND
