# imports
import pytest
from fastapi import status
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


@pytest.mark.parametrize(
    "route, expected_response",
    [
        ("/", {"mensagem": "Seja Bem-Vindo a BookStore!"}),
        ("/health", {"status da aplicação": "ok"}),
        ("/livros", []),
    ],
)
def teste_resposta_rota(route, expected_response):
    response = client.get(route)

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == expected_response


def teste_rota_nao_encontrada():
    response = client.get("/rota-inventada")

    assert response.status_code == status.HTTP_404_NOT_FOUND


def teste_metodo_nao_permitido():
    response = client.post("/health")

    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED


@pytest.fixture
def livro():
    return {
        "titulo": "A Bússola de Ouro",
        "genero": "aventura",
        "qtd": 20,
    }


def teste_titulo_livro(livro):
    assert livro["titulo"] == "A Bússola de Ouro"


def teste_genero_livro(livro):
    assert livro["genero"] == "aventura"


def teste_quantidade_livro(livro):
    assert livro["qtd"] == 20
