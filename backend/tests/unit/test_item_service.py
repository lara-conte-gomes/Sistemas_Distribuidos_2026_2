from unittest.mock import MagicMock, patch

from app.schemas.item import CreateItem, ItemPatch, ItemUpdate
from app.services import item_service


# Teste de listagem dos itens
def test_list_items():
    db = MagicMock()
    expected_items = [{"id": 1, "name": "notebook", "quantity": 50}]

    with patch.object(
        item_service.item_repository,
        "list_items",
        return_value=expected_items,
    ) as mock_repository:
        result = item_service.list_items(db)

    assert result == expected_items
    mock_repository.assert_called_once_with(db)


# Teste de busca de um item
def test_get_item():
    db = MagicMock()
    expected_item = {
        "id": 1,
        "name": "notebook",
        "quantity": 50,
    }

    with patch.object(
        item_service.item_repository,
        "get_item",
        return_value=expected_item,
    ) as mock_repository:
        result = item_service.get_item(db, 1)

    assert result == expected_item
    mock_repository.assert_called_once_with(db, 1)


# Teste de item inexistente
def test_get_item_not_found():
    db = MagicMock()

    with patch.object(
        item_service.item_repository,
        "get_item",
        return_value=None,
    ):
        result = item_service.get_item(db, 999)

    assert result is None


# Teste de criação de um item
def test_create_item():
    db = MagicMock()
    item = CreateItem(name="mouse", quantity=20)

    expected_item = {
        "id": 1,
        "name": "mouse",
        "quantity": 20,
    }

    with patch.object(
        item_service.item_repository,
        "create_item",
        return_value=expected_item,
    ) as mock_repository:
        result = item_service.create_item(db, item)

    assert result == expected_item

    mock_repository.assert_called_once_with(
        db,
        name="mouse",
        quantity=20,
    )


# Teste de atualização completa de um item
def test_update_item():
    db = MagicMock()
    item = ItemUpdate(name="notebook-gamer", quantity=30)

    expected_item = {
        "id": 1,
        "name": "notebook-gamer",
        "quantity": 30,
    }

    with patch.object(
        item_service.item_repository,
        "update_item",
        return_value=expected_item,
    ) as mock_repository:
        result = item_service.update_item(db, 1, item)

    assert result == expected_item

    mock_repository.assert_called_once_with(
        db,
        1,
        {
            "name": "notebook-gamer",
            "quantity": 30,
        },
    )


# Teste de atualização de item inexistente
def test_update_item_not_found():
    db = MagicMock()
    item = ItemUpdate(name="mouse", quantity=10)

    with patch.object(
        item_service.item_repository,
        "update_item",
        return_value=None,
    ):
        result = item_service.update_item(db, 999, item)

    assert result is None


# Teste de atualização parcial de um item
def test_partial_update_item():
    db = MagicMock()
    item = ItemPatch(quantity=25)

    expected_item = {
        "id": 1,
        "name": "notebook",
        "quantity": 25,
    }

    with patch.object(
        item_service.item_repository,
        "update_item",
        return_value=expected_item,
    ) as mock_repository:
        result = item_service.partial_update_item(db, 1, item)

    assert result == expected_item

    mock_repository.assert_called_once_with(
        db,
        1,
        {"quantity": 25},
    )


# Teste de remoção de um item
def test_delete_item():
    db = MagicMock()

    with patch.object(
        item_service.item_repository,
        "delete_item",
        return_value=True,
    ) as mock_repository:
        result = item_service.delete_item(db, 1)

    assert result is True
    mock_repository.assert_called_once_with(db, 1)


# Teste de remoção de item inexistente
def test_delete_item_not_found():
    db = MagicMock()

    with patch.object(
        item_service.item_repository,
        "delete_item",
        return_value=False,
    ):
        result = item_service.delete_item(db, 999)

    assert result is False
