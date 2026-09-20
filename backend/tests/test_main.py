import pytest
from fastapi import status
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


@pytest.mark.parametrize(
    "route, expected_response",
    [
        ("/", {"message": "Laboratório de Sistemas Distribuídos funcionando!"}),
        ("/health", {"status": "ok"}),
        ("/users", []),
    ],
)
def test_routes_response(route, expected_response):
    response = client.get(route)

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == expected_response


def test_route_not_found():
    response = client.get("/rota-nova")

    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_method_not_allowed():
    response = client.post("/health")

    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED


@pytest.fixture
def usuario():
    return {
        "nome": "Luiza",
        "idade": "24",
    }


def test_nome_usuario(usuario):
    assert usuario["nome"] == "Luiza"


def test_idade_usuario(usuario):
    assert usuario["idade"] == "24"
