# FACULDADE GRAN
**https://faculdade.grancursosonline.com.br/**

## Projeto Disciplina Projeto Integrador
### Fase 2 - Preparação e construção projeto Fullstack

Aplicação Fullstack para gerenciamento de **Produtos**, **Fornecedores** e **Associação Produto/Fornecedor** (relação muitos-para-muitos).

---

### Tecnologias utilizadas

**Backend**
- Node.js + Express
- SQLite (banco de dados em arquivo)
- CORS habilitado

**Frontend**
- React (Create React App)
- Axios para consumo da API
- CSS simples e responsivo

---

### Como executar

#### 1. Backend
```bash
cd backend
npm install
npm start
```
O servidor sobe em: **http://localhost:3001**

#### 2. Frontend
```bash
cd frontend
npm install
npm start
```
O frontend sobe em: **http://localhost:3000**

---

### Endpoints da API (Backend)

#### Produtos
- `GET    /api/produtos`          → Lista todos
- `GET    /api/produtos/:id`      → Busca por ID
- `POST   /api/produtos`          → Cria
- `PUT    /api/produtos/:id`      → Atualiza
- `DELETE /api/produtos/:id`      → Remove

#### Fornecedores
- `GET    /api/fornecedores`          → Lista todos
- `GET    /api/fornecedores/:id`      → Busca por ID
- `POST   /api/fornecedores`          → Cria
- `PUT    /api/fornecedores/:id`      → Atualiza
- `DELETE /api/fornecedores/:id`      → Remove

#### Associações Produto ↔ Fornecedor
- `GET    /api/associacoes`                           → Lista todas
- `GET    /api/associacoes/produto/:produtoId`        → Produtos de um fornecedor? Não: fornecedores de um produto
- `GET    /api/associacoes/fornecedor/:fornecedorId`  → Produtos de um fornecedor
- `POST   /api/associacoes`                           → Associa (body: { produtoId, fornecedorId })
- `DELETE /api/associacoes/:produtoId/:fornecedorId`  → Desassocia

---

### Estrutura do projeto
```
projeto-integrador-fullstack/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── db/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
└── README.md
```

---

**Gran Faculdade - Campus Virtual**
Projeto desenvolvido para a disciplina Projeto Integrador.
