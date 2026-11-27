from fastapi import status


# Teste de listagem dos funcionarios
def test_list_funcionario(client):
    created = client.post(
        "/funcionario/",
        json={
            "nome": "João",
            "idade": 25,
            "cargo": "caixa",
        },
    )

    assert created.status_code == status.HTTP_201_CREATED
    response = client.get("/funcionario/")
    assert response.status_code == status.HTTP_200_OK

    funcionarios = response.json()

    assert isinstance(funcionarios[0]["id"], int)
    # assert len(funcionarios) == 1
    assert funcionarios[0]["nome"] == "João"
    # assert funcionarios[0]["idade"] == 25
    # assert funcionarios[0]["cargo"] == "caixa"


# Teste de busca de um funcionario
def test_get_funcionario(client):
    created = client.post(
        "/funcionario/",
        json={
            "nome": "João",
            "idade": 25,
            "cargo": "caixa",
        },
    )

    assert created.status_code == status.HTTP_201_CREATED
    funcionario_id = created.json()["id"]

    response = client.get(f"/funcionario/{funcionario_id}")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["nome"] == "João"
    # assert response.json() == {
    #     "id": funcionario_id,
    #     "nome": "João",
    #     "idade": 25,
    #     "cargo": "caixa",
    # }


# Teste de criacao de um funcionario
def test_adicionar_funcionario(client):
    response = client.post(
        "/funcionario/",
        json={
            "nome": "Luiza",
            "idade": 23,
            "cargo": "atendente",
        },
    )

    assert response.status_code == status.HTTP_201_CREATED

    funcionarios = response.json()

    assert isinstance(funcionarios["id"], int)
    assert funcionarios["nome"] == "Luiza"
    assert funcionarios["idade"] == 23
    assert funcionarios["cargo"] == "atendente"


# Teste de atualizacao completa de um funcionario
def test_update_funcionario(client):
    created = client.post(
        "/funcionario/",
        json={
            "nome": "João",
            "idade": 25,
            "cargo": "caixa",
        },
    )

    assert created.status_code == status.HTTP_201_CREATED
    funcionario_id = created.json()["id"]

    response = client.put(
        f"/funcionario/{funcionario_id}",
        json={
            "nome": "Pedro",
            "idade": 28,
            "cargo": "gerente",
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["nome"] == "Pedro"
    assert response.json()["idade"] == 28
    assert response.json()["cargo"] == "gerente"


# Teste de atualizacao parcial de um funcionario
def test_partial_update_funcionario(client):
    created = client.post(
        "/funcionario/",
        json={
            "nome": "João",
            "idade": 25,
            "cargo": "caixa",
        },
    )

    assert created.status_code == status.HTTP_201_CREATED
    funcionario_id = created.json()["id"]

    response = client.patch(
        f"/funcionario/{funcionario_id}",
        json={
            "idade": 29,
        },
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["nome"] == "João"
    assert response.json()["idade"] == 29
    assert response.json()["cargo"] == "caixa"


# Teste de remocao de um funcionario
def test_delete_funcionario(client):
    created = client.post(
        "/funcionario/",
        json={
            "nome": "João",
            "idade": 25,
            "cargo": "caixa",
        },
    )

    assert created.status_code == status.HTTP_201_CREATED
    funcionario_id = created.json()["id"]

    response = client.delete(
        f"/funcionario/{funcionario_id}",
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"mensagem": "O funcionario foi removido com sucesso"}

    # Confirma se foi deletado
    get_response = client.get(f"/funcionario/{funcionario_id}")

    assert get_response.status_code == status.HTTP_404_NOT_FOUND
