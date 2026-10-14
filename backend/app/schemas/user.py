from pydantic import BaseModel, ConfigDict


# Schema para criação de usuários
class User(BaseModel):
    name: str
    age: int


# Schema para atualização completa
class UserUpdate(BaseModel):
    name: str
    age: int


# Schema para atualização parcial
class UserPatch(BaseModel):
    name: str | None = None
    age: int | None = None


# Schema para resposta da API
class UserResponse(BaseModel):
    id: int
    name: str
    age: int

    model_config = ConfigDict(from_attributes=True)
