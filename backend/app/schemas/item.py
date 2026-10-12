from pydantic import BaseModel


class CreateItem(BaseModel):
    name: str
    quantity: int


class ItemUpdate(BaseModel):
    name: str
    quantity: int


class ItemPatch(BaseModel):
    name: str | None = None
    quantity: int | None = None
