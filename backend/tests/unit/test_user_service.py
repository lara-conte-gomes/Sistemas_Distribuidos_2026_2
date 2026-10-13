from unittest.mock import MagicMock, patch

from app.schemas.user import User, UserPatch, UserUpdate
from app.services import user_service


# Teste de listagem de usuários
def test_list_users():
    db = MagicMock()

    expected_users = [{"id": 1, "name": "Luíza", "age": 22}]

    with patch.object(
        user_service.user_repository,
        "list_users",
        return_value=expected_users,
    ) as mock_repository:
        result = user_service.list_users(db)

    assert result == expected_users
    mock_repository.assert_called_once_with(db)


# Teste de busca de um usuário
def test_get_user():
    db = MagicMock()

    expected_user = {
        "id": 1,
        "name": "Luíza",
        "age": 22,
    }

    with patch.object(
        user_service.user_repository,
        "get_user",
        return_value=expected_user,
    ) as mock_repository:
        result = user_service.get_user(db, 1)

    assert result == expected_user
    mock_repository.assert_called_once_with(db, 1)


# Teste de busca de um usuário inexistente
def test_get_user_not_found():
    db = MagicMock()

    with patch.object(
        user_service.user_repository,
        "get_user",
        return_value=None,
    ) as mock_repository:
        result = user_service.get_user(db, 999)

    assert result is None
    mock_repository.assert_called_once_with(db, 999)


# Teste de criação de um usuário
def test_create_user():
    db = MagicMock()

    user = User(name="Maria", age=25)

    expected_user = {
        "id": 2,
        "name": "Maria",
        "age": 25,
    }

    with patch.object(
        user_service.user_repository,
        "create_user",
        return_value=expected_user,
    ) as mock_repository:
        result = user_service.create_user(db, user)

    assert result == expected_user

    mock_repository.assert_called_once_with(
        db,
        name="Maria",
        age=25,
    )


# Teste de atualização completa de um usuário
def test_update_user():
    db = MagicMock()

    user = UserUpdate(name="Luíza Silva", age=23)

    expected_user = {
        "id": 1,
        "name": "Luíza Silva",
        "age": 23,
    }

    with patch.object(
        user_service.user_repository,
        "update_user",
        return_value=expected_user,
    ) as mock_repository:
        result = user_service.update_user(db, 1, user)

    assert result == expected_user

    mock_repository.assert_called_once_with(
        db,
        1,
        {
            "name": "Luíza Silva",
            "age": 23,
        },
    )


# Teste de atualização de usuário inexistente
def test_update_user_not_found():
    db = MagicMock()

    user = UserUpdate(name="Maria", age=25)

    with patch.object(
        user_service.user_repository,
        "update_user",
        return_value=None,
    ) as mock_repository:
        result = user_service.update_user(db, 999, user)

    assert result is None

    mock_repository.assert_called_once_with(
        db,
        999,
        {
            "name": "Maria",
            "age": 25,
        },
    )


# Teste de atualização parcial de um usuário
def test_partial_update_user():
    db = MagicMock()

    user = UserPatch(age=23)

    expected_user = {
        "id": 1,
        "name": "Luíza",
        "age": 23,
    }

    with patch.object(
        user_service.user_repository,
        "update_user",
        return_value=expected_user,
    ) as mock_repository:
        result = user_service.partial_update_user(db, 1, user)

    assert result == expected_user

    mock_repository.assert_called_once_with(
        db,
        1,
        {"age": 23},
    )


# Teste de remoção de um usuário
def test_delete_user():
    db = MagicMock()

    with patch.object(
        user_service.user_repository,
        "delete_user",
        return_value=True,
    ) as mock_repository:
        result = user_service.delete_user(db, 1)

    assert result is True
    mock_repository.assert_called_once_with(db, 1)


# Teste de remoção de usuário inexistente
def test_delete_user_not_found():
    db = MagicMock()

    with patch.object(
        user_service.user_repository,
        "delete_user",
        return_value=False,
    ) as mock_repository:
        result = user_service.delete_user(db, 999)

    assert result is False
    mock_repository.assert_called_once_with(db, 999)
