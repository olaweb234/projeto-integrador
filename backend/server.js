const express = require('express');
const cors = require('cors');
const path = require('path');

// Inicializa o banco de dados
require('./db/database');

const produtoRoutes = require('./routes/produtoRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const associacaoRoutes = require('./routes/associacaoRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/produtos', produtoRoutes);
app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/associacoes', associacaoRoutes);

// Rota de health check
app.get('/', (req, res) => {
  res.json({
    message: 'API Projeto Integrador - Gran Faculdade',
    endpoints: {
      produtos: '/api/produtos',
      fornecedores: '/api/fornecedores',
      associacoes: '/api/associacoes'
    }
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Endpoints disponíveis:');
  console.log('  GET    /api/produtos');
  console.log('  GET    /api/fornecedores');
  console.log('  GET    /api/associacoes');
});
