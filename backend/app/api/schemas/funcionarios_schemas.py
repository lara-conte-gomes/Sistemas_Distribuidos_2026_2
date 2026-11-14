# import
from pydantic import BaseModel


# Criar o funcionario
class CriarFuncionario(BaseModel):
    nome: str
    idade: int
    cargo: str


# Atualizar as informações do funcionario
class FuncionarioUpdate(BaseModel):
    nome: str
    idade: int
    cargo: str


# Atualização parcial das informações do funcionario
class FuncionarioPatch(BaseModel):
    nome: str | None = None
    idade: int | None = None
    cargo: str | None = None
