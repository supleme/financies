# 💰 Financies — Gerenciador de Transações Financeiras

O **Financies** é uma API RESTful desenvolvida com **NestJS** e **Prisma ORM**, projetada para ajudar usuários a gerenciarem suas **transações financeiras pessoais**, como **entradas** e **gastos**, de forma organizada, validada e extensível.
A proposta principal é oferecer uma base sólida para sistemas financeiros mais complexos no futuro, focando inicialmente em **CRUD de transações**, **resumos de dados**, **tratamento de exceções**, **interceptadores de resposta** e **validação de dados**.

---

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
