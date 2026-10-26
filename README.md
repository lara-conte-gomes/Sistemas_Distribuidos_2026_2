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


# Prática 6 — Frontend com React

## 1. Descrição

Esta prática contém todo o desenvolvimento de uma interface web para gerenciamento de itens e usuários, utilizando **React, Vite e Tailwind CSS**.

A aplicação apresenta um dashboard administrativo responsivo, com navegação entre as funcionalidades, indicadores de registros cadastrados, formulários, tabelas e mecanismos de busca.

O frontend funciona de maneira independente do backend desenvolvido na Prática 5.

> **Importante:** nesta etapa, não existe comunicação com a API FastAPI nem persistência em banco de dados. Os registros são armazenados temporariamente no estado do React, utilizando `useState`, e são perdidos quando a página é recarregada.

## 2. Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| React | Desenvolvimento da interface e gerenciamento de estado |
| Vite | Servidor de desenvolvimento e build |
| Tailwind CSS | Estilização e responsividade |
| JavaScript | Implementação da lógica da aplicação |
| Biome | Linter e formatação |
| Vitest | Testes unitários e de integração |
| React Testing Library | Testes de componentes e interações |
| Playwright | Testes de ponta a ponta (E2E) |
| GitHub Actions | Integração contínua |

## 3. Funcionalidades

### 3.1. Dashboard

A página inicial apresenta:

- Indicadores com o total de itens e usuários cadastrados.
- Navegação por abas entre itens e usuários.
- Layout responsivo.
- Mensagens de confirmação de todas as operações.
- Interface organizada em cartões e tabelas.

### 3.2. Gerenciamento de itens

Permite:

- Cadastrar itens.
- Informar nome e descrição opcional.
- Validar o preenchimento obrigatório do nome.
- Limitar o nome a 100 caracteres.
- Listar os itens cadastrados.
- Buscar itens pelo nome.
- Excluir itens mediante confirmação.

### 3.3. Gerenciamento de usuários

Permite:

- Cadastrar usuários.
- Listar os usuários cadastrados.
- Buscar usuários pelo nome.
- Editar nome e idade.
- Excluir usuários com uma confirmação.
- Cancelar a edição de um usuário.

Os usuários possuem os seguintes campos:

| Campo | Tipo | Validação |
|---|---|---|
| `id` | Inteiro | Gerado automaticamente no frontend |
| `name` | String | Obrigatório, máximo de 100 caracteres |
| `age` | Inteiro | Obrigatório, não negativo |

## 4. Estrutura do frontend

```text
frontend/
├── src/
│   ├── components/
│   │   ├── ItemForm.jsx
│   │   ├── ItemList.jsx
│   │   ├── UserForm.jsx
│   │   └── UserList.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── validation.js
│   └── userValidation.js
├── tests/
│   ├── unit/
│   │   ├── validation.test.js
│   │   ├── userValidation.test.js
│   │   └── ItemForm.test.jsx
│   ├── integration/
│   │   ├── App.test.jsx
│   │   └── Users.test.jsx
│   └── e2e/
│       ├── items.spec.js
│       └── users.spec.js
├── index.html
├── vite.config.js
├── playwright.config.js
├── biome.json
├── package.json
└── package-lock.json
```

## 5. Instalação

### 5.1. Pré-requisitos

- Node.js compatível com as dependências do projeto.
- npm.
- Git.
- Make, caso sejam utilizados os comandos do Makefile.

### 5.2. Instalar dependências

Na raiz do repositório:

```bash
make frontend-install
```

De forma alternativa:

```bash
cd frontend
npm ci
```

O comando `npm ci` utiliza as versões registradas no `package-lock.json`, proporcionando instalações de forma reprodutível.

## 6. Executando a aplicação

Na raiz do repositório:

```bash
make frontend-dev
```

Ou, dentro de `frontend/`:

```bash
npm run dev
```

A aplicação estará disponível no endereço indicado pelo Vite, normalmente:

`http://localhost:5173/`

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos de produção serão gerados dentro de `frontend/dist/`.

## 7. Testes automatizados

O projeto utiliza três níveis de testes.

### 7.1. Testes unitários

Validam as regras de negócio dos formulários, incluindo:

- Nome obrigatório.
- Limite de 100 caracteres.
- Remoção de espaços desnecessários.
- Idade obrigatória.
- Rejeição de idades negativas e decimais.

Execução:

```bash
npm run test
```

### 7.2. Testes de integração

Utilizam React Testing Library a fim de verificar o comportamento dos componentes e suas interações.

Os cenários incluem:

- Validação de formulário.
- Cadastro e exibição de itens.
- Cadastro de usuários.
- Edição de usuários.
- Exclusão de usuários.

Os testes de integração são executados de forma conjunta com os unitários:

```bash
npm run test
```

### 7.3. Testes E2E

Os testes de ponta a ponta utilizam Playwright com Chromium para simular as operações reais no navegador.

Os cenários incluem:

- Cadastro de item e exibição na tabela.
- Cadastro, edição e exclusão de usuário.

Para instalar o navegador utilize:

```bash
npx playwright install chromium
```

Para executar os testes:

```bash
npm run test:e2e
```

Para visualizar a execução no navegador utilize:

```bash
npx playwright test --headed
```

O Playwright utiliza a configuração `webServer` para iniciar automaticamente o servidor Vite durante os testes.

## 8. Qualidade de código

O projeto utiliza Biome para análise estática e padronização da formatação.

Executar o linter:

```bash
npm run lint
```

Verificar a formatação:

```bash
npm run format:check
```

Aplicar a formatação:

```bash
npm run format
```

Executar as verificações gerais:

```bash
npm run check
```

As verificações são executadas automaticamente no workflow de integração contínua.

## 9. Comandos do Makefile

Os comandos do frontend podem ser executados a partir da raiz do repositório.

| Comando | Descrição |
|---|---|
| `make frontend-install` | Instala as dependências |
| `make frontend-dev` | Inicia o servidor Vite |
| `make frontend-lint` | Executa o linter |
| `make frontend-format` | Formata o código |
| `make frontend-check` | Executa as verificações do Biome |
| `make frontend-test` | Executa os testes unitários e de integração |
| `make frontend-test-e2e` | Executa os testes E2E |
| `make frontend-build` | Gera o build de produção |
| `make check-all` | Executa as verificações configuradas do projeto |

## 10. Integração contínua

A integração contínua do frontend é configurada no arquivo:

`.github/workflows/ci-frontend.yml`

O workflow utiliza GitHub Actions e executa:

1. Checkout do repositório.
2. Configuração do Node.js.
3. Instalação das dependências com `npm ci`.
4. Análise estática com Biome.
5. Verificação de formatação.
6. Testes unitários e de integração com Vitest.
7. Build de produção com Vite.
8. Instalação do Chromium e suas dependências.
9. Execução dos testes E2E com Playwright.
10. Publicação do relatório do Playwright como artefato em caso de falha.

A execução ocorre conforme os eventos e filtros de arquivos definidos no workflow, incluindo Pull Requests que modificam o frontend.

## 11. Arquitetura e limitações

A aplicação utiliza componentes React e gerenciamento de estado local.

Os componentes de formulário são responsáveis pela entrada e validação dos dados, enquanto os componentes de listagem apresentam os registros e disponibilizam as ações de gerenciamento.

O componente `App.jsx` concentra o estado da aplicação e coordena as operações de cadastro, edição e exclusão.

**Limitações atuais:**

- Não há comunicação HTTP com o backend.
- Não há autenticação.
- Não há persistência em banco de dados.
- Os registros são perdidos ao atualizar a página.
- A edição está disponível para usuários; itens podem ser cadastrados, consultados e excluídos.

A integração com a API será desenvolvida em uma etapa posterior.

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