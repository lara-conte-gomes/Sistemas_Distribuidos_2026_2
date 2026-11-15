from sqlalchemy.orm import Session

from app.repositories import funcionarios_repositories as funcionario_rst
from app.schemas.funcionarios_schemas import CriarFuncionario, FuncionarioPatch, FuncionarioUpdate

# Funcao para retornar a lista de funcionarios
def lista_funcionarios(db: Session):
    return funcionario_rst.list_funcionarios(db)


# Funcao para buscar algum funcionario
def get_funcionario(db: Session, funcionario_id: int):
    return funcionario_rst.get_funcionario(db, funcionario_id)


# Funca para adicionar um novo funcionario
def adicionar_funcionario(db: Session, funcionario: CriarFuncionario):
    return funcionario_rst.adicionar_funcionario(
        db,
        nome=funcionario.nome,
        idade=funcionario.idade,
        cargo=funcionario.cargo,
    )


# Funcao para atualizar os dados do funcionario
def update_funcionario(db: Session, funcionario_id: int, funcionario: FuncionarioUpdate):
    return funcionario_rst.update_funcionario(
        db,
        funcionario_id,
        funcionario.model_dump(exclude_unset=True),
    )

# Funcao para atualizar parcialmente as informacoes de um funcionario
def partial_update_funcionario(db: Session, funcionario_id: int, funcionario: FuncionarioPatch):
    return funcionario_rst.update_funcionario(
        db,
        funcionario_id,
        funcionario.model_dump(exclude_unset=True),
    )


# Funcao para deletar um funcionario
def delete_funcionario(db: Session, funcionario_id: int):
    return funcionario_rst.delete_funcionario(db, funcionario_id)