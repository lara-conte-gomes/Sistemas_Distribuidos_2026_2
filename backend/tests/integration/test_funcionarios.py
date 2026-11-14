from fastapi import status
from fastapi.testclient import TestClient

from app.main import app
from app.api.services import funcionarios_service

client = TestClient(app)

#Funcao de preparacao de testes
def setup_function():
    funcionarios_service.funcionarios.clear()
    funcionarios_service.funcionarios.append({
        "nome": "João", 
        "idade": 25, 
        "cargo": "caixa",
    })

#Teste de listagem dos funcionarios
def test_list_funcionario():
    response = client.get("/funcionario/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [{
            "nome": "João", 
            "idade": 25, 
            "cargo": "caixa",
        }
    ]

#Teste de busca de um funcionario
def test_get_funcionario():
    response = client.get("/funcionario/João")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "nome": "João", 
        "idade": 25, 
        "cargo": "caixa",
    }

#Teste de criacao de um funcionario
def test_adicionar_funcionario():
    response = client.post(
        "/funcionario/",
        json={
            "nome": "Luiza",
            "idade": 23, 
            "cargo": "atendente",
        }
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json() == {
        "nome": "Luiza",
        "idade": 23, 
        "cargo": "atendente",
    }

#Teste de atualizacao completa de um funcionario
def test_update_funcionario():
    response = client.put(
        "/funcionario/João",
        json={
            "nome": "Pedro",
            "idade": 28, 
            "cargo": "gerente",
        }
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "nome": "Pedro",
        "idade": 28, 
        "cargo": "gerente",
    }

    # assert response.json() == [{
    #         "nome": "Pedro",
    #         "idade": 28, 
    #         "cargo": "gerente",
    #     }
    # ]

#Teste de atualizacao parcial de um funcionario
def test_partial_update_funcionario():
    response = client.patch(
        "/funcionario/João",
        json={
            "idade": 29,
        }
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "nome": "João",
        "idade": 29, 
        "cargo": "caixa",
    }

#Teste de remocao de um um funcionario
def test_delete_funcionario():
    response = client.delete("/funcionario/João")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "mensagem" : "O funcionario foi removido com sucesso"
    }

    assert funcionarios_service.funcionarios == []
