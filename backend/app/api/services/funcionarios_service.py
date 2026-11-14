# Primeiro funcionario
funcionarios = [{"nome": "João", "idade": 25, "cargo": "caixa"}]


# Funcao para retornar a lista de funcionarios
def lista_funcionarios():
    return funcionarios


# Funcao para buscar algum funcionario
def get_funcionario(funcionario_nome: str):
    for i in funcionarios:
        if i["nome"] == funcionario_nome:
            return i

    return None


# Funca para adicionar um novo funcionario
def adicionar_funcionario(funcionario):
    novo_funcionario = funcionario.model_dump()
    funcionarios.append(novo_funcionario)

    return novo_funcionario


# Funcao para atualizar os dados do funcionario
def update_funcionario(funcionario_nome: str, funcionario):
    for i in funcionarios:
        if i["nome"] == funcionario_nome:
            i["nome"] = funcionario.nome
            i["idade"] = funcionario.idade
            i["cargo"] = funcionario.cargo

            return funcionarios

    return None


# Funcao para atualizar parcialmente as informacoes de um funcionario
def partial_update_funcionario(funcionario_nome: str, funcionario):
    for i in funcionarios:
        if i["nome"] == funcionario_nome:
            if funcionario.nome is not None:
                i["nome"] = funcionario.nome

            if funcionario.idade is not None:
                i["idade"] = funcionario.idade

            if funcionario.cargo is not None:
                i["cargo"] = funcionario.cargo

            return i

    return None


# Funcao para deletar um funcionario
def delete_funcionario(funcionario_nome: str):
    for i in funcionarios:
        if i["nome"] == funcionario_nome:
            funcionarios.remove(i)

            return True

    return False
