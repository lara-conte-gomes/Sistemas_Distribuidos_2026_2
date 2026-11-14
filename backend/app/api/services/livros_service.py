# Primeiro livro
livros = [
    {
        "titulo": "A Bússola de Ouro",
        "genero": "aventura",
        "publico_alvo": "jovens",
        "quantidade": 10,
    }
]


# Funcao para retornar a lista de livros
def lista_livros():
    return livros


# Funcao para buscar algum livro
def get_livro(livro_titulo: str):
    for i in livros:
        if i["titulo"] == livro_titulo:
            return i

    return None


# Funca para adicionar um novo livro
def adicionar_livro(livro):
    novo_livro = livro.model_dump()
    livros.append(novo_livro)

    return novo_livro


# Funcao para atualizar os dados do livro
def update_livro(livro_titulo: str, livro):
    for i in livros:
        if i["titulo"] == livro_titulo:
            i["nome"] = livro.nome
            i["genero"] = livro.idade
            i["publico_alvo"] = livro.publico_alvo
            i["quantidade"] = livro.quantidade

            return livros

    return None


# Funcao para atualizar parcialmente as informacoes de um livro
def partial_update_livro(livro_titulo: str, livro):
    for i in livros:
        if i["titulo"] == livro_titulo:
            if livro.titulo is not None:
                i["titulo"] = livro.titulo

            if livro.genero is not None:
                i["genero"] = livro.genero

            if livro.publico_alvo is not None:
                i["publico_alvo"] = livro.publico_alvo

            if livro.quantidade is not None:
                i["quantidade"] = livro.quantidade

            return i

    return None


# Funcao para deletar um livro
def delete_livro(livro_titulo: str):
    for i in livros:
        if i["titulo"] == livro_titulo:
            livros.remove(i)

            return True

    return False
