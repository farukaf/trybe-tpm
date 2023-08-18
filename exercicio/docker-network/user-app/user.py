import os
import mysql.connector

# Configurações de conexão
db_config = {
    "host": os.environ.get("DB_HOST"),
    "user": os.environ.get("DB_USER"),
    "password": os.environ.get("DB_PASSWORD"),
    "port": os.environ.get("DB_PORT"),
}

# Conectar ao banco de dados
connection = mysql.connector.connect(**db_config)

# Criar cursor para executar consultas SQL
cursor = connection.cursor()

# Nome do novo banco de dados
new_database_name = "db_user"

# Comando SQL para criar o novo banco
create_database_query = f"CREATE DATABASE IF NOT EXISTS {new_database_name}"
cursor.execute(create_database_query)

use_database_query = f"USE {new_database_name}"
cursor.execute(use_database_query)

cursor.execute("DROP TABLE IF EXISTS User")
cursor.execute("CREATE TABLE User (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),email VARCHAR(255),last_access DATETIME)")

# Inserir valores na tabela "User"
insert_query = "INSERT INTO User (name, email, last_access) VALUES (%s, %s, %s)"
values = [
    ("Usuário 1", "usuario1@example.com", "2023-06-28 12:00:00"),
    ("Usuário 2", "usuario2@example.com", "2023-06-28 13:00:00"),
    ("Usuário 3", "usuario3@example.com", "2023-06-28 14:00:00")
]

# Executar as inserções
cursor.executemany(insert_query, values)

# Confirmar as alterações
connection.commit()

# Fechar cursor e conexão
cursor.close()

# Criar cursor para executar consultas SQL
cursor = connection.cursor()

# Consulta SQL para recuperar dados da tabela "User"
query = "SELECT id, name, email, last_access FROM User"

# Executar consulta
cursor.execute(query)

# Recuperar todos os registros
result = cursor.fetchall()

# Exibir os registros
for row in result:
    id, name, email, last_access = row
    print(f"ID: {id}, Name: {name}, Email: {email}, Last Access: {last_access}")

# Fechar cursor e conexão
cursor.close()
connection.close()