from fastapi import status
from fastapi.testclient import TestClient

from app.main import app
from app.api.services import livros_service

client = TestClient(app)

#Funcao de preparacao de testes
def setup_function():
    livros_service.livros.clear()
    livros_service.livros.append({
        "titulo": "A Bússola de Ouro",
        "genero": "aventura",
        "publico_alvo": "jovens",
        "quantidade": 10,
    })

#Teste de listagem dos livros
def test_list_livros():
    response = client.get("/livros")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {
            "titulo": "A Bússola de Ouro",
            "genero": "aventura",
            "publico_alvo": "jovens",
            "quantidade": 10,
        }
    ]

#Teste de busca de um livro
def test_get_livro():
    response = client.get("/livros/A Bússola de Ouro")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "titulo": "A Bússola de Ouro",
        "genero": "aventura",
        "publico_alvo": "jovens",
        "quantidade": 10,
    }

#Teste de criacao de um livro
def test_adicionar_livro():
    response = client.post(
        "/livros/",
        json={
            "titulo": "Desventuras em Série",
            "genero": "aventura",
            "publico_alvo": "todas as idades",
            "quantidade": 30,
        }
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json() == {
        "titulo": "Desventuras em Série",
        "genero": "aventura",
        "publico_alvo": "todas as idades",
        "quantidade": 30,
    }

#Teste de atualizacao completa de um livro
def test_update_livro():
    response = client.put(
        "/livros/A Bússola de Ouro",
        json={
            "titulo": "Coração de Tinta",
            "genero": "ação",
            "publico_alvo": "todas as idades",
            "quantidade": 50,
        }
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "titulo": "Coração de Tinta",
        "genero": "ação",
        "publico_alvo": "todas as idades",
        "quantidade": 50,
    }

#Teste de atualizacao parcial de um livro
def test_partial_update_livro():
    response = client.patch(
        "/livros/A Bússola de Ouro",
        json={
            "genero": "aventura e fantasia",
        }
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "titulo": "A Bússola de Ouro",
        "genero": "aventura e fantasia",
        "publico_alvo": "jovens",
        "quantidade": 10,
    }

#Teste de remocao de um livro
def test_delete_livro():
    response = client.delete("/livros/A Bússola de Ouro")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "mensagem" : "O livro foi removido com sucesso"
    }

#Teste de entrada de quantidade inválida
def test_quantidade_invalida():
    livro = {
            "titulo": "Coração de Tinta",
            "genero": "aventura e fantasia",
            "publico_alvo": "todas as idades",
            "quantidade": "quarenta",
    }

    response = client.post("/livros", json=livro)

    assert response.status_code == 422