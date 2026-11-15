from unittest.mock import MagicMock, patch

from app.schemas.funcionarios_schemas import (
    CriarFuncionario,
    FuncionarioPatch,
    FuncionarioUpdate,
)
from app.services import funcionarios_service


# Teste de listagem dos funcionarios
def test_list_funcionario():
    db = MagicMock()
    expected_funcionarios = [{
        "nome": "João",
        "idade": 25,
        "cargo": "caixa",
    }]

    with patch.object(
        funcionarios_service.funcionario_rst,
        "list_funcionarios",
        return_value=expected_funcionarios,
    )as mock_repository:
        result = funcionarios_service.lista_funcionarios(db)

    assert result == expected_funcionarios
    mock_repository.assert_called_once_with(db)


# Teste de busca de um funcionario
def test_get_funcionario():
    db = MagicMock()
    expected_funcionarios = [{
        "nome": "João",
        "idade": 25,
        "cargo": "caixa",
    }]

    with patch.object(
        funcionarios_service.funcionario_rst,
        "get_funcionario",
        return_value=expected_funcionarios,
    )as mock_repository:
        result = funcionarios_service.get_funcionario(db, 1)

    assert result == expected_funcionarios
    mock_repository.assert_called_once_with(db, 1)


# Teste de criacao de um funcionario
def test_adicionar_funcionario():
    db = MagicMock()

    funcionario = CriarFuncionario(
        nome="Luiza",
        idade=23,
        cargo="atendente"
    )

    expected_funcionarios = {
        "id": 1,
        "nome": "Luiza",
        "idade": 23,
        "cargo": "atendente",
    }

    with patch.object(
        funcionarios_service.funcionario_rst,
        "adicionar_funcionario",
        return_value=expected_funcionarios,
    )as mock_repository:
        result = funcionarios_service.adicionar_funcionario(db, funcionario)

    assert result == expected_funcionarios
    mock_repository.assert_called_once_with(
        db,
        nome="Luiza",
        idade=23,
        cargo="atendente"
    )

# Teste de atualizacao completa de um funcionario
def test_update_funcionario():
    db = MagicMock()

    funcionario = FuncionarioUpdate(
        nome="Pedro",
        idade=28,
        cargo="gerente",
    )

    expected_funcionarios = {
        "id": 1,
        "nome": "Pedro",
        "idade": 28,
        "cargo": "gerente",
    }

    with patch.object(
        funcionarios_service.funcionario_rst,
        "update_funcionario",
        return_value=expected_funcionarios,
    )as mock_repository:
        result = funcionarios_service.update_funcionario(db, 1, funcionario)

    assert result == expected_funcionarios
    mock_repository.assert_called_once_with(
        db,
        1,
        {
            "nome": "Pedro",
            "idade": 28,
            "cargo": "gerente",
        }
    )


# Teste de atualizacao parcial de um funcionario
def test_partial_update_funcionario():
    db = MagicMock()

    funcionario = FuncionarioPatch(
        idade=29
    )

    expected_funcionarios = {
        "id": 1,
        "nome": "João",
        "idade": 29,
        "cargo": "caixa",
    }

    with patch.object(
        funcionarios_service.funcionario_rst,
        "update_funcionario",
        return_value=expected_funcionarios,
    )as mock_repository:
        result = funcionarios_service.partial_update_funcionario(db, 1, funcionario)

    assert result == expected_funcionarios
    mock_repository.assert_called_once_with(
        db,
        1,
        {
            "idade": 29,
        }
    )


# Teste de remocao de um um funcionario
def test_delete_funcionario():
    db = MagicMock()

    with patch.object(
        funcionarios_service.funcionario_rst,
        "delete_funcionario",
        return_value=True,
    )as mock_repository:
        result = funcionarios_service.delete_funcionario(db, 1)

    assert result is True
    mock_repository.assert_called_once_with(
        db,
        1,
    )
