# Aplicação Web BookStore
Seja muito bem vindo ao site BookStore! Esse site foi criado com o intuito de colocar em prática todos os conhecimentos adquiridos durante a disciplina de laboratório de Sistemas Distribuídos, minitrado pelo monitor Matheus.

## Objetivos
Essa aplicação tem como propósito ajudar donos de livrarias e sebos na listagem, cadastro, atualização completa, atualização parcial e remoção de **livros**, **revistas** e **funcionários**, ou seja, um CRUD completo.

## Tecnologias
Durante todo o desenvolvimento (até o momento, dia 14/11/2026), utilizou-se algumas ferramentas para o desenvolvimento do backend que estão listadas abaixo:

- Python: programação utilizada durante todo o desenvolvimentp do backend
- FastAPI: framework para o desenvolvimento da API REST
- Poetry: gerenciamento de dependências
- Pytest: execução dos testes unitários e de integração
- Pydantic: definição dos schemas e para validação de todos os dados
- HTTPX: é uma biblioteca utilizada pelo TestClient a fim de testar a API
- Ruff: utilizado para análise estática e formatação de código
- Git: controle de versão
- GitHub: para hospedagem do repositório 
- GitHub Actions: automação da integração contínua
- Docker: containerização

Obs: por enquanto não implementou-se a comunicação da API com o banco de dados

## Estrutura do projeto

Sistemas_Distribuidos_2026_2/
│
├── .github/
│   └── workflows/
│       └── ci_backend.yml
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── checar_api.py
│   │   │   │   ├── funcionarios.py
│   │   │   │   ├── livros.py
│   │   │   │   └── revistas.py
│   │   │   │
│   │   │   ├── schemas/
│   │   │   │   ├── funcionarios_schemas.py
│   │   │   │   ├── livros_schemas.py
│   │   │   │   └── revistas_schemas.py
│   │   │   │
│   │   │   └── services/
│   │   │       ├── funcionarios_service.py
│   │   │       ├── livros_service.py
│   │   │       └── revistas_service.py
│   │   │
│   │   └── main.py
│   │
│   ├── tests/
│   │   ├── integration/
│   │   │   ├── test_funcionarios.py
│   │   │   ├── test_livros.py
│   │   │   └── test_revistas.py
│   │   │
│   │   ├── unit/
│   │   │   ├── test_funcionarios_service.py
│   │   │   ├── test_livros_service.py
│   │   │   └── test_revistas_service.py
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
├── .env.example
├── .gitignore
├── compose.yaml
├── LICENSE
├── Makefile
└── README.md

