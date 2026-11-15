#imports 
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base

class Funcionario(Base):
    __tablename__="funcionarios"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    nome: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    idade: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    cargo: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )
