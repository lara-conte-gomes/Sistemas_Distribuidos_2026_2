from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class User(BaseModel):
    name: str
    age: int


users = []


@app.get("/")
def root():
    return {"message": "Laboratório de Sistemas Distribuídos funcionando!"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/users")
def get_users():
    return users
