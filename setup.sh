#!/bin/bash

echo " Iniciando configuração do projeto Financies..."

# Verifica Node.js
if ! command -v node &> /dev/null
then
    echo "Node.js não encontrado. Instale o Node antes de continuar."
    exit 1
fi

# Verifica PostgreSQL
if ! command -v psql &> /dev/null
then
    echo "PostgreSQL não encontrado. Instale o PostgreSQL antes de continuar."
    exit 1
fi

# Cria o arquivo .env se não existir
if [ ! -f ".env" ]; then
    echo "Criando arquivo .env a partir de .env.example..."
    cp .env.example .env
fi

# Garante que a URL do banco aponte para localhost
echo "Ajustando DATABASE_URL para usar localhost..."
sed -i 's/dpg-[^:]*:5432/localhost:5432/' .env
sed -i 's/finances_user/financies_user/' .env
sed -i 's/finances_6g8u/financies/' .env

# Verifica se o serviço do PostgreSQL está rodando
echo "Verificando serviço do PostgreSQL..."
if ! systemctl is-active --quiet postgresql; then
    echo "Iniciando serviço PostgreSQL..."
    sudo systemctl start postgresql
fi

# Cria o banco e usuário se não existirem
echo "🗃️ Verificando existência do banco e usuário..."
sudo -i -u postgres psql <<EOF
DO \$\$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'financies_user') THEN
      CREATE ROLE financies_user LOGIN PASSWORD 'senha123' CREATEDB;
   END IF;
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'financies') THEN
      CREATE DATABASE financies OWNER financies_user;
   END IF;
END
\$\$;
EOF

# Instala dependências do projeto
echo "Instalando dependências..."
npm install

# Gera cliente Prisma
echo "Gerando cliente Prisma..."
npx prisma generate

# Aplica migrações
echo "Aplicando migrações no banco..."
npx prisma migrate deploy || npx prisma migrate dev --name init

# Gera diagrama ERD (opcional)
echo "Gerando diagrama ERD..."
npx prisma generate

# 1️Inicia o servidor
echo "Configuração concluída! Iniciando o servidor..."
npm run start:dev
