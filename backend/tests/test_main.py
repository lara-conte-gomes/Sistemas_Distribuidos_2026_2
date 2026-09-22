from fastapi import status
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


# Teste de rota inexistente
def test_route_not_found():
    response = client.get("/rota-nova")

    assert response.status_code == status.HTTP_404_NOT_FOUND


# Teste de rejeição de um método HTTP que não foi definido para uma rota
def test_method_not_allowed():
    response = client.post("/health")

    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED
