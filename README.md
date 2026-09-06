# Sistemas_Distribuidos_2026_2
Repositório é dedicado para a matéria de laboratório de Sistemas Distribuídos (C216-L1), contendo todas as atividades práticas que serão executadas ao longo do semestre.

# Atividade Prática 1 - configurações iniciais do ambiente 

Primeiramente, foi realizada a instalação e configuração de todo o ambiente de desenvolvimento para as aulas.

Foram adicionadas as seguintes ferramentas:

- Poetry
- Makefile
- .gitignore

### Makefile

Faz a centralização dos comandos que serão bastante utilizados durante as aulas e no projeto, facilitando a execução sem a necessecidade de memorização de comandos maiores. 

Para visualizar todos os comandos disponíveis, rode:

- make help

Alguns exemplos:

- make install
- make run
- make test
- make lint
- make clean

### Poetry

É um gerenciador de dependências e ambiente virtual do Python.

As dependências do backend estão presentes em:

- pyproject.toml

E as versões específicas que serão utilizadas no projeto estarão em:

- poetry.lock

Para instalar as dependências, rode:

- make install ou poetry install

# Atividade Prática 2 - configuração do Docker

Após as configurações iniciais, foi realizada a do Docker para permitir a execução de aplicações comuns em containers.

Foram adicionados:

- Dockerfile
- .dockerignore
- compose.yaml

Enquanto compose.yaml está presente na raiz do projeto, Dockerfile e .dockerignore estão dentro da pasta backend/.

### Docker

Permite a criação de um ambiente isolado para executar aplicações, reduzindo mudanças de configuração entre máquinas diferentes.

O Docker Compose é utilizado para gerenciar os serviços necessários para a aplicação, como por exemplo:

- API da FastAPI
- banco de dados do PostgreSQL

Para construir as imagens, rode:

- make build

Iniciar os containers:

- make up

Verificar o status:

- make ps

Acompanhar os logs:

- make logs

E encerrar os containers:

- make down

# Atividade Prática 3 - testes com Pytest

Iniciou-se a adição de testes para o arquivo main.py. Os testes estão presentes em 
`/backend/tests/test_main.py`. Também criou-se o arquivo de execução do CI que irá realizar o workflow em 'push' e 'pull_request'.

Por último, foram adicionados mais comandos no MakeFile, como por exemplo:

Execução os testes mostrando mais detalhes no terminal:

- make test-verbose

Verificação de correções de formatação no código:

- make format-check

Correção de problemas de lint:

- make lint-fix

Para a execução dos testes, rode _make test_, e para a execução do CI _make ci_. Ambos na raiz do projeto.

# Estrutura do projeto até o momento

```text
Sistemas_Distribuidos_2026_2/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py
│   │
│   ├── tests/
│   │   └── test_main.py
│   │
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── poetry.lock
│   └── pyproject.toml
│
├── frontend/
│   └── (a ser desenvolvido)
│
├── .gitignore
├── compose.yaml
├── LICENSE
├── Makefile
└── README.md