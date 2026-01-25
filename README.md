# PetVida - API REST - Documentação Técnica

## Visão Geral da API

A **PetVida** é uma API REST desenvolvida para gerenciar um petshop(Ficticio) de pequeno porte. O sistema foi projetado para otimizar as rotinas internas, facilitando o cadastro de clientes, animais de estimação, agendamento de serviços e controle de estoque de produtos.

**Objetivo Principal**: Fornecer uma plataforma funcional e intuitiva que permita:

- Gerenciamento centralizado de clientes e seus pets
- Controle de atendimentos e serviços oferecidos
- Gestão de estoque de produtos
- Autenticação segura de usuários com controle de permissões

---

## 1. Tecnologias Utilizadas

### Backend

- **Node.js**: Runtime JavaScript para servidor
- **TypeScript**: Linguagem tipada para maior segurança e manutenibilidade
- **Express.js 5.2.1**: Framework web minimalista e flexível
- **Prisma ORM 7.2.0**: ORM para gerenciamento de banco de dados

### Banco de Dados

- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional
- **@prisma/adapter-pg**: Adaptador Prisma para PostgreSQL

### Autenticação e Segurança

- **JWT (jsonwebtoken 9.0.3)**: Autenticação baseada em tokens
- **Cookie Parser 1.4.7**: Parsing de cookies HTTP

### Documentação e Testes

- **Swagger UI Express 5.0.1**: Interface gráfica para exploração de API
- **Swagger AutoGen 2.23.7**: Geração automática de documentação
- **Swagger JSDoc 6.2.8**: Documentação via JSDoc

### Ferramentas de Desenvolvimento

- **ts-node-dev 2.0.0**: Hot reload para desenvolvimento
- **tsx 4.21.0**: Executor TypeScript otimizado
- **TypeScript 5.9.3**: Compilador TypeScript

---

## 2. Estrutura de Pastas do Projeto

```
PetVida/
├── src/
│   ├── @types/                    # Definições de tipos customizados
│   │   └── express.d.ts          # Extensão de tipos do Express
│   ├── controllers/               # Lógica de requisição/resposta
│   │   ├── authController.ts
│   │   ├── usuarioController.ts
│   │   ├── clienteController.ts
│   │   ├── petController.ts
│   │   ├── atendimentoController.ts
│   │   ├── servicoController.ts
│   │   ├── produtoController.ts
│   │   ├── especieController.ts
│   │   ├── racaController.ts
│   │   └── papelController.ts
│   ├── services/                  # Lógica de negócio
│   │   ├── authService.ts
│   │   ├── usuarioService.ts
│   │   ├── clienteService.ts
│   │   ├── petService.ts
│   │   ├── atendimentoService.ts
│   │   ├── servicoService.ts
│   │   ├── produtoService.ts
│   │   ├── especieService.ts
│   │   ├── racaService.ts
│   │   └── papelService.ts
│   ├── repositories/              # Acesso a dados
│   │   ├── usuarioRepository.ts
│   │   ├── clienteRepository.ts
│   │   ├── petRepository.ts
│   │   ├── atendimentoRepository.ts
│   │   ├── servicoRepository.ts
│   │   ├── produtoRepository.ts
│   │   ├── especieRepository.ts
│   │   ├── racaRepository.ts
│   │   └── papelRepository.ts
│   ├── routes/                    # Definição de rotas
│   │   ├── loginRouter.ts
│   │   ├── usuarioRouter.ts
│   │   ├── clienteRouter.ts
│   │   ├── petRouter.ts
│   │   ├── atendimentoRouter.ts
│   │   ├── servicoRouter.ts
│   │   ├── produtoRouter.ts
│   │   ├── especieRouter.ts
│   │   ├── racaRouter.ts
│   │   └── papelRouter.ts
│   ├── middleware/                # Middlewares de processamento
│   │   └── authMiddleware.ts     # Validação de autenticação
│   ├── interfaces/                # DTOs e interfaces de dados
│   │   ├── loginDTO.ts
│   │   ├── usuarioDTO.ts
│   │   ├── clienteDTO.ts
│   │   ├── petDTO.ts
│   │   ├── atendimentoDTO.ts
│   │   ├── servicoDTO.ts
│   │   ├── produtoDTO.ts
│   │   ├── especieDTO.ts
│   │   ├── racaDTO.ts
│   │   └── papelDTO.ts
│   ├── database/                  # Configuração de conexão
│   │   └── database.ts
│   ├── errors/                    # Tratamento de erros
│   │   └── error.ts
│   ├── utils/                     # Funções utilitárias
│   │   └── jwt.ts                # Geração e validação de JWT
│   ├── generated/                 # Código gerado pelo Prisma
│   │   └── prisma/
│   ├── app.ts                    # Configuração da aplicação Express
│   ├── server.ts                 # Inicialização do servidor
│   ├── swagger.ts                # Configuração Swagger
│   └── swaggerOutput.json        # Documentação Swagger gerada
├── prisma/
│   ├── schema.prisma            # Definição do schema do banco de dados
│   ├── migrations/              # Histórico de migrações
│   └── migration_lock.toml      # Lock de migrações
├── package.json                 # Dependências e scripts
├── tsconfig.json               # Configuração do TypeScript
├── prisma.config.ts            # Configuração do Prisma
└── enunciado.txt              # Especificações do projeto
```

---

## 3. Padrões Arquiteturais Adotados

### 3.1 Arquitetura em Camadas

A API segue um padrão de arquitetura em **4 camadas**:

```
┌─────────────────────────────────────────┐
│         HTTP Requests (Rotas)           │
├─────────────────────────────────────────┤
│        Controllers                      │
│   (Recebem requisições, validam e      │
│    delegam para Services)              │
├─────────────────────────────────────────┤
│        Services                         │
│   (Lógica de negócio da aplicação)     │
├─────────────────────────────────────────┤
│        Repositories                     │
│   (Acesso ao banco de dados via Prisma)│
├─────────────────────────────────────────┤
│       Banco de Dados (PostgreSQL)       │
└─────────────────────────────────────────┘
```

### 3.2 Padrão de Design - Repository

O padrão **Repository** encapsula o acesso a dados, isolando a lógica de persistência:

```typescript
// Exemplo: UsuarioRepository
class UsuarioRepository {
   async findByEmail(email: string): Promise<Usuario | null>;
   async findById(id: number): Promise<Usuario | null>;
   async create(data: ICreateUsuarioDTO): Promise<Usuario>;
   async update(data: IUpdateUsuarioDTO): Promise<Usuario>;
   async delete(id: number): Promise<Usuario>;
   async findAll(): Promise<Usuario[]>;
}
```

### 3.3 Padrão de Design - Service Layer

A camada **Service** concentra toda a lógica de negócio:

```typescript
// Exemplo: UsuarioService
class UsuarioService {
   constructor() {
      this.uRepo = new UsuarioRepository();
   }

   async createUser(data: ICreateUsuarioDTO): Promise<Usuario> {
      // Validações de negócio
      // Chamadas aos repositories
      // Retorno de dados
   }
}
```

### 3.4 Inversão de Controle

Cada classe é responsável por instanciar suas dependências:

```typescript
// Controllers instanciam Services
class UsuarioController {
   readonly uServ: UsuarioService;

   constructor() {
      this.uServ = new UsuarioService();
   }
}

// Services instanciam Repositories
class UsuarioService {
   readonly uRepo: UsuarioRepository;

   constructor() {
      this.uRepo = new UsuarioRepository();
   }
}
```

---

## 4. Fluxo de Autenticação

### 4.1 Autenticação com JWT e Cookies

A autenticação é realizada através de **JWT (JSON Web Tokens)** armazenados em **Cookies HTTP seguros**:

#### Fluxo de Login

```
┌──────────────────────────────────────────────────────────────┐
│ 1. Cliente envia credenciais (email e senha)                 │
│    POST /login/login                                          │
│    { "usu_email": "user@example.com", "usu_senha": "123456" }│
├──────────────────────────────────────────────────────────────┤
│ 2. AuthController valida requisição                           │
├──────────────────────────────────────────────────────────────┤
│ 3. AuthService processa login                                 │
│    - Busca usuário por email (UsuarioRepository)              │
│    - Valida senha (comparação simples - MELHORAR!)            │
│    - Obtém papel do usuário (PapelRepository)                 │
│    - Gera JWT com payload                                     │
├──────────────────────────────────────────────────────────────┤
│ 4. Token é armazenado em Cookie HTTP                          │
│    res.cookie(COOKIE_NAME, token, { httpOnly: true })        │
├──────────────────────────────────────────────────────────────┤
│ 5. Resposta retorna dados do usuário + token                  │
│    {                                                          │
│      "usu_id": 1,                                             │
│      "usu_nome": "João Silva",                                │
│      "usu_email": "user@example.com",                         │
│      "pap_id": 1,                                             │
│      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."     │
│    }                                                          │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 Validação de Requisições Autenticadas

As requisições subsequentes incluem o token no cookie:

```
┌──────────────────────────────────────────────────────────────┐
│ 1. Cliente envia requisição com cookie                        │
│    GET /usuario/listarUsuarios                               │
│    Cookie: connect.sid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 │
├──────────────────────────────────────────────────────────────┤
│ 2. validateAuth Middleware intercepta requisição              │
│    - Extrai token do cookie                                   │
│    - Valida token (verifyToken)                               │
│    - Decodifica payload                                       │
│    - Anexa dados do usuário em req.user                       │
├──────────────────────────────────────────────────────────────┤
│ 3. Controller processa requisição autenticada                 │
│    - Acessa dados do usuário via req.user                     │
│    - Executa lógica normalmente                               │
├──────────────────────────────────────────────────────────────┤
│ 4. Resposta retorna dados solicitados                         │
└──────────────────────────────────────────────────────────────┘
```

### 4.3 Validação de Permissões (ADMIN)

```typescript
// Middleware validateAuthAdm verifica papel do usuário
export async function validateAuthAdm(
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response | undefined> {
   const payload = verifyToken(token);

   if (payload.user_role != "adm") {
      return res.status(401).json({ msg: "Acesso restrito" });
   }

   next();
}
```

### 4.4 Logout

```
┌──────────────────────────────────────────────────────────────┐
│ 1. Cliente solicita logout                                    │
│    POST /login/logout                                         │
├──────────────────────────────────────────────────────────────┤
│ 2. AuthController limpa o cookie                              │
│    res.clearCookie(COOKIE_NAME)                               │
├──────────────────────────────────────────────────────────────┤
│ 3. Resposta 204 No Content (logout bem-sucedido)              │
└──────────────────────────────────────────────────────────────┘
```

### 4.5 Estrutura do JWT

O JWT contém os seguintes dados (payload):

```json
{
   "usu_id": 1,
   "usu_nome": "João Silva",
   "usu_email": "joao@example.com",
   "user_role": "adm",
   "pap_id": 1,
   "iat": 1705929600,
   "exp": 1705933200
}
```

- **usu_id**: ID do usuário
- **usu_nome**: Nome do usuário
- **usu_email**: Email único do usuário
- **user_role**: Papel/tipo de acesso ("adm" ou "user")
- **pap_id**: ID do papel
- **iat**: Data de emissão
- **exp**: Data de expiração (1 hora)

---

## 5. Modelos Principais (Entidades)

### 5.1 Usuario

Representa um usuário do sistema.

```typescript
interface Usuario {
   usu_id: number; // ID único (autoincremento)
   usu_nome: string; // Nome completo
   usu_email: string; // Email único
   usu_senha: string; // Senha (armazenada em texto simples - INSEGURO!)
   pap_id: number; // FK - Referência para Papel
   papel: Papel; // Relação com Papel
   cliente?: Cliente; // Relação com Cliente (opcional)
}
```

**Segurança**: ⚠️ As senhas são armazenadas em texto simples. Recomenda-se usar hash (bcrypt).

---

### 5.2 Cliente

Representa um cliente do petshop.

```typescript
interface Cliente {
   cli_id: number; // ID único (autoincremento)
   cli_nome: string; // Nome do cliente
   cli_telefone: string; // Telefone de contato
   cli_email: string; // Email único
   usu_id: number; // FK - Referência para Usuario
   usuario: Usuario; // Relação com Usuario
   pet: Pets[]; // Relação com Pets
}
```

---

### 5.3 Pets

Representa um animal de estimação.

```typescript
interface Pets {
   pet_id: number; // ID único (autoincremento)
   pet_nome: string; // Nome do pet
   pet_idade: number; // Idade em anos
   cli_id: number; // FK - Referência para Cliente
   cliente: Cliente; // Relação com Cliente
   esp_id: number; // FK - Referência para Especie
   especie: Especie; // Relação com Especie
   rac_id: number; // FK - Referência para Raca
   raca: Raca; // Relação com Raca
   atendimento: Atendimento[]; // Relação com Atendimentos
}
```

---

### 5.4 Especie

Representa a espécie de um animal (cão, gato, etc).

```typescript
interface Especie {
   esp_id: number; // ID único (autoincremento)
   esp_nome: string; // Nome da espécie (UNIQUE)
   pet: Pets[]; // Relação com Pets
}
```

**Exemplos**: Cão, Gato, Pássaro, Coelho, Hamster

---

### 5.5 Raca

Representa a raça de um animal.

```typescript
interface Raca {
   rac_id: number; // ID único (autoincremento)
   rac_nome: string; // Nome da raça (UNIQUE)
   pet: Pets[]; // Relação com Pets
}
```

**Exemplos**: Poodle, Shih Tzu, Persa, Siamês, etc

---

### 5.6 Atendimento

Representa um atendimento realizado no petshop.

```typescript
interface Atendimento {
   ate_id: number; // ID único (autoincremento)
   ate_data: DateTime; // Data e hora do atendimento
   ate_status: string; // Status (agendado, em andamento, concluído, cancelado)
   ate_valortotal: number; // Valor total do atendimento
   pet_id: number; // FK - Referência para Pet
   pets: Pets; // Relação com Pet
   servico: AtendimentoServico[]; // Serviços inclusos
}
```

---

### 5.7 Servico

Representa um serviço oferecido pelo petshop.

```typescript
interface Servico {
   ser_id: number; // ID único (autoincremento)
   ser_nome: string; // Nome do serviço
   ser_preco: number; // Preço do serviço
   atendimento: AtendimentoServico[]; // Relação com Atendimentos
}
```

**Exemplos**: Banho, Tosa, Consulta Veterinária, Vacinação

---

### 5.8 AtendimentoServico

Tabela de junção (muitos para muitos) entre Atendimento e Servico.

```typescript
interface AtendimentoServico {
   ate_id: number; // FK - Referência para Atendimento
   ser_id: number; // FK - Referência para Servico
   atendimento: Atendimento;
   servico: Servico;
   // Chave primária composta: [ate_id, ser_id]
}
```

---

### 5.9 Produto

Representa um produto em estoque.

```typescript
interface Produto {
   prd_id: number; // ID único (autoincremento)
   prd_nome: string; // Nome do produto
   prd_quantidade: number; // Quantidade em estoque
   prd_preco: number; // Preço unitário
}
```

**Exemplos**: Ração, Medicamentos, Acessórios, Shampoo

---

### 5.10 Papel

Representa o papel/permissão de um usuário.

```typescript
interface Papel {
   pap_id: number; // ID único (autoincremento)
   pap_tipo: string; // Tipo de papel (adm, user, etc)
   usuario: Usuario[]; // Relação com Usuários
}
```

**Tipos**:

- **adm**: Acesso total ao sistema
- **user**: Acesso limitado a funcionalidades de cliente

---

## 6. Descrição dos Endpoints

### 6.1 Login e Autenticação

#### POST /login/login

**Objetivo**: Autenticar usuário e gerar token JWT

**Permissão**: Pública (sem autenticação)

**Payload**:

```json
{
   "usu_email": "joao@example.com",
   "usu_senha": "123456"
}
```

**Respostas**:

✅ **200 OK** - Login bem-sucedido

```json
{
   "usu_id": 1,
   "usu_nome": "João Silva",
   "usu_email": "joao@example.com",
   "pap_id": 1,
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

❌ **404 Not Found** - Usuário não encontrado

```json
"Usuario não encontrado"
```

❌ **400 Bad Request** - Senha inválida

```json
"Senha invalida"
```

---

#### POST /login/cadastrarUsuario

**Objetivo**: Criar novo usuário (cliente/user)

**Permissão**: Pública (sem autenticação)

**Payload**:

```json
{
   "usu_nome": "Maria Silva",
   "usu_email": "maria@example.com",
   "usu_senha": "senha123",
   "usu_tell": "(11) 98765-4321"
}
```

**Respostas**:

✅ **201 Created** - Usuário criado com sucesso

```json
{
   "msg": "Usuario criado!",
   "data": {
      "usu_id": 2,
      "usu_nome": "Maria Silva",
      "usu_email": "maria@example.com",
      "usu_senha": "senha123",
      "pap_id": 2
   }
}
```

❌ **400 Bad Request** - Email já existe

```json
{
   "msg": "Email já cadastrado"
}
```

---

#### POST /login/logout

**Objetivo**: Fazer logout do usuário

**Permissão**: Autenticado (requer token)

**Payload**: Vazio

**Respostas**:

✅ **204 No Content** - Logout bem-sucedido (sem corpo de resposta)

---

### 6.2 Usuários

#### POST /usuario/cadastrarUsuario

**Objetivo**: Criar novo usuário com permissões ADMIN

**Permissão**: Requer ADMIN

**Middleware**: `validateAuthAdm`

**Payload**:

```json
{
   "usu_nome": "Carlos Admin",
   "usu_email": "carlos@example.com",
   "usu_senha": "admin123"
}
```

**Respostas**:

✅ **201 Created** - Usuário ADMIN criado

```json
{
   "msg": "Usuario criado!",
   "data": {
      "usu_id": 3,
      "usu_nome": "Carlos Admin",
      "usu_email": "carlos@example.com",
      "usu_senha": "admin123",
      "pap_id": 1
   }
}
```

---

#### GET /usuario/listarUsuarios

**Objetivo**: Listar todos os usuários

**Permissão**: Requer ADMIN

**Middleware**: `validateAuthAdm`

**Parâmetros**: Nenhum

**Respostas**:

✅ **200 OK** - Lista de usuários

```json
[
   {
      "usu_id": 1,
      "usu_nome": "João Silva",
      "usu_email": "joao@example.com",
      "usu_senha": "123456",
      "pap_id": 1
   },
   {
      "usu_id": 2,
      "usu_nome": "Maria Silva",
      "usu_email": "maria@example.com",
      "usu_senha": "senha123",
      "pap_id": 2
   }
]
```

---

#### GET /usuario/buscarPorId/:id

**Objetivo**: Buscar usuário por ID

**Permissão**: Requer ADMIN

**Middleware**: `validateAuthAdm`

**Parâmetros**:

- `id` (path param): ID do usuário

**Exemplo**: GET /usuario/buscarPorId/1

**Respostas**:

✅ **200 OK** - Usuário encontrado

```json
{
   "usu_id": 1,
   "usu_nome": "João Silva",
   "usu_email": "joao@example.com",
   "usu_senha": "123456",
   "pap_id": 1
}
```

---

#### PUT /usuario/atualizar

**Objetivo**: Atualizar dados do usuário

**Permissão**: Requer ADMIN

**Middleware**: `validateAuthAdm`

**Payload**:

```json
{
   "usu_id": 1,
   "usu_nome": "João Silva Atualizado",
   "usu_email": "joao.novo@example.com",
   "usu_senha": "novaSenha123",
   "usu_tell": "(11) 99999-8888",
   "pap_id": 1
}
```

**Respostas**:

✅ **200 OK** - Usuário atualizado

```json
{
   "msg": "Dados do usuario atualizado!",
   "data": {
      "usu_id": 1,
      "usu_nome": "João Silva Atualizado",
      "usu_email": "joao.novo@example.com",
      "usu_senha": "novaSenha123",
      "pap_id": 1
   }
}
```

---

#### DELETE /usuario/deletar/:id

**Objetivo**: Deletar usuário por ID

**Permissão**: Requer ADMIN

**Middleware**: `validateAuthAdm`

**Parâmetros**:

- `id` (path param): ID do usuário

**Exemplo**: DELETE /usuario/deletar/2

**Respostas**:

✅ **200 OK** - Usuário deletado

```json
{
   "msg": "Usuario deletado",
   "data": {
      "usu_id": 2,
      "usu_nome": "Maria Silva",
      "usu_email": "maria@example.com",
      "usu_senha": "senha123",
      "pap_id": 2
   }
}
```

---

### 6.3 Clientes

#### POST /cliente/cadastrarCliente

**Objetivo**: Criar novo cliente

**Permissão**: Requer ADMIN

**Middleware**: `validateAuthAdm`

**Payload**:

```json
{
   "cli_nome": "João Silva",
   "cli_email": "joao.cliente@example.com",
   "cli_telefone": "(11) 98765-4321",
   "usu_id": 1
}
```

**Respostas**:

✅ **201 Created** - Cliente criado

```json
{
   "msg": "Novo cliente cadastrado",
   "data": {
      "cli_id": 1,
      "cli_nome": "João Silva",
      "cli_email": "joao.cliente@example.com",
      "cli_telefone": "(11) 98765-4321",
      "usu_id": 1
   }
}
```

---

#### GET /cliente/listarClientes

**Objetivo**: Listar todos os clientes

**Permissão**: Requer ADMIN

**Middleware**: `validateAuthAdm`

**Respostas**:

✅ **200 OK** - Lista de clientes

```json
[
   {
      "cli_id": 1,
      "cli_nome": "João Silva",
      "cli_email": "joao.cliente@example.com",
      "cli_telefone": "(11) 98765-4321",
      "usu_id": 1
   }
]
```

---

#### GET /cliente/buscarPorId/:id

**Objetivo**: Buscar cliente por ID

**Permissão**: Requer ADMIN

**Parâmetros**:

- `id` (path param): ID do cliente

**Exemplo**: GET /cliente/buscarPorId/1

**Respostas**:

✅ **200 OK** - Cliente encontrado

```json
{
   "cli_id": 1,
   "cli_nome": "João Silva",
   "cli_email": "joao.cliente@example.com",
   "cli_telefone": "(11) 98765-4321",
   "usu_id": 1
}
```

---

#### PUT /cliente/atualizar

**Objetivo**: Atualizar dados do cliente

**Permissão**: Requer ADMIN

**Payload**:

```json
{
   "cli_id": 1,
   "cli_nome": "João Silva Atualizado",
   "cli_email": "joao.novo@example.com",
   "cli_telefone": "(11) 99999-8888",
   "usu_id": 1
}
```

**Respostas**:

✅ **200 OK** - Cliente atualizado

```json
{
   "msg": "Dados do cliente atualizados",
   "data": {
      "cli_id": 1,
      "cli_nome": "João Silva Atualizado",
      "cli_email": "joao.novo@example.com",
      "cli_telefone": "(11) 99999-8888",
      "usu_id": 1
   }
}
```

---

#### DELETE /cliente/deletar/:id

**Objetivo**: Deletar cliente

**Permissão**: Requer ADMIN

**Parâmetros**:

- `id` (path param): ID do cliente

**Exemplo**: DELETE /cliente/deletar/1

**Respostas**:

✅ **200 OK** - Cliente deletado

```json
{
   "msg": "Cliente deletado",
   "data": {
      "cli_id": 1,
      "cli_nome": "João Silva",
      "cli_email": "joao.cliente@example.com",
      "cli_telefone": "(11) 98765-4321",
      "usu_id": 1
   }
}
```

---

### 6.4 Pets

#### POST /pet/cadastrarPet

**Objetivo**: Criar novo pet

**Permissão**: Autenticado

**Middleware**: `validateAuth`

**Payload**:

```json
{
   "pet_nome": "Rex",
   "pet_idade": 3,
   "cli_id": 1,
   "esp_id": 1,
   "rac_id": 1
}
```

**Respostas**:

✅ **201 Created** - Pet criado

```json
{
   "msg": "Pet criado com sucesso",
   "data": {
      "pet_id": 1,
      "pet_nome": "Rex",
      "pet_idade": 3,
      "cli_id": 1,
      "esp_id": 1,
      "rac_id": 1
   }
}
```

---

#### GET /pet/listarPets

**Objetivo**: Listar todos os pets

**Permissão**: Autenticado

**Middleware**: `validateAuth`

**Respostas**:

✅ **200 OK** - Lista de pets

```json
[
   {
      "pet_id": 1,
      "pet_nome": "Rex",
      "pet_idade": 3,
      "cli_id": 1,
      "esp_id": 1,
      "rac_id": 1
   }
]
```

---

#### PUT /pet/atualizar

**Objetivo**: Atualizar dados do pet

**Permissão**: Autenticado

**Payload**:

```json
{
   "pet_id": 1,
   "pet_nome": "Rex Atualizado",
   "pet_idade": 4,
   "cli_id": 1,
   "esp_id": 1,
   "rac_id": 1
}
```

**Respostas**:

✅ **200 OK** - Pet atualizado

```json
{
   "msg": "Dados do pet atualizados",
   "data": {
      "pet_id": 1,
      "pet_nome": "Rex Atualizado",
      "pet_idade": 4,
      "cli_id": 1,
      "esp_id": 1,
      "rac_id": 1
   }
}
```

---

### 6.5 Atendimentos

#### POST /atendimento/iniciarAtendimento

**Objetivo**: Criar novo atendimento

**Permissão**: Autenticado

**Middleware**: `validateAuth`

**Payload**:

```json
{
   "ate_data": "2026-01-25T10:30:00Z",
   "ate_status": "agendado",
   "ate_valortotal": 150.0,
   "pet_id": 1
}
```

**Respostas**:

✅ **201 Created** - Atendimento criado

```json
{
   "msg": "Atendimento criado com sucesso",
   "data": {
      "ate_id": 1,
      "ate_data": "2026-01-25T10:30:00Z",
      "ate_status": "agendado",
      "ate_valortotal": 150.0,
      "pet_id": 1
   }
}
```

---

#### GET /atendimento/listarAtendimentos

**Objetivo**: Listar todos os atendimentos

**Permissão**: Autenticado

**Middleware**: `validateAuth`

**Respostas**:

✅ **200 OK** - Lista de atendimentos

```json
[
   {
      "ate_id": 1,
      "ate_data": "2026-01-25T10:30:00Z",
      "ate_status": "agendado",
      "ate_valortotal": 150.0,
      "pet_id": 1
   }
]
```

---

#### GET /atendimento/buscarPorId/:id

**Objetivo**: Buscar atendimento por ID

**Permissão**: Autenticado

**Parâmetros**:

- `id` (path param): ID do atendimento

**Exemplo**: GET /atendimento/buscarPorId/1

**Respostas**:

✅ **200 OK** - Atendimento encontrado

```json
{
   "ate_id": 1,
   "ate_data": "2026-01-25T10:30:00Z",
   "ate_status": "agendado",
   "ate_valortotal": 150.0,
   "pet_id": 1
}
```

---

### 6.6 Serviços

#### POST /servico/cadastrarServico

**Objetivo**: Criar novo serviço

**Permissão**: Requer ADMIN

**Payload**:

```json
{
   "ser_nome": "Banho e Tosa",
   "ser_preco": 85.0
}
```

**Respostas**:

✅ **201 Created** - Serviço criado

```json
{
   "msg": "Serviço criado com sucesso",
   "data": {
      "ser_id": 1,
      "ser_nome": "Banho e Tosa",
      "ser_preco": 85.0
   }
}
```

---

#### GET /servico/listarServicos

**Objetivo**: Listar todos os serviços

**Permissão**: Autenticado

**Respostas**:

✅ **200 OK** - Lista de serviços

```json
[
   {
      "ser_id": 1,
      "ser_nome": "Banho e Tosa",
      "ser_preco": 85.0
   }
]
```

---

### 6.7 Produtos

#### POST /produto/cadastrarProduto

**Objetivo**: Criar novo produto

**Permissão**: Requer ADMIN

**Payload**:

```json
{
   "prd_nome": "Ração Premium",
   "prd_quantidade": 50,
   "prd_preco": 45.9
}
```

**Respostas**:

✅ **201 Created** - Produto criado

```json
{
   "msg": "Produto criado com sucesso",
   "data": {
      "prd_id": 1,
      "prd_nome": "Ração Premium",
      "prd_quantidade": 50,
      "prd_preco": 45.9
   }
}
```

---

#### GET /produto/listarProdutos

**Objetivo**: Listar todos os produtos

**Permissão**: Autenticado

**Respostas**:

✅ **200 OK** - Lista de produtos

```json
[
   {
      "prd_id": 1,
      "prd_nome": "Ração Premium",
      "prd_quantidade": 50,
      "prd_preco": 45.9
   }
]
```

---

### 6.8 Espécies

#### POST /especie/cadastrarEspecie

**Objetivo**: Criar nova espécie

**Permissão**: Requer ADMIN

**Payload**:

```json
{
   "esp_nome": "Cão"
}
```

**Respostas**:

✅ **201 Created** - Espécie criada

```json
{
   "msg": "Espécie criada com sucesso",
   "data": {
      "esp_id": 1,
      "esp_nome": "Cão"
   }
}
```

---

#### GET /especie/listarEspecies

**Objetivo**: Listar todas as espécies

**Permissão**: Autenticado

**Respostas**:

✅ **200 OK** - Lista de espécies

```json
[
   {
      "esp_id": 1,
      "esp_nome": "Cão"
   },
   {
      "esp_id": 2,
      "esp_nome": "Gato"
   }
]
```

---

### 6.9 Raças

#### POST /raca/cadastrarRaca

**Objetivo**: Criar nova raça

**Permissão**: Requer ADMIN

**Payload**:

```json
{
   "rac_nome": "Poodle"
}
```

**Respostas**:

✅ **201 Created** - Raça criada

```json
{
   "msg": "Raça criada com sucesso",
   "data": {
      "rac_id": 1,
      "rac_nome": "Poodle"
   }
}
```

---

#### GET /raca/listarRacas

**Objetivo**: Listar todas as raças

**Permissão**: Autenticado

**Respostas**:

✅ **200 OK** - Lista de raças

```json
[
   {
      "rac_id": 1,
      "rac_nome": "Poodle"
   },
   {
      "rac_id": 2,
      "rac_nome": "Shih Tzu"
   }
]
```

---

### 6.10 Papéis (Roles)

#### POST /cargo/cadastrarCargo

**Objetivo**: Criar novo papel/cargo

**Permissão**: Requer ADMIN

**Payload**:

```json
{
   "pap_tipo": "adm"
}
```

**Respostas**:

✅ **201 Created** - Papel criado

```json
{
   "msg": "Cargo criado com sucesso",
   "data": {
      "pap_id": 1,
      "pap_tipo": "adm"
   }
}
```

---

#### GET /cargo/listarCargos

**Objetivo**: Listar todos os papéis

**Permissão**: Autenticado

**Respostas**:

✅ **200 OK** - Lista de papéis

```json
[
   {
      "pap_id": 1,
      "pap_tipo": "adm"
   },
   {
      "pap_id": 2,
      "pap_tipo": "user"
   }
]
```

---

## 7. Exemplos de Requisições e Respostas

### Exemplo 1: Fluxo Completo de Login e Cadastro

**1. Cadastrar novo usuário (cliente)**

```bash
curl -X POST http://localhost:5000/login/cadastrarUsuario \
  -H "Content-Type: application/json" \
  -d '{
    "usu_nome": "Ana Silva",
    "usu_email": "ana@example.com",
    "usu_senha": "senha123",
    "usu_tell": "(11) 98765-4321"
  }'
```

**Resposta**:

```json
{
   "msg": "Usuario criado!",
   "data": {
      "usu_id": 5,
      "usu_nome": "Ana Silva",
      "usu_email": "ana@example.com",
      "usu_senha": "senha123",
      "pap_id": 2
   }
}
```

**2. Fazer login**

```bash
curl -X POST http://localhost:5000/login/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "usu_email": "ana@example.com",
    "usu_senha": "senha123"
  }'
```

**Resposta**:

```json
{
   "usu_id": 5,
   "usu_nome": "Ana Silva",
   "usu_email": "ana@example.com",
   "pap_id": 2,
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VfaWQiOjUsInVzdV9ub21lIjoiQW5hIFNpbHZhIiwidXN1X2VtYWlsIjoiYW5hQGV4YW1wbGUuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInBhcF9pZCI6MiwiYXQiOjE3MDU5Mjk2MDAsImV4cCI6MTcwNTkzMzIwMH0.xyz123"
}
```

**3. Criar pet (autenticado)**

```bash
curl -X POST http://localhost:5000/pet/cadastrarPet \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "pet_nome": "Fluffy",
    "pet_idade": 2,
    "cli_id": 1,
    "esp_id": 1,
    "rac_id": 2
  }'
```

**Resposta**:

```json
{
   "msg": "Pet criado com sucesso",
   "data": {
      "pet_id": 5,
      "pet_nome": "Fluffy",
      "pet_idade": 2,
      "cli_id": 1,
      "esp_id": 1,
      "rac_id": 2
   }
}
```

---

### Exemplo 2: Agendamento de Atendimento

**1. Agendar atendimento**

```bash
curl -X POST http://localhost:5000/atendimento/iniciarAtendimento \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "ate_data": "2026-01-30T14:30:00Z",
    "ate_status": "agendado",
    "ate_valortotal": 150.00,
    "pet_id": 5
  }'
```

**Resposta**:

```json
{
   "msg": "Atendimento criado com sucesso",
   "data": {
      "ate_id": 3,
      "ate_data": "2026-01-30T14:30:00Z",
      "ate_status": "agendado",
      "ate_valortotal": 150.0,
      "pet_id": 5
   }
}
```

---

### Exemplo 3: Erro de Autenticação

**Requisição sem token**:

```bash
curl -X GET http://localhost:5000/usuario/listarUsuarios
```

**Resposta (401 Unauthorized)**:

```json
{
   "msg": "Token não encontrado"
}
```

---

### Exemplo 4: Erro de Permissão

**Usuário normal tentando acessar endpoint ADMIN**:

```bash
curl -X GET http://localhost:5000/usuario/listarUsuarios \
  -b cookies.txt
```

**Resposta (401 Unauthorized)**:

```json
{
   "msg": "Acesso restrito"
}
```

---


## 7. Instruções para Rodar o Projeto Localmente

### 7.1 Pré-requisitos

- **Node.js** v16 ou superior
- **npm** v8 ou superior
- **PostgreSQL** v12 ou superior
- **Git** (opcional)

### 7.2 Instalação do Banco de Dados

#### Opção 1: PostgreSQL Local

**Windows**:

1. Baixar PostgreSQL em https://www.postgresql.org/download/windows/
2. Instalar seguindo o assistente
3. Anotar usuário (padrão: `postgres`) e senha
4. Iniciar o serviço PostgreSQL

**macOS**:

```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian)**:

```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Opção 2: PostgreSQL com Docker

```bash
docker run --name petvida-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=senha123 \
  -e POSTGRES_DB=petvida \
  -p 5432:5432 \
  -d postgres:latest
```

---

### 7.3 Configuração do Projeto

**1. Clonar o repositório** (se aplicável):

```bash
git clone https://github.com/seu-usuario/petvida.git
cd petvida
```

**2. Instalar dependências**:

```bash
npm install
```

**3. Criar arquivo `.env`**:

```bash
cp .env.example .env
```

**4. Configurar variáveis de ambiente** (editar `.env`):

```env
DATABASE_URL=postgresql://postgres:senha123@localhost:5432/petvida
JWT_SECRET=sua_chave_secreta_super_complexa_aqui_minimo_32_caracteres
COOKIE_NAME=connect.sid
NODE_ENV=development
PORT=5000
```

**5. Criar banco de dados**:

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Dentro do prompt do PostgreSQL
CREATE DATABASE petvida;
\q
```

**6. Executar migrações do Prisma**:

```bash
npm run prisma migrate dev
```

Isso irá:

- Criar todas as tabelas conforme schema.prisma
- Gerar o Prisma Client
- Aplicar seed (se houver)

**7. Gerar documentação Swagger**:

```bash
npm run swagger
```

**8. Iniciar o servidor em desenvolvimento**:

```bash
npm run dev
```

Você verá:

```
http://localhost:5000/docs
```

---

### 7.4 Acessar a Aplicação

- **API**: http://localhost:5000
- **Documentação Swagger**: http://localhost:5000/docs

Na interface Swagger você pode testar todos os endpoints sem precisar de ferramentas externas.

---

### 7.5 Estrutura de Scripts do package.json

```json
{
   "scripts": {
      "dev": "tsx watch --env-file .env src/server.ts",
      "swagger": "tsx src/swagger.ts"
   }
}
```

- **`npm run dev`**: Inicia servidor em modo de desenvolvimento com hot reload
- **`npm run swagger`**: Gera documentação Swagger automaticamente

---

### 7.6 Troubleshooting

**Erro: "Database connection failed"**

```
Solução:
1. Verificar se PostgreSQL está rodando
2. Validar DATABASE_URL em .env
3. Testar conexão: psql -U postgres -d petvida
```

**Erro: "JWT_SECRET is not defined"**

```
Solução:
1. Verificar se .env existe na raiz do projeto
2. Validar se JWT_SECRET está configurado
3. Não esquecer das aspas em valores com espaços
```

**Erro: "Port 5000 is already in use"**

```
Solução:
1. Mudar PORT em .env para outra (ex: 5001)
2. Ou matar processo usando porta:
   - Windows: netstat -ano | findstr :5000
   - Linux/Mac: lsof -i :5000
```

---

### 7.7 Dados de Teste

Após executar as migrações, você pode criar dados de teste via endpoints:

**1. Criar papel ADMIN**:

```bash
curl -X POST http://localhost:5000/cargo/cadastrarCargo \
  -H "Content-Type: application/json" \
  -d '{"pap_tipo": "adm"}'
```

**2. Criar usuário ADMIN** (diretamente no banco ou via endpoint):

```bash
curl -X POST http://localhost:5000/login/cadastrarUsuario \
  -H "Content-Type: application/json" \
  -d '{
    "usu_nome": "Admin",
    "usu_email": "admin@petvida.com",
    "usu_senha": "admin123",
    "usu_tell": "(11) 98765-4321"
  }'
```

**Nota**: Após criar, atualizar no banco para `pap_id = 1` (ADMIN).

**3. Criar espécies**:

```bash
curl -X POST http://localhost:5000/especie/cadastrarEspecie \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"esp_nome": "Cão"}'
```

---



## 8. Licença

Este projeto está sob licença ISC. Veja o arquivo `package.json` para mais detalhes.

---

**Última Atualização**: Janeiro de 2026
**Versão da API**: 1.0.0
**Status**: Em Desenvolvimento
