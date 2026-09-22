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

# Atividade Prática 3 - testes com Pytest e Integração Contínua

Iniciou-se a adição de testes para o arquivo main.py. Os testes estão presentes em 
`/backend/tests/test_main.py`. Também criou-se o arquivo de execução do CI que irá realizar o workflow em 'push' e 'pull_request'.

Por último, foram adicionados mais comandos no MakeFile, como por exemplo:

Execução dos testes mostrando mais detalhes no terminal:

- make test-verbose

Verificação de correções de formatação no código e correção automática:

- make format

Verificação de correções de formatação no código:

- make format-check

Correção de problemas de lint:

- make lint-fix

Para a execução dos testes, rode _make test_, e para a execução do CI _make ci_. Ambos na raiz do projeto.

## Atividade Prática 4 - Rotas, Schemas, Services e Testes Unitários e de Integração

Na Prática 4, separou-se e acresentou-se rotas que estavam na main.py para a pasta routes e começou-se a separar as responsabilidades entre schemas e services também.

### Routes

As rotas ficam responsáveis pela interface HTTP da API e estão localizadas em:

```text
backend/app/api/routes/
```

Foram implementadas rotas para os recursos de usuários (funcionários) e itens utilizando os métodos HTTP listados abaixo:

- `GET` — consulta de recursos;
- `POST` — criação de recursos;
- `PUT` — atualização completa;
- `PATCH` — atualização parcial;
- `DELETE` — remoção de recursos.

Também foram utilizadas rotas com Path Parameters para a identificação de usuários e itens.

### Schemas

Os schemas estão localizados em:

```text
backend/app/schemas/
```

São utilizados modelos Pydantic para definir e validar os dados recebidos pela API.

### Services

É onde a lógica da aplicação se encontra. Está armazenado em:

```text
backend/app/services/
```

Os services são responsáveis pelas operações relacionadas aos usuários e itens, enquanto as rotas ficam responsáveis pelo tratamento das requisições e respostas HTTP.

## Testes Unitários e de Integração

Os testes foram separados em duas categorias: Unitários e Integração. Maiores detalhes abaixo:

### Testes Unitários

Localizados em:

```text
backend/tests/unit/
```

Testam diretamente os services da aplicação, verificando a lógica de usuários e itens isoladamente.

### Testes de Integração

Localizados em:

```text
backend/tests/integration/
```

Utilizam o `TestClient` do FastAPI para testar o funcionamento integrado das rotas da aplicação.

Os testes de integração verificam os endpoints `GET`, `POST`, `PUT`, `PATCH` e `DELETE`, além dos códigos de status HTTP e dos dados que são retornados pela API.

Para executar toda a suíte de testes dê o seguinte comando abaixo:

```bash
make test
```

Ou, com saída mais detalhada:

```bash
make test-verbose
```

## Verificação Antes do Commit

Antes de realizar um commit, as verificações podem ser executadas na seguinte sequência:

```bash
make format
make lint-fix
make ci
```

O comando `make ci` verifica a formatação, executa o lint e roda os testes automatizados, de forma sequencial.

## Estrutura do projeto até o momento

```text
Sistemas_Distribuidos_2026_2/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── __init__.py
│   │   │       ├── items.py
│   │   │       ├── message_check.py
│   │   │       └── users.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── item.py
│   │   │   └── user.py
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── item_service.py
│   │   │   └── user_service.py
│   │   │
│   │   ├── __init__.py
│   │   └── main.py
│   │
│   ├── tests/
│   │   ├── integration/
│   │   │   ├── test_items.py
│   │   │   ├── test_message_check.py
│   │   │   └── test_users.py
│   │   │
│   │   ├── unit/
│   │   │   ├── test_item_service.py
│   │   │   └── test_user_service.py
│   │   │
│   │   └── test_main.py
│   │
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── poetry.lock
│   └── pyproject.toml
│
├── frontend/
│
├── .gitignore
├── compose.yaml
├── LICENSE
├── Makefile
└── README.md
```