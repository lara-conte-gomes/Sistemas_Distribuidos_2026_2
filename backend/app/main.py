#imports
from fastapi import FastAPI

#Criação da instância da aplicação do FastAPI
app = FastAPI()

#Criação da rota inicial
@app.get("/")
def root():
    return{"message" : "Seja Bem-Vindo a BookStore!"}