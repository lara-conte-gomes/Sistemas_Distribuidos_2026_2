from pydantic import BaseModel


class User(BaseModel):
    name: str
    age: int


class UserUpdate(BaseModel):
    name: str
    age: int


class UserPatch(BaseModel):
    name: str | None = None
    age: int | None = None
