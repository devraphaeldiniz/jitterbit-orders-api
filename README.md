# 📦 Jitterbit Orders API  
API REST para gerenciamento de pedidos, desenvolvida como parte do teste técnico da Jitterbit.

Este projeto demonstra domínio de:
- Node.js + Express  
- Supabase (PostgreSQL) como banco de dados  
- Boas práticas de arquitetura  
- Documentação com Swagger  
- Autenticação JWT  
- Validação de entrada com Zod  
- Middleware global de erros  
- Logger profissional (Morgan + Winston)  
- Rate Limiting  
- CRUD completo com relacionamento (Pedido + Itens)

---

## 🚀 Tecnologias Utilizadas

- **Node.js** + **Express**
- **Supabase** (PostgreSQL)
- **Swagger** (Documentação)
- **JWT** para autenticação
- **Zod** para validação
- **Morgan + Winston** para logs
- **Express-rate-limit** para segurança
- **dotenv** para gerenciamento de variáveis de ambiente

---

# 📂 Arquitetura

```
src/
├── config/
│   ├── logger.js
│   ├── supabase.js
│   └── swagger.js
├── controllers/
│   ├── authController.js
│   └── orderController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── rateLimit.js
│   └── validate.js
├── routes/
│   ├── authRoutes.js
│   └── orderRoutes.js
├── validators/
│   └── orderValidator.js
└── app.js
```

---

# ⚙️ Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
SUPABASE_URL=https://SEU_PROJETO.supabase.co
SUPABASE_KEY=CHAVE_ANON_PUBLIC
JWT_SECRET=minhasupersecreta123
PORT=3000
```

---

## 🗄️ Banco de Dados (Supabase)

Execute no SQL Editor do Supabase:

### 📌 Tabela `orders`

```sql
create table if not exists orders (
  orderid text primary key,
  value numeric not null,
  creationdate timestamp with time zone not null
);
```

### 📌 Tabela `items`

```sql
create table if not exists items (
  id serial primary key,
  orderid text references orders(orderid) on delete cascade,
  productid integer not null,
  quantity integer not null,
  price numeric not null
);
```

### 📌 Usuários (para login JWT)

```sql
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password text not null
);
```

Inserir usuário padrão (senha: `123456`):

```sql
insert into users (email, password)
values ('admin@teste.com', '<HASH_DA_SENHA>');
```

---

# ▶️ Como Rodar o Projeto

```bash
npm install
npm start
```

Servidor disponível em:  
**http://localhost:3000**

Swagger:  
**http://localhost:3000/docs**

---

# 🔐 Autenticação (JWT)

Antes de acessar rotas protegidas, faça login:

### 📌 POST /auth/login
```bash
curl --location 'http://localhost:3000/auth/login' --header 'Content-Type: application/json' --data '{
  "email": "admin@teste.com",
  "password": "123456"
}'
```

Resposta esperada:

```json
{ "token": "eyJhbGciOi..." }
```

Use o token nas rotas protegidas:

```
Authorization: Bearer SEU_TOKEN
```

---

# 📘 Documentação Swagger

Acesse:

👉 **http://localhost:3000/docs**

Você pode testar todas as rotas diretamente no navegador.

---

# 📦 Endpoints

## 🔓 Público

### ➤ GET `/order/list`
Lista todos os pedidos.

---

## 🔐 Protegidos com JWT

### ➤ GET `/order/{orderId}`
Busca pedido por ID.

### ➤ POST `/order`
Cria um novo pedido.  
**Body:**

```json
{
  "numeroPedido": "XYZ123",
  "valorTotal": 1500,
  "dataCriacao": "2024-01-01T12:00:00.000Z",
  "items": [
    {
      "idItem": "001",
      "quantidadeItem": 2,
      "valorItem": 100
    }
  ]
}
```

### ➤ PUT `/order/{orderId}`
Atualizar um pedido.

### ➤ DELETE `/order/{orderId}`
Excluir pedido.

---

# 🛡️ Segurança

Implementado:

✔ JWT Authentication  
✔ Rate Limit (100 req/min por IP)  
✔ Validação Zod  
✔ Logs Winston  
✔ Logs de requisição com Morgan  
✔ Sanitização das entradas  
✔ Erros padronizados com middleware global  

---

# 🧪 Exemplos de Testes (curl)

### Criar pedido:

```bash
curl --location 'http://localhost:3000/order' --header "Authorization: Bearer SEU_TOKEN" --header "Content-Type: application/json" --data '{
  "numeroPedido": "pedidoJWT-01",
  "valorTotal": 1500,
  "dataCriacao": "2024-01-01T12:00:00.000Z",
  "items": [
    {
      "idItem": "001",
      "quantidadeItem": 2,
      "valorItem": 100
    }
  ]
}'
```

---

# ✔️ Requisitos Atendidos (da prova)

- [x] CRUD completo de pedidos  
- [x] Armazenamento em banco PostgreSQL (Supabase)  
- [x] Rotas REST  
- [x] Documentação Swagger (BONUS)  
- [x] Autenticação JWT (BONUS)  
- [x] Logger Winston (BONUS)  
- [x] Validação Zod (BONUS)  
- [x] Rate-limit (BONUS)  
- [x] Tratamento global de erros (BONUS)  

---

# ⭐ Observações para o Avaliador

Este projeto foi desenvolvido seguindo boas práticas de engenharia, incluindo:

- Arquitetura limpa e modular  
- Middlewares reutilizáveis  
- Camadas isoladas (controller/route)  
- Documentação interativa com Swagger  
- Padronização de respostas da API  
- Logs adequados para produção  
- Segurança com JWT + rate limit  

---

# 👨‍💻 Autor

Desenvolvido por **Raphael Aloisio Diniz**  
E-mail: *raphaelaloisiodiniz@gmail.com*  
GitHub: *(https://github.com/devraphaeldiniz)*
Linkedin: *(https://www.linkedin.com/in/devraphaeldiniz/)*
