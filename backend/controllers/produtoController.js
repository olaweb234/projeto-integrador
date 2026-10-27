const db = require('../db/database');

// Listar todos os produtos
exports.listar = (req, res) => {
  db.all('SELECT * FROM produtos ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Buscar produto por ID
exports.buscarPorId = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(row);
  });
};

// Criar produto
exports.criar = (req, res) => {
  const { nome, descricao, preco, codigo_barras } = req.body;

  if (!nome || preco === undefined) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }

  const sql = `INSERT INTO produtos (nome, descricao, preco, codigo_barras) VALUES (?, ?, ?, ?)`;
  db.run(sql, [nome, descricao || '', preco, codigo_barras || null], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      nome,
      descricao: descricao || '',
      preco,
      codigo_barras: codigo_barras || null
    });
  });
};

// Atualizar produto
exports.atualizar = (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, codigo_barras } = req.body;

  const sql = `
    UPDATE produtos 
    SET nome = COALESCE(?, nome),
        descricao = COALESCE(?, descricao),
        preco = COALESCE(?, preco),
        codigo_barras = COALESCE(?, codigo_barras)
    WHERE id = ?
  `;

  db.run(sql, [nome, descricao, preco, codigo_barras, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto atualizado com sucesso', changes: this.changes });
  });
};

// Deletar produto
exports.deletar = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto deletado com sucesso' });
  });
};
