const db = require('../db/database');

// Listar todas as associações
exports.listar = (req, res) => {
  const sql = `
    SELECT 
      pf.produto_id,
      pf.fornecedor_id,
      p.nome AS produto_nome,
      p.preco,
      f.nome AS fornecedor_nome,
      f.cnpj
    FROM produto_fornecedor pf
    INNER JOIN produtos p ON p.id = pf.produto_id
    INNER JOIN fornecedores f ON f.id = pf.fornecedor_id
    ORDER BY pf.produto_id, pf.fornecedor_id
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Listar fornecedores de um produto
exports.porProduto = (req, res) => {
  const { produtoId } = req.params;
  const sql = `
    SELECT f.*
    FROM fornecedores f
    INNER JOIN produto_fornecedor pf ON pf.fornecedor_id = f.id
    WHERE pf.produto_id = ?
  `;
  db.all(sql, [produtoId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Listar produtos de um fornecedor
exports.porFornecedor = (req, res) => {
  const { fornecedorId } = req.params;
  const sql = `
    SELECT p.*
    FROM produtos p
    INNER JOIN produto_fornecedor pf ON pf.produto_id = p.id
    WHERE pf.fornecedor_id = ?
  `;
  db.all(sql, [fornecedorId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Criar associação
exports.criar = (req, res) => {
  const { produtoId, fornecedorId } = req.body;

  if (!produtoId || !fornecedorId) {
    return res.status(400).json({ error: 'produtoId e fornecedorId são obrigatórios' });
  }

  const sql = `INSERT INTO produto_fornecedor (produto_id, fornecedor_id) VALUES (?, ?)`;
  db.run(sql, [produtoId, fornecedorId], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Esta associação já existe' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: 'Associação criada com sucesso',
      produtoId,
      fornecedorId
    });
  });
};

// Remover associação
exports.deletar = (req, res) => {
  const { produtoId, fornecedorId } = req.params;

  const sql = `DELETE FROM produto_fornecedor WHERE produto_id = ? AND fornecedor_id = ?`;
  db.run(sql, [produtoId, fornecedorId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Associação não encontrada' });
    }
    res.json({ message: 'Associação removida com sucesso' });
  });
};
