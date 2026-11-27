from unittest.mock import MagicMock, patch

from app.schemas.revistas_schemas import (
    CriarRevista,
    RevistaPatch,
    RevistaUpdate,
)
from app.services import revistas_service


# Teste de listagem das revistas
def test_list_revista():
    db = MagicMock()
    expected_revistas = [
        {
            "titulo": "Mundo Estranho",
            "genero": "tecnologia",
            "edicao": "Novembro",
            "quantidade": 10,
        }
    ]

    with patch.object(
        revistas_service.revistas_rst,
        "list_revistas",
        return_value=expected_revistas,
    ) as mock_repository:
        result = revistas_service.lista_revistas(db)

    assert result == expected_revistas
    mock_repository.assert_called_once_with(db)


# Teste de busca de uma revista
def test_get_revista():
    db = MagicMock()
    expected_revistas = [
        {
            "titulo": "Mundo Estranho",
            "genero": "tecnologia",
            "edicao": "Novembro",
            "quantidade": 10,
        }
    ]

    with patch.object(
        revistas_service.revistas_rst,
        "get_revista",
        return_value=expected_revistas,
    ) as mock_repository:
        result = revistas_service.get_revista(db, 1)

    assert result == expected_revistas
    mock_repository.assert_called_once_with(db, 1)


# Teste de criacao de uma revista
def test_adicionar_revistas():
    db = MagicMock()

    revista = CriarRevista(
        titulo="Quatro Rodas",
        genero="carro",
        edicao="Setembro",
        quantidade=35,
    )

    expected_revistas = {
        "id": 1,
        "titulo": "Quatro Rodas",
        "genero": "carro",
        "edicao": "Setembro",
        "quantidade": 35,
    }

    with (
        patch.object(
            revistas_service.revistas_rst,
            "get_revista_by_titulo",
            return_value=None,
        ),
        patch.object(
            revistas_service.revistas_rst,
            "adicionar_revista",
            return_value=expected_revistas,
        ) as mock_repository,
    ):
        result = revistas_service.adicionar_revista(db, revista)

    assert result == expected_revistas
    mock_repository.assert_called_once_with(
        db,
        titulo="Quatro Rodas",
        genero="carro",
        edicao="Setembro",
        quantidade=35,
    )


# Teste de atualizacao completa de uma revista
def test_update_revista():
    db = MagicMock()

    revista = RevistaUpdate(
        titulo="Super Interessante",
        genero="curiosidades",
        edicao="Abril",
        quantidade=14,
    )

    expected_revista = {
        "id": 1,
        "titulo": "Super Interessante",
        "genero": "curiosidades",
        "edicao": "Abril",
        "quantidade": 14,
    }

    with (
        patch.object(
            revistas_service.revistas_rst,
            "get_revista",
            return_value=expected_revista,
        ),
        patch.object(
            revistas_service.revistas_rst,
            "get_revista_by_titulo",
            return_value=None,
        ),
        patch.object(
            revistas_service.revistas_rst,
            "update_revista",
            return_value=expected_revista,
        ) as mock_repository,
    ):
        result = revistas_service.update_revista(db, 1, revista)

    assert result == expected_revista
    mock_repository.assert_called_once_with(
        db,
        1,
        {
            "titulo": "Super Interessante",
            "genero": "curiosidades",
            "edicao": "Abril",
            "quantidade": 14,
        },
    )


# Teste de atualizacao parcial de uma revista
def test_partial_update_revista():
    db = MagicMock()

    revista = RevistaPatch(
        quantidade=55,
    )

    expected_revistas = {
        "id": 1,
        "titulo": "Mundo Estranho",
        "genero": "tecnologia",
        "edicao": "Novembro",
        "quantidade": 55,
    }

    with (
        patch.object(
            revistas_service.revistas_rst,
            "get_revista",
            return_value=expected_revistas,
        ),
        patch.object(
            revistas_service.revistas_rst,
            "update_revista",
            return_value=expected_revistas,
        ) as mock_repository,
    ):
        result = revistas_service.partial_update_revista(db, 1, revista)

    assert result == expected_revistas
    mock_repository.assert_called_once_with(
        db,
        1,
        {
            "quantidade": 55,
        },
    )


# Teste de remocao de uma revista
def test_delete_revista():
    db = MagicMock()

    with patch.object(
        revistas_service.revistas_rst,
        "delete_revista",
        return_value=True,
    ) as mock_repository:
        result = revistas_service.delete_revista(db, 1)

    assert result is True
    mock_repository.assert_called_once_with(
        db,
        1,
    )
