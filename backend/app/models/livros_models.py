#imports 
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base

class Livro(Base):
    __tablename__="livros"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    titulo: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    genero: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    publico_alvo: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    quantidade: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )