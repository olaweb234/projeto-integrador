const db = require('../db/database');

// Listar todos os fornecedores
exports.listar = (req, res) => {
  db.all('SELECT * FROM fornecedores ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Buscar fornecedor por ID
exports.buscarPorId = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM fornecedores WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
    res.json(row);
  });
};

// Criar fornecedor
exports.criar = (req, res) => {
  const { nome, cnpj, endereco, contato } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }

  const sql = `INSERT INTO fornecedores (nome, cnpj, endereco, contato) VALUES (?, ?, ?, ?)`;
  db.run(sql, [nome, cnpj || null, endereco || '', contato || ''], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      nome,
      cnpj: cnpj || null,
      endereco: endereco || '',
      contato: contato || ''
    });
  });
};

// Atualizar fornecedor
exports.atualizar = (req, res) => {
  const { id } = req.params;
  const { nome, cnpj, endereco, contato } = req.body;

  const sql = `
    UPDATE fornecedores 
    SET nome = COALESCE(?, nome),
        cnpj = COALESCE(?, cnpj),
        endereco = COALESCE(?, endereco),
        contato = COALESCE(?, contato)
    WHERE id = ?
  `;

  db.run(sql, [nome, cnpj, endereco, contato, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
    res.json({ message: 'Fornecedor atualizado com sucesso', changes: this.changes });
  });
};

// Deletar fornecedor
exports.deletar = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM fornecedores WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
    res.json({ message: 'Fornecedor deletado com sucesso' });
  });
};
