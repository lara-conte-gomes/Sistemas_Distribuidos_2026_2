# import
from sqlalchemy.orm import DeclarativeBase


# Criando a base declarativa que é compartilhada por todos os 'models'
class Base(DeclarativeBase):
    pass
