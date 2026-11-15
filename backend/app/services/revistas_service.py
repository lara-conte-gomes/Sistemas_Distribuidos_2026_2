from sqlalchemy.orm import Session

from app.repositories import revistas_repositories as revistas_rst
from app.schemas.revistas_schemas import CriarRevista, RevistaPatch, RevistaUpdate

# Funcao para retornar a lista de revistas
def lista_revista(db: Session):
    return revistas_rst.list_revistas(db)


# Funcao para buscar alguma revistas
def get_revista(db: Session, revista_id: int):
    return revistas_rst.get_revista(db, revista_id)


# Funca para adicionar uma nova revista
def adicionar_revista(db: Session, revista: CriarRevista):
    return revistas_rst.adicionar_revista(
        db,
        titulo=revista.titulo,
        genero=revista.genero,
        edicao=revista.edicao,
        quantidade=revista.quantidade,
    )


# Funcao para atualizar os dados da revista
def update_revista(db: Session, revista_id: int, revista: RevistaUpdate):
    return revistas_rst.update_revista(
        db,
        revista_id,
        revista.model_dump(exclude_unset=True),
    )

# Funcao para atualizar parcialmente as informacoes de uma revista
def partial_update_revista(db: Session, revista_id: int, revista: RevistaPatch):
    return revistas_rst.update_revista(
        db,
        revista_id,
        revista.model_dump(exclude_unset=True),
    )


# Funcao para deletar uma revista
def delete_revista(db: Session, revista_id: int):
    return revistas_rst.deletar_revista(db, revista_id)