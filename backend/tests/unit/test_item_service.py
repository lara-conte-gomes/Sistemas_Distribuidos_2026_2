from app.schemas.item import CreateItem, ItemPatch, ItemUpdate
from app.services import item_service


def setup_function():
    item_service.items.clear()
    item_service.items.append({"name": "notebook", "quantity": 50})


# Teste de listagem de itens
def test_list_items():
    items = item_service.list_items()

    assert len(items) == 1
    assert items[0] == {
        "name": "notebook",
        "quantity": 50,
    }


# Teste de busca de um item
def test_get_item():
    item = item_service.get_item("notebook")

    assert item is not None
    assert item == {
        "name": "notebook",
        "quantity": 50,
    }


# Teste de busca de um item inexistente
def test_get_item_not_found():
    item = item_service.get_item("mouse")

    assert item is None


# Teste de criação de um item
def test_create_item():
    item = CreateItem(
        name="mouse",
        quantity=20,
    )

    created_item = item_service.create_item(item)

    assert created_item == {
        "name": "mouse",
        "quantity": 20,
    }

    assert len(item_service.items) == 2


# Teste de atualização completa de um item
def test_update_item():
    item = ItemUpdate(
        name="notebook-gamer",
        quantity=30,
    )

    updated_item = item_service.update_item(
        "notebook",
        item,
    )

    assert updated_item == {
        "name": "notebook-gamer",
        "quantity": 30,
    }


# Teste de atualização completa de um item inexistente
def test_update_item_not_found():
    item = ItemUpdate(
        name="mouse",
        quantity=20,
    )

    updated_item = item_service.update_item(
        "teclado",
        item,
    )

    assert updated_item is None


# Teste de atualização parcial de um item
def test_partial_update_item():
    item = ItemPatch(
        quantity=25,
    )

    updated_item = item_service.partial_update_item(
        "notebook",
        item,
    )

    assert updated_item == {
        "name": "notebook",
        "quantity": 25,
    }


# Teste de remoção de um item
def test_delete_item():
    deleted = item_service.delete_item("notebook")

    assert deleted is True
    assert len(item_service.items) == 0


# Teste de remoção de um item inexistente
def test_delete_item_not_found():
    deleted = item_service.delete_item("mouse")

    assert deleted is False
