# 💰 Financies — Gerenciador de Transações Financeiras

Desenvolvedor: **Cesar Valentim Abreu** 

O **Financies** é uma API RESTful desenvolvida com **NestJS** e **Prisma ORM**, projetada para ajudar usuários a gerenciarem suas **transações financeiras pessoais**, como **entradas** e **gastos**, de forma organizada, validada e extensível.
A proposta principal é oferecer uma base sólida para sistemas financeiros mais complexos no futuro, focando inicialmente em **CRUD de transações**, **resumos de dados**, **tratamento de exceções**, **interceptadores de resposta** e **validação de dados**.

Documentação Swagger: **https://financies.onrender.com/api-docs**

Diagrama: **https://dbdiagram.io/d/68fc0bc1357668b7328a1525**

## 💻 Instalação

**🚀 Requisitos**

- Node.js >= 18  
- PostgreSQL >= 14  
- npm >= 9  

**⚙️ Configuração rápida**

1. Clone o repositório:
   ```bash
   git clone [https://github.com/supleme/financies.git]
   cd financies
   cp .env.example .env
   ./setup.sh
   Acesse o navegador: **http://localhost:3000/api-docs**

**🧰 Comandos úteis**
Comandos:
Inicia o servidor em modo desenvolvimento: **npm run start:dev**
Abre o painel visual do banco: **npx prisma studio**
Executa migrações: **npx prisma migrate dev --name init**
Regenera o cliente Prisma: **npx prisma generate**
Força atualização do banco (sem migrações): **npx prisma db push**

## 📌 Funcionalidades Implementadas

### ✅ **Gerenciamento de Transações**
- Cadastro de novas transações (`POST /transactions`)
- Edição completa ou parcial (`PUT` / `PATCH`)
- Exclusão de transações (`DELETE`)
- Listagem geral (`GET /transactions`)
- Filtro por tipo (`income` ou `expense`)
- Obtenção de resumo (`GET /transactions/summary`)

### ⚠️ **Tratamento de Erros e Exceções**
- `HttpExceptionFilter` personalizado
- Exceções customizadas com mensagens claras
- Mensagens formatadas para ajudar no debug e no uso da API

### 🧪 **Validação e Transformação de Dados**
- Uso de DTOs com `class-validator`
- Tipagem robusta com `class-transformer` e `@Type`
- `ParseIntPipe` aplicado quando necessário

### ⚙️ **Interceptadores e Middlewares**
- Interceptador global (`ResponseInterceptor`) para padronizar respostas
- Middleware de logging e performance (em breve)

---

## 🛠️ Tecnologias Utilizadas

- **NestJS** — framework Node.js baseado em arquitetura modular
- **TypeScript** — linguagem principal
- **Prisma ORM** — integração com o banco de dados
- **MySQL** — banco de dados relacional
- **Class Validator** — para validações nos DTOs
- **Postman / Insomnia** — testes e simulações

---


RA1 - Projetar e desenvolver uma API funcional utilizando o framework NestJS.

    [X]ID1: O aluno configurou corretamente o ambiente de desenvolvimento e criou a API utilizando NestJS, com rotas e controladores que seguem a arquitetura modular.
    [X]ID2: O aluno aplicou boas práticas de organização da lógica de negócios, garantindo que os services contenham a lógica de negócio e sejam chamados pelos controladores, separando responsabilidades corretamente.
    [X]ID3: O aluno utilizou providers e configurou adequadamente a injeção de dependência no NestJS, garantindo uma arquitetura modular e escalável.
    [X]ID4: O aluno demonstrou a habilidade de criar e manipular rotas HTTP, manipulando parâmetros de rota, query e body, lidando corretamente com requisições e respostas.
    [X]ID5: O aluno aplicou boas práticas de tratamento de erros, utilizando filtros globais e personalizando as mensagens de erro para garantir respostas claras e consistentes.
    [X]ID6: O aluno criou classes DTO (Data Transfer Objects) para garantir a validação e consistência dos dados em diferentes endpoints, utilizando pipes para validar entradas de dados.
    [X]ID7: O aluno aplicou corretamente pipes de validação no NestJS, verificando entradas inválidas e assegurando a integridade dos dados transmitidos

RA2 - Implementar persistência de dados com um banco de dados relacional utilizando Prisma ou TypeORM.

    [X]ID8: O aluno modelou corretamente os dados da aplicação, definindo entidades, suas relações e campos necessários, refletidos em um Diagrama de Entidade-Relacionamento (ERD).
    [X]ID9: O aluno configurou e conectou a API a um banco de dados relacional (PostgreSQL, MySQL, etc.) utilizando Prisma ou TypeORM.
    [X]ID10: O aluno criou e aplicou migrações de banco de dados para garantir a consistência dos dados entre desenvolvimento e produção.
    [X]ID11: O aluno implementou corretamente as operações CRUD (Create, Read, Update, Delete) para pelo menos uma entidade no projeto, utilizando NestJS.

RA4 - Gerar a documentação da API e realizar o deploy em um ambiente de produção.

    [X]ID14: O aluno integrou corretamente o Swagger à API, gerando a documentação completa e interativa dos endpoints, parâmetros e respostas da API, com exemplos de requisições e respostas.
    [X]ID15: O aluno realizou o deploy da API em uma plataforma de hospedagem na nuvem (ex.: Render.com, Heroku, Vercel, etc.), garantindo que a API estivesse acessível publicamente.
    [X]ID16: O aluno garantiu que a API funcionasse corretamente no ambiente de produção, incluindo a documentação Swagger e o banco de dados.
    []ID17: O aluno realizou a configuração correta de variáveis de ambiente usando o ConfigModule do NestJS.
    []ID18: O aluno implementou corretamente o versionamento de APIs REST no NestJS, assegurando que diferentes versões da API pudessem coexistir.

RA5 - Implementar autenticação, autorização e segurança em APIs utilizando JWT, Guards, Middleware e Interceptadores.

    [X]ID19: O aluno configurou a autenticação na API utilizando JWT (JSON Web Tokens).
    [X]ID20: O aluno implementou controle de acesso baseado em roles e níveis de permissão, utilizando Guards para verificar permissões em rotas específicas.
    [X]ID21: O aluno configurou e utilizou middleware para manipular requisições antes que elas chegassem aos controladores, realizando tarefas como autenticação, logging ou tratamento de CORS.
    [X]ID22: O aluno implementou interceptadores para realizar logging ou modificar as respostas antes de enviá-las ao cliente.

