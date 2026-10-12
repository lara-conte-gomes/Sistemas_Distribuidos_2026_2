users = [{"name": "Luíza", "age": 22}]


# Retornar a lista de usuários
def list_users():
    return users


# Função para buscar um usuário
def get_user(user_name: str):
    for x in users:
        if x["name"] == user_name:
            return x

    return None


# Função para criar um usuário
def create_user(user):
    new_user = user.model_dump()  # Conversão para dicionário
    users.append(new_user)  # Adicionando na lista

    return new_user


# Função para atualizar um usuário
def update_user(user_name: str, user):
    for x in users:
        if x["name"] == user_name:
            x["name"] = user.name
            x["age"] = user.age
            return x

    return None


# Função para atualizar parcialmente um usuário
def partial_update_user(user_name: str, user):
    for x in users:
        if x["name"] == user_name:
            # Verificação se quero atualizar o nome do usuário
            if user.name is not None:
                x["name"] = user.name

            # Verificação se quero atualizar a idade do usuário
            if user.age is not None:
                x["age"] = user.age

            return x

    return None


# Função para deletar um usuário
def delete_user(user_name: str):
    for x in users:
        if x["name"] == user_name:
            users.remove(x)
            return True

    return False
