#imports
from app.database.base import Base
from app.database.session import engine

from app.models import livros_models
from app.models import revistas_models
from app.models import funcionarios_models

#criacao das tabelas para o banco
def create_tables():
    Base.metadata.create_all(bind=engine)