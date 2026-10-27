import React, { useState, useEffect } from 'react';
import {
  getProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
} from '../services/api';

const formInicial = {
  nome: '',
  descricao: '',
  preco: '',
  codigo_barras: '',
};

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState(formInicial);
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(true);

  const carregar = async () => {
    try {
      setCarregando(true);
      const res = await getProdutos();
      setProdutos(res.data);
      setErro('');
    } catch (err) {
      setErro('Erro ao carregar produtos. Verifique se o backend está rodando.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
      const dados = {
        ...form,
        preco: parseFloat(form.preco),
      };

      if (editandoId) {
        await updateProduto(editandoId, dados);
        setSucesso('Produto atualizado com sucesso!');
      } else {
        await createProduto(dados);
        setSucesso('Produto criado com sucesso!');
      }

      setForm(formInicial);
      setEditandoId(null);
      carregar();
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao salvar produto');
    }
  };

  const handleEditar = (produto) => {
    setForm({
      nome: produto.nome,
      descricao: produto.descricao || '',
      preco: produto.preco,
      codigo_barras: produto.codigo_barras || '',
    });
    setEditandoId(produto.id);
    setErro('');
    setSucesso('');
  };

  const handleCancelar = () => {
    setForm(formInicial);
    setEditandoId(null);
  };

  const handleDeletar = async (id) => {
    if (!window.confirm('Deseja realmente excluir este produto?')) return;
    try {
      await deleteProduto(id);
      setSucesso('Produto excluído com sucesso!');
      carregar();
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao excluir produto');
    }
  };

  return (
    <div>
      <h1 className="page-title">📦 Produtos</h1>

      {erro && <div className="error-message">{erro}</div>}
      {sucesso && <div className="success-message">{sucesso}</div>}

      <div className="card">
        <h2 style={{ marginBottom: 16 }}>
          {editandoId ? 'Editar Produto' : 'Novo Produto'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Nome *</label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                placeholder="Nome do produto"
              />
            </div>
            <div className="form-group">
              <label>Preço *</label>
              <input
                name="preco"
                type="number"
                step="0.01"
                min="0"
                value={form.preco}
                onChange={handleChange}
                required
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label>Código de Barras</label>
              <input
                name="codigo_barras"
                value={form.codigo_barras}
                onChange={handleChange}
                placeholder="7891234567890"
              />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <input
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Descrição do produto"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editandoId ? 'Atualizar' : 'Cadastrar'}
            </button>
            {editandoId && (
              <button type="button" className="btn-secondary" onClick={handleCancelar}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 16 }}>Lista de Produtos</h2>
        {carregando ? (
          <p className="empty-message">Carregando...</p>
        ) : produtos.length === 0 ? (
          <p className="empty-message">Nenhum produto cadastrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Cód. Barras</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nome}</td>
                  <td>{p.descricao || '—'}</td>
                  <td>R$ {Number(p.preco).toFixed(2)}</td>
                  <td>{p.codigo_barras || '—'}</td>
                  <td className="actions-cell">
                    <button className="btn-secondary" onClick={() => handleEditar(p)}>
                      Editar
                    </button>
                    <button className="btn-danger" onClick={() => handleDeletar(p.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Produtos;
