<h1 align="center">Aplicação Web BookStore</h1>

<p align="center">
    <img src="imagem/Logo_BookStore.jpg" alt="Logo BookStore" width="300">
</p>

Seja muito bem vindo ao site BookStore! Esta aplicação foi criada com o intuito de colocar em prática todos os conhecimentos adquiridos durante a disciplina de Laboratório de Sistemas Distribuídos, ministrada pelo monitor Matheus.

## Objetivos
Esta aplicação tem como propósito auxiliar donos de livrarias e sebos no gerenciamento de **livros**, **revistas** e **funcionários**, disponibilizando as operações completas de CRUD em todos os três.

## Funcionalidades do projeto

- Possui cadastro, consulta, atulização completa e parcial e remoção de livros, revistas e funcionários,
- Busca de qualquer registro.
- Resumo do estoque da loja com a quantidade total de exemplares de livros e revistas, além do número de funcionários que já foram cadastrados.
- Validação dos dados que foram cadastrados.
- Prevenção de títulos duplicados de livros e revistas.
- Persistência dos dados no PostgreSQL.
- Integração entre frontend, backend e banco de dados.

## Tecnologias utilizadas

### Backend
- Python: linguagem de programação utilizada no desenvolvimento do backend.
- FastAPI: framework para o desenvolvimento da API REST.
- Poetry: gerenciamento de dependências.
- Pytest: execução dos testes unitários e de integração.
- Pydantic: definição dos schemas e para validação de todos os dados.
- SQLAlchemy: comunicação entre a aplicação e o banco de dados.
- HTTPX: é uma biblioteca utilizada pelo TestClient a fim de testar a API.
- Ruff: utilizado para análise estática e formatação de código.

### Frontend

- JavaScript: linguagem de programação utilizada no desenvolvimento do frontend.
- React: desenvolvimento da interface.
- Vite: utilizado no ambiente de desenvolvimento e build.
- HTML e CSS: para estruturação e estilização da interface.
- Biome: utilizado para análise estática e formatação de código.
- Vitest: para execução dos testes automatizados.
- Testing Library: para testes de componentes e interações.
- Playwright: para execução dos testes E2E.

### Infraestrutura e versionamento de código

- Git: controle de versão.
- GitHub: para hospedagem do repositório .
- GitHub Actions: automação da integração contínua (CI).
- Docker: containerização da aplicação.
- Docker Compose: para gerencimento dos containers.
- Makefile: utilizado para automatização dos comandos do projeto.

## Arquitetura

A aplicação criada é composta por três serviços:

- **Frontend:** é a interface responsável pela interação com o usuário.
- **Backend:** API REST responsável pelas regras de negócio e processamento das requisições. Possui uma arquitetura dividida em camadas, separando *routes*, *services*, *repositories*, *schemas* e *models*.
- **Banco de dados:** para armazenamento persistente das informações.

A comunicação entre o frontend e o backend ocorre por meio de requisições HTTP, com CORS configurado para a comunicação entre os serviços.

## Estrutura do projeto
```text
Sistemas_Distribuidos_2026_2/
│
├── .github/
│   └── workflows/
│       ├── ci_backend.yml
│       └── ci_frontend.yml
│
├── backend/
│   ├── alembic/
│   │   └── versions/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── tests/
│   │   ├── integration/
│   │   └── unit/
│   ├── alembic.ini
│   ├── Dockerfile
│   ├── poetry.lock
│   └── pyproject.toml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── playwright.config.js
│
├── .env.example
├── .gitignore
├── compose.yaml
├── LICENSE
├── Makefile
└── README.md
```

## Pré-requistos do projeto

- Git
- Docker
- Docker Compose
- Make
- Python 3.12
- Poetry
- Node.js 22
- npm

Python, Poetry, Node.js e npm são necessários para a execução dos comandos de desenvolvimento e testes localmente.

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto utilizando o arquivo `.env.example` como referência:

```bash
cp .env.example .env
```

As variáveis de ambiente que são utilizadas são as seguintes:

| Variável | Descrição |
|---|---|
| `POSTGRES_DB` | Nome do banco de dados |
| `POSTGRES_USER` | Usuário do PostgreSQL |
| `POSTGRES_PASSWORD` | Senha do PostgreSQL |
| `DATABASE_URL` | URL de conexão com o banco de dados |
| `VITE_API_URL` | URL da API utilizada pelo frontend |

O arquivo `.env` não deve ser versionado para o GitHub.

## Execução da aplicação

### Inicialização dos containers

Na raiz do projeto, execute o seguinte comando:

```bash
make up-build
```

### Aplicação das migrações

```bash
make db-upgrade
```

### Verificação do funcionamento dos containers criados

```bash
make ps
```

Os containers do frontend, backend e PostgreSQL devem apresentar o status de `healthy`.

### Acesso à aplicação

Abaixo são apresentados os endereços de acesso de cada uma das aplicações:

| Serviço | Endereço |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:8000 |
| Swagger | http://localhost:8000/docs |

### Encerramento da aplicação

```bash
make down
```

## Endpoints da API

Os endpoints disponibilizados pela API seguem o padrão mostrado abaixo:

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/livro/` | Listar os livros criados |
| GET | `/livro/{id}` | Buscar um livro |
| POST | `/livro/` | Cadastrar um livro novo |
| PUT | `/livro/{id}` | Atualizar completamente as informações de um livro |
| PATCH | `/livro/{id}` | Atualizar parcialmente as informações de um livro |
| DELETE | `/livro/{id}` | Remover um livro |

O mesmo padrão é utilizado para os recursos `/revista/` e `/funcionario/`.

A documentação completa dos endpoints está disponível no Swagger.

## Migrações do banco de dados

O Alembic é utilizado nesta aplicação para gerenciamento e versionamento das alterações na estrutura do banco de dados.

| Comando | Descrição |
|---|---|
| `make db-upgrade` | Aplicar as migrações |
| `make db-downgrade` | Reverter a última migração |
| `make db-current` | Verificar a versão atual |
| `make db-history` | Consultar o histórico de migrações |
| `make db-tables` | Listar as tabelas do banco|
| `make db-shell` | Acessar o PostgreSQL |

Para gerar uma nova migração utilize o comando abaixo:

```bash
make db-revision MSG="descricao da migracao"
```
## Testes automatizados

### Instalação das dependências necessárias

Para intalar todas elas utilize os comandos abaixo:

```bash
make install
make frontend-install
```

### Comandos de validação

| Comando | Descrição |
|---|---|
| `make test` | Testes unitários e de integração do backend |
| `make lint` | Análise estática do backend |
| `make formatacao-check` | Verificação da formatação do backend |
| `make frontend-test` | Testes unitários e de integração do frontend |
| `make frontend-check` | Análise estática e formatação do frontend |
| `make frontend-build` | Build do frontend |
| `make check-all` | Validação completa do backend e frontend |
| `make e2e` | Testes E2E com Playwright |

### Testes E2E

Com o backend e o banco de dados em execução e as migrações aplicadas, instale o navegador Chromium necessário para rodar os testes E2E:

```bash
cd frontend
npx playwright install chromium
cd ..
```

Execute os testes:

```bash
make e2e
```

Os testes E2E verificam as operações de CRUD e a persistência dos dados de livros, revistas e funcionários.

## Integração contínua (CI)

O projeto utiliza GitHub Actions para a automatização das verificações de qualidade de código, formatação, testes e da build.

Os workflows estão disponíveis nos caminhos abaixo (o primeiro é referente ao backend e o segundo ao frontend):

- `.github/workflows/ci_backend.yml`
- `.github/workflows/ci_frontend.yml`

## Comandos de manutenção

| Comando | Descrição |
|---|---|
| `make up` | Inicialização dos containers |
| `make up-build` | Construção e inicialização dos containers |
| `make down` | Encerramento dos containers |
| `make ps` | Verificação do status dos containers |
| `make logs` | Visualização dos logs dos containers |
| `make api-logs` | Visualização dos logs da API |
| `make shell_api` | Acessar o terminal do container da API |

## Vídeo demonstrativo da aplicação BookStore

O vídeo apresenta toda a arquitetura criada, a execução da aplicação, suas funcionalidades, a persistência dos dados e os testes automatizados.

**Link do vídeo**

## Informações adicionais

- **Aluna:** Lara Conte Gomes (Engenharia de Computação)
- **Instituição de ensino:** Instituo Nacional de Telecomunicações - Inatel
- **Disciplina:** C216-L1 / Laboratório de Sistemas Distribuídos (ministrada no décimo período dos cursos de Engenharia de Computação e Software)
- **Semestre:** 2026_2
- **Projeto:** BookStore
