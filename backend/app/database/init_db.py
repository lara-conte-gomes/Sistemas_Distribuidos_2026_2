# imports
from app.database.base import Base
from app.database.session import engine


# criacao das tabelas para o banco
def create_tables():
    Base.metadata.create_all(bind=engine)
