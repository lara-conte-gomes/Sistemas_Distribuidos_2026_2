from sqlalchemy.orm import Session

from app.repositories import revistas_repositories as revistas_rst
from app.schemas.revistas_schemas import CriarRevista, RevistaPatch, RevistaUpdate


class RevistaDuplicadaError(Exception):
    pass


# Funcao para verificar se o titulo ja existe
def validar_titulo(db: Session, titulo: str, revista_id: int | None = None):
    revista_existente = revistas_rst.get_revista_by_titulo(db, titulo)

    if revista_existente is not None and revista_existente.id != revista_id:
        raise RevistaDuplicadaError("Já existe uma revista com esse título")


# Funcao para retornar a lista de revistas
def lista_revistas(db: Session):
    return revistas_rst.list_revistas(db)


# Funcao para buscar alguma revistas
def get_revista(db: Session, revista_id: int):
    return revistas_rst.get_revista(db, revista_id)


# Funcao para adicionar uma nova revista
def adicionar_revista(db: Session, revista: CriarRevista):
    validar_titulo(db, revista.titulo)

    return revistas_rst.adicionar_revista(
        db,
        titulo=revista.titulo,
        genero=revista.genero,
        edicao=revista.edicao,
        quantidade=revista.quantidade,
    )


# Funcao para atualizar os dados da revista
def update_revista(db: Session, revista_id: int, revista: RevistaUpdate):
    if revistas_rst.get_revista(db, revista_id) is None:
        return None

    validar_titulo(db, revista.titulo, revista_id)

    return revistas_rst.update_revista(
        db,
        revista_id,
        revista.model_dump(exclude_unset=True),
    )


# Funcao para atualizar parcialmente as informacoes de uma revista
def partial_update_revista(db: Session, revista_id: int, revista: RevistaPatch):
    if revistas_rst.get_revista(db, revista_id) is None:
        return None

    if revista.titulo is not None:
        validar_titulo(db, revista.titulo, revista_id)

    return revistas_rst.update_revista(
        db,
        revista_id,
        revista.model_dump(exclude_unset=True),
    )


# Funcao para deletar uma revista
def delete_revista(db: Session, revista_id: int):
    return revistas_rst.delete_revista(db, revista_id)
