from app.schemas.revistas_schemas import CriarRevista, RevistaPatch, RevistaUpdate
from app.services import revistas_service


# Funcao de preparacao de testes
def setup_function():
    revistas_service.revistas.clear()
    revistas_service.revistas.append(
        {
            "titulo": "Mundo Estranho",
            "genero": "tecnologia",
            "edicao": "Novembro",
            "quantidade": 10,
        }
    )


# Teste de listagem das revistas
def test_list_revistas():
    revistas = revistas_service.lista_revistas()

    assert len(revistas) == 1
    assert revistas[0] == {
        "titulo": "Mundo Estranho",
        "genero": "tecnologia",
        "edicao": "Novembro",
        "quantidade": 10,
    }


# Teste de busca de uma revista
def test_get_revista():
    revistas = revistas_service.get_revista("Mundo Estranho")

    assert revistas is not None
    assert revistas == {
        "titulo": "Mundo Estranho",
        "genero": "tecnologia",
        "edicao": "Novembro",
        "quantidade": 10,
    }


# Teste de criacao de uma revista
def test_adicionar_revista():
    revistas = CriarRevista(
        titulo="Quatro Rodas",
        genero="carro",
        edicao="Setembro",
        quantidade=35,
    )

    criado_revista = revistas_service.adicionar_revista(revistas)

    assert criado_revista == {
        "titulo": "Quatro Rodas",
        "genero": "carro",
        "edicao": "Setembro",
        "quantidade": 35,
    }

    assert len(revistas_service.revistas) == 2


# Teste de atualizacao completa de uma revista
def test_update_revista():
    revistas = RevistaUpdate(
        titulo="Super Interessante",
        genero="curiosidades",
        edicao="Abril",
        quantidade=14,
    )

    updated_revista = revistas_service.update_revista(
        "Mundo Estranho",
        revistas,
    )

    assert updated_revista == {
        "titulo": "Super Interessante",
        "genero": "curiosidades",
        "edicao": "Abril",
        "quantidade": 14,
    }


# Teste de atualizacao parcial de uma revista
def test_partial_update_revista():
    revistas = RevistaPatch(
        quantidade=55,
    )

    updated_revista = revistas_service.partial_update_revista(
        "Mundo Estranho",
        revistas,
    )

    assert updated_revista == {
        "titulo": "Mundo Estranho",
        "genero": "tecnologia",
        "edicao": "Novembro",
        "quantidade": 55,
    }


# Teste de remocao de um uma revista
def test_delete_revista():
    deleted = revistas_service.delete_revista("Mundo Estranho")

    assert deleted is True
    assert len(revistas_service.revistas) == 0
