from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.funcionarios_models import Funcionario

#Ver a lista de funcionarios
def list_funcionarios(db: Session):
    statement = select(Funcionario)
    return db.scalars(statement).all()

#Buscar um funcionario
def get_funcionario(db: Session, funcionario_id: int):
    return db.get(Funcionario, funcionario_id)

#Adicionar um funcionario
def adicionar_funcionario(db: Session, nome: str, idade: int, cargo: str):
    novo_funcionario= Funcionario(
        nome=nome,
        idade=idade,
        cargo=cargo,
    )

    db.add(novo_funcionario)
    db.commit()
    db.refresh(novo_funcionario)

    return novo_funcionario

#Atualizar os dados do funcionario
def update_funcionario(db: Session, funcionario_id, data:dict):
    funcionario = get_funcionario(db, funcionario_id)

    if funcionario is None:
        return None

    for field, value in data.items():
        setattr(funcionario, field, value)

    db.commit()
    db.refresh(funcionario)

    return funcionario

#Deletar um funcionario
def delete_funcionario(db: Session, funcionario_id):
    funcionario = get_funcionario(db, funcionario_id)

    if funcionario is None:
        return False

    db.delete(funcionario)
    db.commit()

    return True
