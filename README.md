# 🖥️ Jitterbit Dashboard

<!-- Navegação entre idiomas -->
> **PT-BR** | [EN](#english-version)

<!-- Descrição curta -->
Dashboard frontend para gerenciamento de pedidos, consumindo a [Jitterbit Orders API](https://github.com/AlainDead/jitterbit-orders-api).

---

## 🛠️ Tecnologias

<!-- Stack utilizada no frontend -->
- **React** + **Vite** — interface e build
- **React Router DOM** — navegação entre páginas
- **Axios** — requisições HTTP para a API

---

## 📁 Estrutura

<!-- Organização das pastas do projeto -->
```
src/
├── pages/
│   ├── ListaPedidos.jsx   # Tabela com todos os pedidos
│   └── CriarPedido.jsx    # Formulário de novo pedido
├── services/
│   └── orderService.js    # Comunicação com a API
└── App.jsx                # Rotas da aplicação
```

---

## ⚙️ Como rodar

<!-- Pré-requisito: API backend rodando -->
> A [Jitterbit Orders API](https://github.com/AlainDead/jitterbit-orders-api) precisa estar rodando em `http://localhost:3000`
```bash
git clone https://github.com/AlainDead/jitterbit-dashboard.git
cd jitterbit-dashboard
npm install
npm run dev
```

Acesse: `http://localhost:5173`

---

## 📡 Funcionalidades

<!-- O que o dashboard permite fazer -->
- ✅ Listar todos os pedidos
- ✅ Criar novo pedido com múltiplos itens
- ✅ Deletar pedido

---

## 👨‍💻 Autor

**Jonathan Alain**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-jonathan--alain-blue?logo=linkedin)](https://linkedin.com/in/jonathan-alain-933432225/)

---
---

<a name="english-version"></a>

# 🖥️ Jitterbit Dashboard

> **EN** | [PT-BR](#)

Frontend dashboard for order management, consuming the [Jitterbit Orders API](https://github.com/AlainDead/jitterbit-orders-api).

---

## 🛠️ Tech Stack

- **React** + **Vite** — UI and build tool
- **React Router DOM** — page navigation
- **Axios** — HTTP requests to the API

---

## ⚙️ Getting Started

> The [Jitterbit Orders API](https://github.com/AlainDead/jitterbit-orders-api) must be running at `http://localhost:3000`
```bash
git clone https://github.com/AlainDead/jitterbit-dashboard.git
cd jitterbit-dashboard
npm install
npm run dev
```

Access: `http://localhost:5173`

---

## 📡 Features

- ✅ List all orders
- ✅ Create new order with multiple items
- ✅ Delete order

---

## 👨‍💻 Author

**Jonathan Alain**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-jonathan--alain-blue?logo=linkedin)](https://linkedin.com/in/jonathan-alain-933432225/)
