# imports
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Revista(Base):
    __tablename__ = "revistas"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    titulo: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    genero: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    edicao: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    quantidade: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
