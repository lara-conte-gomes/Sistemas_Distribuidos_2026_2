from pydantic import BaseModel, ConfigDict


# Schema para criação de itens
class CreateItem(BaseModel):
    name: str
    quantity: int
    description: str | None = None


# Schema para atualização completa
class ItemUpdate(BaseModel):
    name: str
    quantity: int
    description: str | None = None


# Schema para atualização parcial
class ItemPatch(BaseModel):
    name: str | None = None
    quantity: int | None = None
    description: str | None = None


# Schema para resposta da API
class ItemResponse(BaseModel):
    id: int
    name: str
    quantity: int
    description: str | None = None

    model_config = ConfigDict(from_attributes=True)
