.PHONY: install run test test-verbose lint format-check lint-fix ci clean up build rebuild down logs logs-api ps shell

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