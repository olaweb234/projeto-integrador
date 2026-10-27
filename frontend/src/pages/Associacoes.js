import React, { useState, useEffect } from 'react';
import {
  getAssociacoes,
  getProdutos,
  getFornecedores,
  createAssociacao,
  deleteAssociacao,
} from '../services/api';

function Associacoes() {
  const [associacoes, setAssociacoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(true);

  const carregar = async () => {
    try {
      setCarregando(true);
      const [resAssoc, resProd, resForn] = await Promise.all([
        getAssociacoes(),
        getProdutos(),
        getFornecedores(),
      ]);
      setAssociacoes(resAssoc.data);
      setProdutos(resProd.data);
      setFornecedores(resForn.data);
      setErro('');
    } catch (err) {
      setErro('Erro ao carregar dados. Verifique se o backend está rodando.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!produtoId || !fornecedorId) {
      setErro('Selecione um produto e um fornecedor');
      return;
    }

    try {
      await createAssociacao({
        produtoId: parseInt(produtoId),
        fornecedorId: parseInt(fornecedorId),
      });
      setSucesso('Associação criada com sucesso!');
      setProdutoId('');
      setFornecedorId('');
      carregar();
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao criar associação');
    }
  };

  const handleDeletar = async (pId, fId) => {
    if (!window.confirm('Deseja realmente remover esta associação?')) return;
    try {
      await deleteAssociacao(pId, fId);
      setSucesso('Associação removida com sucesso!');
      carregar();
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao remover associação');
    }
  };

  return (
    <div>
      <h1 className="page-title">🔗 Associações Produto / Fornecedor</h1>

      {erro && <div className="error-message">{erro}</div>}
      {sucesso && <div className="success-message">{sucesso}</div>}

      <div className="card">
        <h2 style={{ marginBottom: 16 }}>Nova Associação</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Produto *</label>
              <select
                value={produtoId}
                onChange={(e) => setProdutoId(e.target.value)}
                required
              >
                <option value="">Selecione um produto</option>
                {produtos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome} (R$ {Number(p.preco).toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Fornecedor *</label>
              <select
                value={fornecedorId}
                onChange={(e) => setFornecedorId(e.target.value)}
                required
              >
                <option value="">Selecione um fornecedor</option>
                {fornecedores.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nome} {f.cnpj ? `(${f.cnpj})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-success">
              Associar
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 16 }}>Associações Existentes</h2>
        {carregando ? (
          <p className="empty-message">Carregando...</p>
        ) : associacoes.length === 0 ? (
          <p className="empty-message">
            Nenhuma associação cadastrada. Cadastre produtos e fornecedores primeiro.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Fornecedor</th>
                <th>CNPJ</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {associacoes.map((a, idx) => (
                <tr key={`${a.produto_id}-${a.fornecedor_id}-${idx}`}>
                  <td>{a.produto_nome}</td>
                  <td>R$ {Number(a.preco).toFixed(2)}</td>
                  <td>{a.fornecedor_nome}</td>
                  <td>{a.cnpj || '—'}</td>
                  <td className="actions-cell">
                    <button
                      className="btn-danger"
                      onClick={() => handleDeletar(a.produto_id, a.fornecedor_id)}
                    >
                      Desassociar
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

export default Associacoes;
