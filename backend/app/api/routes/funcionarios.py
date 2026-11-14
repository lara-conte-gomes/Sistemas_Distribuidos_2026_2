from fastapi import APIRouter, HTTPException, status

from app.api.schemas.funcionarios_schemas import (
    CriarFuncionario,
    FuncionarioPatch,
    FuncionarioUpdate,
)
from app.api.services import funcionarios_service

router = APIRouter(prefix="/funcionario", tags=["Funcionarios"])


# Rota para mostrar a lista de funcionarios que trabalham na loja
@router.get("/")
def lista_funcionarios():
    return funcionarios_service.lista_livros()


# Rota para buscar um funcionario específico
@router.get("/{funcionario_nome}")
def get_funcionario(funcionario_nome: str):
    funcionario = funcionarios_service.get_funcionario(funcionario_nome)

    # Exceção para caso o funcionario não exista na lista
    if funcionario is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="O funcionario que você busca não foi encontrado",
        )

    return funcionario


# Rota para a adição de um funcionario novo
@router.post("/", status_code=status.HTTP_201_CREATED)
def adicionar_funcionario(funcionario: CriarFuncionario):
    return funcionarios_service.adicionar_funcionario(funcionario)


# Rota para atualizar um funcionario
@router.put("/{funcionario_nome}")
def update_funcionario(funcionario_nome: str, funcionario: FuncionarioUpdate):
    updated_funcionario = funcionarios_service.update_funcionario(
        funcionario_nome, funcionario
    )

    # Exceção para caso o funcionario não exista na lista
    if updated_funcionario is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="O funcionario que você busca não foi encontrado",
        )

    return updated_funcionario


# Rota para atualização parcial dos dados de um funcionario
@router.patch("/{funcionario_nome}")
def partial_update_funcionario(funcionario_nome: str, funcionario: FuncionarioPatch):
    parcial_updated_funcionario = funcionarios_service.partial_update_funcionario(
        funcionario_nome, funcionario
    )

    # Exceção para caso o funcionario não exista na lista
    if parcial_updated_funcionario is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="O funcionario que você busca não foi encontrado",
        )

    return parcial_updated_funcionario


# Rota para deletar um funcionario
@router.delete("/{funcionario_nome}")
def delete_funcionario(funcionario_nome: str):
    deletar = funcionarios_service.delete_funcionario(funcionario_nome)

    # Exceção para caso o funcionario não exista na lista
    if not deletar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="O funcionario que você busca não foi encontrado",
        )

    return {"mensagem": "O funcionario foi removido com sucesso"}
