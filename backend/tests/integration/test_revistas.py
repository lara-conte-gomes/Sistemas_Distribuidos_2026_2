from fastapi import status
from fastapi.testclient import TestClient

from app.services import revistas_service
from app.main import app

client = TestClient(app)


# Funcao de preparacao de testes
def setup_function():
    revistas_service.revistas.clear()
    revistas_service.revistas.append(
        {
            "titulo": "Mundo Estranho",
            "genero": "tecnologia",
            "edicao": "Novembro",
            "quantidade": 10,
        }
    )


# Teste de listagem das revistas
def test_list_revistas():
    response = client.get("/revista")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {
            "titulo": "Mundo Estranho",
            "genero": "tecnologia",
            "edicao": "Novembro",
            "quantidade": 10,
        }
    ]


# Teste de busca de uma revista
def test_get_revista():
    response = client.get("/revista/Mundo Estranho")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "titulo": "Mundo Estranho",
        "genero": "tecnologia",
        "edicao": "Novembro",
        "quantidade": 10,
    }


# Teste de criacao de uma revista
def test_adicionar_revista():
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
    assert response.json() == {
        "titulo": "Quatro Rodas",
        "genero": "carro",
        "edicao": "Setembro",
        "quantidade": 35,
    }


# Teste de atualizacao completa de uma revista
def test_update_revista():
    response = client.put(
        "/revista/Mundo Estranho",
        json={
            "titulo": "Super Interessante",
            "genero": "curiosidades",
            "edicao": "Abril",
            "quantidade": 14,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "titulo": "Super Interessante",
        "genero": "curiosidades",
        "edicao": "Abril",
        "quantidade": 14,
    }


# Teste de atualizacao parcial de uma revista
def test_partial_update_revista():
    response = client.patch(
        "/revista/Mundo Estranho",
        json={
            "quantidade": 55,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "titulo": "Mundo Estranho",
        "genero": "tecnologia",
        "edicao": "Novembro",
        "quantidade": 55,
    }


# Teste de remocao de um uma revista
def test_delete_revista():
    response = client.delete("/revista/Mundo Estranho")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"mensagem": "A revista foi removida com sucesso"}


# Teste de entrada de quantidade inválida
def test_quantidade_invalida():
    revista = {
        "titulo": "Quatro Rodas",
        "genero": "carro",
        "edicao": "Setembro",
        "quantidade": "vinte",
    }

    response = client.post("/revista", json=revista)

    assert response.status_code == 422
