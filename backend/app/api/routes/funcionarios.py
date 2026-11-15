from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db

from app.schemas.funcionarios_schemas import (
    CriarFuncionario,
    FuncionarioPatch,
    FuncionarioUpdate,
)
from app.services import funcionarios_service

router = APIRouter(prefix="/funcionario", tags=["Funcionarios"])

DbSession = Annotated[Session, Depends(get_db)]

# Rota para mostrar a lista de funcionarios que trabalham na loja
@router.get("/")
def lista_funcionarios(db: DbSession):
    return funcionarios_service.lista_funcionarios(db)


# Rota para buscar um funcionario específico
@router.get("/{funcionario_nome}")
def get_funcionario(funcionario_nome: str, db: DbSession):
    funcionario = funcionarios_service.get_funcionario(db, funcionario_nome)

    # Exceção para caso o funcionario não exista na lista
    if funcionario is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="O funcionario que você busca não foi encontrado",
        )

    return funcionario


# Rota para a adição de um funcionario novo
@router.post("/", status_code=status.HTTP_201_CREATED)
def adicionar_funcionario(funcionario: CriarFuncionario, db: DbSession):
    return funcionarios_service.adicionar_funcionario(db, funcionario)


# Rota para atualizar um funcionario
@router.put("/{funcionario_nome}")
def update_funcionario(funcionario_nome: str, funcionario: FuncionarioUpdate, db: DbSession):
    updated_funcionario = funcionarios_service.update_funcionario(
        db, funcionario_nome, funcionario
    )

    # Exceção para caso o funcionario não exista na lista
    if updated_funcionario is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="O funcionario que você busca não foi encontrado",
        )

    return updated_funcionario


# Rota para atualização parcial dos dados de um funcionario
@router.patch("/{funcionario_nome}")
def partial_update_funcionario(funcionario_nome: str, funcionario: FuncionarioPatch, db: DbSession):
    parcial_updated_funcionario = funcionarios_service.partial_update_funcionario(
        db, funcionario_nome, funcionario
    )

    # Exceção para caso o funcionario não exista na lista
    if parcial_updated_funcionario is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="O funcionario que você busca não foi encontrado",
        )

    return parcial_updated_funcionario


# Rota para deletar um funcionario
@router.delete("/{funcionario_nome}")
def delete_funcionario(funcionario_nome: str, db: DbSession):
    deletar = funcionarios_service.delete_funcionario(db, funcionario_nome)

    # Exceção para caso o funcionario não exista na lista
    if not deletar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="O funcionario que você busca não foi encontrado",
        )

    return {"mensagem": "O funcionario foi removido com sucesso"}
