# 🐾 PetVida – API REST para Gestão de Petshop

API REST desenvolvida para **gestão completa de um petshop**, com foco em **boas práticas de backend**, arquitetura em camadas, autenticação segura e controle de permissões.

> 💡 Projeto criado para consolidar conhecimentos em **Node.js, TypeScript, Prisma e PostgreSQL**, simulando um sistema real de mercado.

---

## 🚀 Principais Funcionalidades

* 👤 Autenticação com **JWT armazenado em cookies HTTP**
* 🔐 Controle de permissões por papel (**ADMIN / USER**)
* 🐶 Gestão de clientes e seus pets
* 📅 Agendamento e controle de atendimentos
* 🛠️ Cadastro de serviços
* 📦 Controle de estoque de produtos
* 📄 Documentação interativa com **Swagger**
* 🧱 Arquitetura em camadas (Controller → Service → Repository)

---

## 🛠️ Tecnologias Utilizadas

### Backend

* Node.js
* TypeScript
* Express
* Prisma ORM

### Banco de Dados

* PostgreSQL

### Autenticação & Segurança

* JSON Web Token (JWT)
* Cookies HTTP (`httpOnly`)
* Middleware de autenticação e autorização

### Documentação

* Swagger UI
* Swagger Autogen
* Swagger JSDoc

---

## 🧠 Arquitetura do Projeto

A API segue o padrão de **Arquitetura em Camadas**, separando responsabilidades e facilitando manutenção e escalabilidade:

```
Rotas → Controllers → Services → Repositories → Banco de Dados
```

### 📂 Estrutura de Pastas (Resumo)

```
src/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── routes/
 ├── middleware/
 ├── interfaces/
 ├── utils/
 ├── database/
 └── swagger/
```

---

## 🔐 Autenticação e Autorização

* Login gera um **JWT**
* Token armazenado em **cookie httpOnly**
* Middleware valida token e injeta dados do usuário em `req.user`
* Endpoints sensíveis protegidos por papel (**ADMIN**)

### Exemplo de Payload JWT

```json
{
  "usu_id": 1,
  "usu_nome": "João Silva",
  "usu_email": "joao@email.com",
  "user_role": "adm",
  "pap_id": 1
}
```

---

## 📌 Principais Endpoints

### 🔑 Autenticação

* `POST /login/login`
* `POST /login/cadastrarUsuario`
* `POST /login/logout`

### 👤 Usuários (ADMIN)

* `GET /usuario/listarUsuarios`
* `POST /usuario/cadastrarUsuario`
* `PUT /usuario/atualizar`
* `DELETE /usuario/deletar/:id`

### 🐾 Pets

* `POST /pet/cadastrarPet`
* `GET /pet/listarPets`
* `PUT /pet/atualizar`

### 📅 Atendimentos

* `POST /atendimento/iniciarAtendimento`
* `GET /atendimento/listarAtendimentos`

📄 **Lista completa disponível no Swagger**

---

## 📄 Documentação Swagger

Após rodar o projeto:

```
http://localhost:5000/docs
```

Permite testar todos os endpoints diretamente no navegador.

---

## ▶️ Como Rodar o Projeto Localmente

### Pré-requisitos

* Node.js 16+
* PostgreSQL
* npm

### Passos

```bash
git clone https://github.com/MazzegaDev/PetVida.git
cd PetVida
npm install
```

Crie o `.env`:

```env
DATABASE_URL=postgresql://postgres:senha@localhost:5432/petvida
JWT_SECRET=sua_chave_secreta
COOKIE_NAME=connect.sid
PORT=5000
```

Execute as migrações:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run dev
```

---

## 🧪 Scripts Disponíveis

```json
"dev": "tsx watch --env-file .env src/server.ts",
"swagger": "tsx src/swagger.ts"
```


---

## 📄 Licença

Licença ISC.

---

## 👨‍💻 Autor

Desenvolvido por **MazzegaDev**
📌 Projeto focado em backend, arquitetura e boas práticas.

---
