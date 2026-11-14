# imports
from fastapi import status
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

#Teste de rota nao encontrada
def teste_rota_nao_encontrada():
    response = client.get("/rota-inventada")

    assert response.status_code == status.HTTP_404_NOT_FOUND

#Teste de rejeicao de um metodo HTTP 
def teste_metodo_nao_permitido():
    response = client.post("/health")

    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

