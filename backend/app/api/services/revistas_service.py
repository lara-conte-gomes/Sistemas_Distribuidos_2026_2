# Primeira revista
revistas = [
    {
        "titulo": "Mundo Estranho",
        "genero": "tecnologia",
        "quantidade": 10,
        "edicao": "Novembro",
    }
]


# Funcao para retornar a lista de revistas
def lista_revistas():
    return revistas


# Funcao para buscar alguma revista
def get_revista(revista_titulo: str):
    for i in revistas:
        if i["titulo"] == revista_titulo:
            return i

    return None


# Funca para adicionar uma nova revista
def adicionar_revista(revista):
    nova_revista = revista.model_dump()
    revista.append(nova_revista)

    return nova_revista


# Funcao para atualizar os dados da revista
def update_revista(revista_titulo: str, revista):
    for i in revistas:
        if i["titulo"] == revista_titulo:
            i["nome"] = revista.nome
            i["genero"] = revista.idade
            i["quantidade"] = revista.quantidade
            i["edicao"] = revista.edicao

            return revistas

    return None


# Funcao para atualizar parcialmente as informacoes de uma revista
def partial_update_revista(revista_titulo: str, revista):
    for i in revistas:
        if i["titulo"] == revista_titulo:
            if revista.titulo is not None:
                i["titulo"] = revista.titulo

            if revista.genero is not None:
                i["genero"] = revista.genero

            if revista.quantidade is not None:
                i["quantidade"] = revista.quantidade

            if revista.edicao is not None:
                i["edicao"] = revista.edicao

            return i

    return None


# Funcao para deletar uma revista
def delete_revista(revista_titulo: str):
    for i in revistas:
        if i["titulo"] == revista_titulo:
            revistas.remove(i)

            return True

    return False
