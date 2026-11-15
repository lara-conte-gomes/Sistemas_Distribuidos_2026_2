#import
import os

#URL de conexao com o banco de dados
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite+pysqlite:///:memory:"
)