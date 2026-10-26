.PHONY: install run test test-verbose lint format-check lint-fix ci clean up build rebuild down logs logs-api ps shell
.PHONY: frontend-install frontend-dev frontend-lint frontend-format frontend-check frontend-test frontend-test-e2e frontend-build

BACKEND := backend
POETRY := poetry run
PYTEST := $(POETRY) python -m pytest
UVICORN := $(POETRY) uvicorn
RUFF := $(POETRY) ruff
DOCKER := docker compose 

help:
	@echo "Lista de Comandos:"
	@echo " make install  - instala as dependências"
	@echo " make run      - inicia o servidor"
	@echo " make test     - entra na pasta backend e executa testes com pytest"
	@echo " make test-verbose     - entra na pasta backend e executa testes com pytest mostrando mais detalhes"
	@echo " make lint     - verifica o codigo"
	@echo " make format	  - verifica a formatacao do codigo e corrige ela"
	@echo " make format-check     - verifica a formatacao do codigo"
	@echo " make lint-fix     - corrige problemas de lint"
	@echo " make ci     - executa a Integração Contínua de format-check, lint e test"
	@echo " make clean    - realiza limpeza de cache"
	@echo "	make up 	   - inicia o container do Docker Compose"
	@echo "	make build    - constroi ou reconstroi a imagem do Docker"
	@echo "	make rebuild    - reconstrói as imagens e inicia os containers em segundo plano"
	@echo "	make down 	   - para e remove o container do Docker Compose"
	@echo "	make logs 	   - exibe os logs do container"
	@echo "	make logs-api - exibe os logs da API"
	@echo "	make ps 	   - lista o status do container"
	@echo "	make shell    - abre um terminal dentro do container da API"
	@echo " make db-upgrade    - aplica as migrations pendentes"
	@echo " make db-downgrade  - reverte a ultima migration"
	@echo " make db-current    - mostra a migration atual"
	@echo " make db-history    - exibe o historico de migrations"
	@echo " make db-tables     - lista as tabelas do PostgreSQL"
	@echo " make db-shell      - abre o terminal do PostgreSQL"
	@echo " make db-revision MSG='descricao' - gera uma nova migration"
	@echo " make db-setup      - inicia o Docker Compose e aplicar automaticamente as migrations"
	@echo " make frontend-install  - instala as dependências do frontend"
	@echo " make frontend-dev      - inicia o servidor de desenvolvimento (Vite)"
	@echo " make frontend-lint     - executa a análise estática do código (Biome)"
	@echo " make frontend-format   - formata automaticamente o código (Biome)"
	@echo " make frontend-check    - verifica lint e formatação (Biome)"
	@echo " make frontend-test     - executa os testes unitários e de integração (Vitest)"
	@echo " make frontend-test-e2e - executa os testes de ponta a ponta (Playwright)"
	@echo " make frontend-build    - gera a versão de produção do frontend"


install:
	@cd $(BACKEND) && poetry install

run:
	@cd $(BACKEND) && $(UVICORN) app.main:app --reload

test:
	@cd $(BACKEND) && $(PYTEST)

test-verbose:
	@cd $(BACKEND) && $(PYTEST) -v

lint:
	@cd $(BACKEND) && $(RUFF) check .

format:
	@cd $(BACKEND) && $(RUFF) format .

format-check:
	@cd $(BACKEND) && $(RUFF) format --check .

lint-fix:
	@cd $(BACKEND) && $(RUFF) check . --fix

ci: format-check lint test

clean:
	@cd $(BACKEND) && rm -rf .pytest_cache
	@cd $(BACKEND) && rm -rf __pycache_

up:
	$(DOCKER) up -d

build:
	$(DOCKER) build

rebuild:
	$(DOCKER) up --build -d

down:
	$(DOCKER) down

logs:
	$(DOCKER) logs -f

logs-api:
	$(DOCKER) logs -f api

ps:
	$(DOCKER) ps

shell:
	$(DOCKER) exec api sh

#Aplica todas as migrations pendentes
db-upgrade:
	docker compose exec api poetry run alembic upgrade head

#Reverte a última migration aplicada
db-downgrade:
	docker compose exec api poetry run alembic downgrade -1

db-current:
	docker compose exec api poetry run alembic current

db-history:
	docker compose exec api poetry run alembic history

db-tables:
	docker compose exec db psql -U app -d app -c "\dt"

db-shell:
	docker compose exec db psql -U app -d app

#Gera uma migration de forma automática
#Exemplo: make db-revision MSG="create users table"
db-revision:
	@test -n "$(MSG)" || (echo "Informe MSG. Exemplo: make db-revision MSG='create users table'"; exit 1)
	MSYS_NO_PATHCONV=1 docker compose run --rm -v "$(CURDIR)/backend/alembic:/app/alembic" api poetry run alembic revision --autogenerate -m "$(MSG)"

setup-db:
	docker compose up -d --build
	docker compose exec api poetry run alembic upgrade head

frontend-install:
	npm --prefix frontend ci

frontend-dev:
	npm --prefix frontend run dev

frontend-lint:
	npm --prefix frontend run lint

frontend-format:
	npm --prefix frontend run format

frontend-check:
	npm --prefix frontend run check

frontend-test:
	npm --prefix frontend run test

frontend-test-e2e:
	npm --prefix frontend run test:e2e

frontend-build:
	npm --prefix frontend run build