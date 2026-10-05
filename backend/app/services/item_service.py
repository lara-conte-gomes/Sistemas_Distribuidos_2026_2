items = [{"name": "notebook", "quantity": 50}]


# Retornar lista de items
def list_items():
    return items


# Função para buscar algum item
def get_item(item_name: str):
    for x in items:
        if x["name"] == item_name:
            return x

    return None


# Função para criar um item
def create_item(item):
    new_item = item.model_dump()  # Conversão para dicionário
    items.append(new_item)  # Adicionando na lista

    return new_item


# Função para atualizar um item
def update_item(item_name: str, item):
    for x in items:
        if x["name"] == item_name:
            x["name"] = item.name
            x["quantity"] = item.quantity

            return x

    return None


# Função para atualizar parcialmente um item
def partial_update_item(item_name: str, item):
    for x in items:
        if x["name"] == item_name:
            # Verificação se quero atualizar nome do item
            if item.name is not None:
                x["name"] = item.name

            # Verificação se quero atualizar a quantidade do item
            if item.quantity is not None:
                x["quantity"] = item.quantity

            return x

    return None


# Função para deletar um item
def delete_item(item_name: str):
    for x in items:
        if x["name"] == item_name:
            items.remove(x)
            return True

    return False
