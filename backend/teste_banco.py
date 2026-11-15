from sqlalchemy import text
from app.database.session import engine

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("Conexão com o banco estabelecida!")
        print("Resultado:", result.scalar())

except Exception as error:
    print("Erro ao conectar com o banco:")
    print(error)