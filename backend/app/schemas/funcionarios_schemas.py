# import
from pydantic import BaseModel, ConfigDict


# Criar o funcionario
class CriarFuncionario(BaseModel):
    nome: str
    idade: int
    cargo: str


# Atualizar as informacoes do funcionario
class FuncionarioUpdate(BaseModel):
    nome: str
    idade: int
    cargo: str


# Atualizacao parcial das informacoes do funcionario
class FuncionarioPatch(BaseModel):
    nome: str | None = None
    idade: int | None = None
    cargo: str | None = None


# Resposta da API
class FuncionarioResposta(BaseModel):
    nome: str
    idade: int
    cargo: str

    model_config = ConfigDict(from_attributes=True)
