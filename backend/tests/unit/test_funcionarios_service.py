from app.api.schemas.funcionarios_schemas import CriarFuncionario, FuncionarioPatch, FuncionarioUpdate
from app.api.services import funcionarios_service

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
    funcionarios = funcionarios_service.lista_funcionarios()

    assert len(funcionarios) == 1
    assert funcionarios[0] == {
        "nome": "João", 
        "idade": 25, 
        "cargo": "caixa",
    }

#Teste de busca de um funcionario
def test_get_funcionario():
    funcionarios = funcionarios_service.get_funcionario("João")

    assert funcionarios is not None
    assert funcionarios == {
        "nome": "João", 
        "idade": 25, 
        "cargo": "caixa",
    }

#Teste de criacao de um funcionario
def test_adicionar_funcionario():
    funcionarios = CriarFuncionario(
        nome="Luiza",
        idade=23, 
        cargo="atendente",
    )

    criado_funcionario = funcionarios_service.adicionar_funcionario(funcionarios)

    assert criado_funcionario == {
        "nome": "Luiza",
        "idade": 23, 
        "cargo": "atendente",
    }

    assert len(funcionarios_service.funcionarios) == 2

#Teste de atualizacao completa de um funcionario
def test_update_funcionario():
    funcionarios = FuncionarioUpdate(
        nome="Pedro",
        idade=28, 
        cargo="gerente",
    )

    updated_funcionario = funcionarios_service.update_funcionario(
        "João",
        funcionarios,
    )

    assert updated_funcionario == {
        "nome": "Pedro",
        "idade": 28, 
        "cargo": "gerente",
    }

#Teste de atualizacao parcial de um funcionario
def test_partial_update_funcionario():
    funcionarios = FuncionarioPatch(
        idade=29,
    )

    updated_funcionario = funcionarios_service.partial_update_funcionario(
        "João",
        funcionarios,
    )

    assert updated_funcionario == {
        "nome": "João",
        "idade": 29, 
        "cargo": "caixa",
    }

#Teste de remocao de um um funcionario
def test_delete_funcionario():
    deleted = funcionarios_service.delete_funcionario("João")

    assert deleted is True
    assert len(funcionarios_service.funcionarios) == 0

