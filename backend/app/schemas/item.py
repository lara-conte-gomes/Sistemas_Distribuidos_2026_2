from pydantic import BaseModel, ConfigDict


class CreateItem(BaseModel):
    name: str
    quantity: int


class ItemUpdate(BaseModel):
    name: str
    quantity: int


class ItemPatch(BaseModel):
    name: str | None = None
    quantity: int | None = None


class ItemResponse(BaseModel):
    id: int
    name: str
    quantity: int

    model_config = ConfigDict(from_attributes=True)
