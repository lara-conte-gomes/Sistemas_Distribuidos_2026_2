# import
from pydantic import BaseModel, ConfigDict


# Criar a revista
class CriarRevista(BaseModel):
    titulo: str
    genero: str
    edicao: str
    quantidade: int


# Atualizar as informações da revista
class RevistaUpdate(BaseModel):
    titulo: str
    genero: str
    edicao: str
    quantidade: int


# Atualização parcial das informações da revista
class RevistaPatch(BaseModel):
    titulo: str | None = None
    genero: str | None = None
    edicao: str | None = None
    quantidade: int | None = None


# Resposta da API
class RevistaResposta(BaseModel):
    titulo: str
    genero: str
    edicao: str
    quantidade: int

    model_config = ConfigDict(from_attributes=True)
