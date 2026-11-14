#Definição da imagem base
FROM python:3.12-slim

#Definição do diretório do container
WORKDIR /app

#Variáveis de ambiente que modificam o comportamento do Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

#Copiar os arquivos do Poetry para a imagem
COPY pyproject.toml poetry.lock ./

#Instalação do Poetry e das suas dependências
RUN pip install --no-cache-dir poetry \
    && poetry config virtualenvs.create false \
    && poetry install --only main --no-interaction --no-ansi

#Copiar a pasta do diretório para a imagem Docker
COPY app ./app

#Exposição da porta
EXPOSE 8000

#Comando de inicialização quando o container for iniciado
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]