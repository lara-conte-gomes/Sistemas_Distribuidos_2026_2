from unittest.mock import MagicMock, patch

from app.schemas.livros_schemas import (
    CriarLivro,
    LivroPatch,
    LivroUpdate,
)
from app.services import livros_service


# Teste de listagem dos livros
def test_list_livro():
    db = MagicMock()
    expected_livros = [
        {
            "titulo": "A Bússola de Ouro",
            "genero": "aventura e fantasia",
            "publico_alvo": "jovens",
            "quantidade": 10,
        }
    ]

    with patch.object(
        livros_service.livro_rst,
        "list_livros",
        return_value=expected_livros,
    ) as mock_repository:
        result = livros_service.lista_livro(db)

    assert result == expected_livros
    mock_repository.assert_called_once_with(db)


# Teste de busca de um livro
def test_get_livro():
    db = MagicMock()
    expected_livros = [
        {
            "titulo": "A Bússola de Ouro",
            "genero": "aventura e fantasia",
            "publico_alvo": "jovens",
            "quantidade": 10,
        }
    ]

    with patch.object(
        livros_service.livro_rst,
        "get_livro",
        return_value=expected_livros,
    ) as mock_repository:
        result = livros_service.get_livro(db, 1)

    assert result == expected_livros
    mock_repository.assert_called_once_with(db, 1)


# Teste de criacao de um livro
def test_adicionar_livros():
    db = MagicMock()

    livro = CriarLivro(
        titulo="Desventuras em Série",
        genero="aventura",
        publico_alvo="todas as idades",
        quantidade=30,
    )

    expected_livros = {
        "id": 1,
        "titulo": "Desventuras em Série",
        "genero": "aventura",
        "publico_alvo": "todas as idades",
        "quantidade": 30,
    }

    with (
        patch.object(
            livros_service.livro_rst,
            "get_livro_by_titulo",
            return_value=None,
        ),
        patch.object(
            livros_service.livro_rst,
            "adicionar_livro",
            return_value=expected_livros,
        ) as mock_repository,
    ):
        result = livros_service.adicionar_livro(db, livro)

    assert result == expected_livros
    mock_repository.assert_called_once_with(
        db,
        titulo="Desventuras em Série",
        genero="aventura",
        publico_alvo="todas as idades",
        quantidade=30,
    )


# Teste de atualizacao completa de um livro
def test_update_livro():
    db = MagicMock()

    livro = LivroUpdate(
        titulo="Coração de Tinta",
        genero="ação",
        publico_alvo="todas as idades",
        quantidade=50,
    )

    expected_livro = {
        "id": 1,
        "titulo": "Coração de Tinta",
        "genero": "ação",
        "publico_alvo": "todas as idades",
        "quantidade": 50,
    }

    with (
        patch.object(
            livros_service.livro_rst,
            "get_livro",
            return_value=expected_livro,
        ),
        patch.object(
            livros_service.livro_rst,
            "get_livro_by_titulo",
            return_value=None,
        ),
        patch.object(
            livros_service.livro_rst,
            "update_livro",
            return_value=expected_livro,
        ) as mock_repository,
    ):
        result = livros_service.update_livro(db, 1, livro)

    assert result == expected_livro
    mock_repository.assert_called_once_with(
        db,
        1,
        {
            "titulo": "Coração de Tinta",
            "genero": "ação",
            "publico_alvo": "todas as idades",
            "quantidade": 50,
        },
    )


# Teste de atualizacao parcial de um livro
def test_partial_update_livro():
    db = MagicMock()

    livro = LivroPatch(genero="aventura e fantasia")

    expected_livros = {
        "id": 1,
        "titulo": "A Bússola de Ouro",
        "genero": "aventura e fantasia",
        "publico_alvo": "jovens",
        "quantidade": 10,
    }

    with (
        patch.object(
            livros_service.livro_rst,
            "get_livro",
            return_value=expected_livros,
        ),
        patch.object(
            livros_service.livro_rst,
            "update_livro",
            return_value=expected_livros,
        ) as mock_repository,
    ):
        result = livros_service.partial_update_livro(db, 1, livro)

    assert result == expected_livros
    mock_repository.assert_called_once_with(
        db,
        1,
        {
            "genero": "aventura e fantasia",
        },
    )


# Teste de remocao de um livro
def test_delete_livro():
    db = MagicMock()

    with patch.object(
        livros_service.livro_rst,
        "delete_livro",
        return_value=True,
    ) as mock_repository:
        result = livros_service.delete_livro(db, 1)

    assert result is True
    mock_repository.assert_called_once_with(
        db,
        1,
    )
