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

## Atividade Prática 5 - Persistência de Dados com PostgreSQL, SQLAlchemy e Alembic

Na Prática 5, foi implementada a parte de persistência dos dados da aplicação com a utilização de banco de dados relacional PostgreSQL, executado por meio do Docker Compose.

Anteriormente, os usuários e itens eram armazenados em listas Python, fazendo com que os dados fossem perdidos ao reiniciar a aplicação. Com a integração ao PostgreSQL, os registros agora passaram a ser armazenados de forma mais persistente.

Também foi realizada uma reorganização da arquitetura do backend, separando as responsabilidades entre as seguintes pastas: Routes, Schemas, Services, Repositories e Models.

### PostgreSQL e Docker Compose

O PostgreSQL foi adicionado ao arquivo compose.yaml, permitindo a execução conjunta da API FastAPI e do banco de dados.

A comunicação entre os serviços está sendo realizada pela rede interna do Docker Compose, utilizando o nome db como endereço do servidor PostgreSQL.

A configuração da conexão está utilizando a variável de ambiente DATABASE_URL, definida em:

`backend/app/core/config.py`

A criação das sessões do SQLAlchemy está implementada em:

`backend/app/database/session.py`

Para iniciar os containers, execute na raiz do projeto o seguinte comando:

```bash
make up
```

Para reconstruir as imagens e iniciar os containers:

```bash
make rebuild
```

### SQLAlchemy e Models

O SQLAlchemy foi utilizado para realizar o mapeamento objeto-relacional (ORM), permitindo a representação das tabelas do PostgreSQL por meio de classes do Python.

Os modelos estão localizados em:

`backend/app/models/`

Foram implementados dois modelos:

- Item: representa os itens cadastrados, contendo id, name e quantity.

- User: representa os usuários cadastrados, contendo id, name e age.

Cada registro possui um identificador único, utilizado nas operações de consulta, atualização e exclusão do banco de dados.

### Repositories

Foi adicionada uma camada de persistência responsável pela comunicação com o banco de dados.

Os repositories estão localizados em:

`backend/app/repositories/`

Foram implementados:

- item.py: operações de consulta, criação, atualização e exclusão de itens.

- user.py: operações de consulta, criação, atualização e exclusão de usuários.

Essa separação permite que os services utilizem os repositories sem executar diretamente as operações SQLAlchemy.

### Services e Routes

Os services foram atualizados para a utilização dos repositories e recepção das sessões do banco de dados.

As rotas FastAPI passaram a utilizar injeção de dependências com Depends e Annotated, permitindo fornecer uma sessão do SQLAlchemy para cada requisição criada.

Os recursos users e items possuem operações CRUD por meio dos métodos HTTP GET, POST, PUT, PATCH e DELETE.

### Alembic e Migrations

O Alembic foi configurado para gerenciar as alterações na estrutura do banco de dados.

Seus arquivos estão localizados em:

`backend/alembic/`
`backend/alembic.ini`

Foram criadas migrations para as tabelas items e users.

Para aplicar as migrations pendentes, utilize o comando abaixo:

```bash
make db-upgrade
```

Para consultar a versão atual do banco:

```bash
make db-current
```
Para visualizar o histórico:

```bash
make db-history
```

Para gerar uma nova migration, utilize o comando make db-revision, conforme a configuração que está presente no Makefile.

### Testes Unitários e de Integração

Os testes automatizados foram adaptados à nova arquitetura com banco de dados.

Os testes unitários utilizam MagicMock e patch.object para simular as operações dos repositories, verificando o comportamento dos services sem acessar o banco de dados.

Os testes de integração utilizam o TestClient do FastAPI e um banco SQLite temporário em memória, configurado no arquivo:

`backend/tests/integration/conftest.py`

Esse banco é criado e descartado durante os testes, evitando alterações nos dados do PostgreSQL.

Para executar os testes, utilize o comando abaixo:

```bash
make test
```

Para verificar a qualidade e a formatação do código:

```bash
make lint
make format-check
```

### Verificação da Persistência

A persistência dos dados foi validada por meio do Swagger UI do FastAPI, disponível em:

`http://localhost:8000/docs`

Foram cadastrados registros de usuários e itens utilizando os seguintes endpoints: POST /users/ e POST /items/.

Após reiniciar os containers com o comando:

```bash
docker compose restart
```

Os registros permaneceram disponíveis nas consultas GET /users/ e GET /items/, confirmando a persistência dos dados no PostgreSQL.

### Configuração das Variáveis de Ambiente

Foi adicionado um arquivo `.env` a fim de centralizar as configurações de conexão com o PostgreSQL, incluindo o nome do banco, usuário, senha e URL da conexão.

O Docker Compose faz uso essas variáveis para configurar os serviços da aplicação e do banco de dados.

O arquivo `.env` não é versionado no Git, evitando a exposição de credenciais. Para facilitar a configuração do ambiente, foi criado um arquivo `.env.example` contendo as variáveis necessárias para as configurações.

Antes de iniciar a aplicação, deve-se copiar o arquivo `.env.example` para `.env` e ajustar os valores conforme o ambiente utilizado de cada pessoa.

A aplicação acessa a variável `DATABASE_URL` por meio do arquivo `backend/app/core/config.py`.

## Estrutura do projeto até o momento

```text
Sistemas_Distribuidos_2026_2/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── backend/
│   ├── alembic/
│   │   ├── versions/
│   │   │   ├── ..._create_items_table.py
│   │   │   └── ..._create_users_table.py
│   │   └── env.py
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── __init__.py
│   │   │       ├── items.py
│   │   │       ├── message_check.py
│   │   │       └── users.py
│   │   │
│   │   ├── core/
│   │   │   └── config.py
│   │   │
│   │   ├── database/
│   │   │   ├── base.py
│   │   │   └── session.py
│   │   │
│   │   ├── models/
│   │   │   ├── item.py
│   │   │   └── user.py
│   │   │
│   │   ├── repositories/
│   │   │   ├── item.py
│   │   │   └── user.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── item.py
│   │   │   └── user.py
│   │   │
│   │   ├── services/
│   │   │   ├── item_service.py
│   │   │   └── user_service.py
│   │   │
│   │   ├── __init__.py
│   │   └── main.py
│   │
│   ├── tests/
│   │   ├── integration/
│   │   │   ├── conftest.py
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
│   ├── alembic.ini
│   ├── Dockerfile
│   ├── poetry.lock
│   └── pyproject.toml
│
├── frontend/
│
├── .env.example
├── .gitignore
├── compose.yaml
├── LICENSE
├── Makefile
└── README.md
```