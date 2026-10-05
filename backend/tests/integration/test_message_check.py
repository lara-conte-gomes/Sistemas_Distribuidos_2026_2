from fastapi import status
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


# Teste de rota
def test_root():
    response = client.get("/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "message": "Sistema para cadastro de funcionários e itens de uma loja"
    }


# Teste de checagem do status
def test_health_check():
    response = client.get("/health")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"status": "ok"}
