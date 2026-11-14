from app.api.schemas.livros_schemas import CriarLivro, LivroPatch, LivroUpdate
from app.api.services import livros_service


# Funcao de preparacao de testes
def setup_function():
    livros_service.livros.clear()
    livros_service.livros.append(
        {
            "titulo": "A Bússola de Ouro",
            "genero": "aventura",
            "publico_alvo": "jovens",
            "quantidade": 10,
        }
    )


# Teste de listagem dos livros
def test_list_livros():
    livros = livros_service.lista_livros()

    assert len(livros) == 1
    assert livros[0] == {
        "titulo": "A Bússola de Ouro",
        "genero": "aventura",
        "publico_alvo": "jovens",
        "quantidade": 10,
    }


# Teste de busca de um livro
def test_get_livro():
    livros = livros_service.get_livro("A Bússola de Ouro")

    assert livros is not None
    assert livros == {
        "titulo": "A Bússola de Ouro",
        "genero": "aventura",
        "publico_alvo": "jovens",
        "quantidade": 10,
    }


# Teste de criacao de um livro
def test_adicionar_livro():
    livros = CriarLivro(
        titulo="Desventuras em Série",
        genero="aventura",
        publico_alvo="todas as idades",
        quantidade=30,
    )

    criado_livro = livros_service.adicionar_livro(livros)

    assert criado_livro == {
        "titulo": "Desventuras em Série",
        "genero": "aventura",
        "publico_alvo": "todas as idades",
        "quantidade": 30,
    }

    assert len(livros_service.livros) == 2


# Teste de atualizacao completa de um livro
def test_update_livro():
    livros = LivroUpdate(
        titulo="Coração de Tinta",
        genero="ação",
        publico_alvo="todas as idades",
        quantidade=50,
    )

    updated_livro = livros_service.update_livro(
        "A Bússola de Ouro",
        livros,
    )

    assert updated_livro == {
        "titulo": "Coração de Tinta",
        "genero": "ação",
        "publico_alvo": "todas as idades",
        "quantidade": 50,
    }


# Teste de atualizacao parcial de um livro
def test_partial_update_livro():
    livros = LivroPatch(
        genero="aventura e fantasia",
    )

    updated_livro = livros_service.partial_update_livro(
        "A Bússola de Ouro",
        livros,
    )

    assert updated_livro == {
        "titulo": "A Bússola de Ouro",
        "genero": "aventura e fantasia",
        "publico_alvo": "jovens",
        "quantidade": 10,
    }


# Teste de remocao de um um livro
def test_delete_livros():
    deleted = livros_service.delete_livro("A Bússola de Ouro")

    assert deleted is True
    assert len(livros_service.livros) == 0
