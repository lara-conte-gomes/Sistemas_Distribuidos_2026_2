# import
from pydantic import BaseModel


# Criar a revista
class CriarRevista(BaseModel):
    titulo: str
    genero: str
    quantidade: int
    edicao: int


# Atualizar as informações da revista
class RevistaUpdate(BaseModel):
    titulo: str
    genero: str
    quantidade: int
    edicao: int


# Atualização parcial das informações da revista
class RevistaPatch(BaseModel):
    titulo: str | None = None
    genero: str | None = None
    quantidade: int | None = None
    edicao: int | None = None
