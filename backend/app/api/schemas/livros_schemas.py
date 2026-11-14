# import
from pydantic import BaseModel


# Criar o livro
class CriarLivro(BaseModel):
    titulo: str
    genero: str
    publico_alvo: str
    quantidade: int


# Atualizar as informações do livro
class LivroUpdate(BaseModel):
    titulo: str
    genero: str
    publico_alvo: str
    quantidade: int


# Atualização parcial das informações do livro
class LivroPatch(BaseModel):
    titulo: str | None = None
    genero: str | None = None
    publico_alvo: str | None = None
    quantidade: int | None = None
