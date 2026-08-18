.PHONY: install run test lint clean

PYTEST := poetry run pytest
UVICORN := poetry run uvicorn
RUFF := poetry run ruff

help:
	@echo "Lista de Comandos:"
	@echo "  make install  - instala as dependências"
	@echo "  make run      - inicia o servidor"
	@echo "  make test     - executa testes com pytest"
	@echo "  make lint     - verifica o código"
	@echo "  make clean    - realiza limpeza de cache"

install:
	poetry install

run:
	$(UVICORN) app.main:app --reload

test:
	$(PYTEST)

lint:
	$(RUFF) check .

clean:
	rm -rf .pytest_cache
	rm -rf __pycache_