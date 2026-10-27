import React, { useState, useEffect } from 'react';
import {
  getFornecedores,
  createFornecedor,
  updateFornecedor,
  deleteFornecedor,
} from '../services/api';

const formInicial = {
  nome: '',
  cnpj: '',
  endereco: '',
  contato: '',
};

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [form, setForm] = useState(formInicial);
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(true);

  const carregar = async () => {
    try {
      setCarregando(true);
      const res = await getFornecedores();
      setFornecedores(res.data);
      setErro('');
    } catch (err) {
      setErro('Erro ao carregar fornecedores. Verifique se o backend está rodando.');
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
      if (editandoId) {
        await updateFornecedor(editandoId, form);
        setSucesso('Fornecedor atualizado com sucesso!');
      } else {
        await createFornecedor(form);
        setSucesso('Fornecedor criado com sucesso!');
      }

      setForm(formInicial);
      setEditandoId(null);
      carregar();
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao salvar fornecedor');
    }
  };

  const handleEditar = (fornecedor) => {
    setForm({
      nome: fornecedor.nome,
      cnpj: fornecedor.cnpj || '',
      endereco: fornecedor.endereco || '',
      contato: fornecedor.contato || '',
    });
    setEditandoId(fornecedor.id);
    setErro('');
    setSucesso('');
  };

  const handleCancelar = () => {
    setForm(formInicial);
    setEditandoId(null);
  };

  const handleDeletar = async (id) => {
    if (!window.confirm('Deseja realmente excluir este fornecedor?')) return;
    try {
      await deleteFornecedor(id);
      setSucesso('Fornecedor excluído com sucesso!');
      carregar();
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao excluir fornecedor');
    }
  };

  return (
    <div>
      <h1 className="page-title">🏢 Fornecedores</h1>

      {erro && <div className="error-message">{erro}</div>}
      {sucesso && <div className="success-message">{sucesso}</div>}

      <div className="card">
        <h2 style={{ marginBottom: 16 }}>
          {editandoId ? 'Editar Fornecedor' : 'Novo Fornecedor'}
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
                placeholder="Nome do fornecedor"
              />
            </div>
            <div className="form-group">
              <label>CNPJ</label>
              <input
                name="cnpj"
                value={form.cnpj}
                onChange={handleChange}
                placeholder="00.000.000/0001-00"
              />
            </div>
            <div className="form-group">
              <label>Endereço</label>
              <input
                name="endereco"
                value={form.endereco}
                onChange={handleChange}
                placeholder="Rua, número, cidade"
              />
            </div>
            <div className="form-group">
              <label>Contato</label>
              <input
                name="contato"
                value={form.contato}
                onChange={handleChange}
                placeholder="Telefone ou e-mail"
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
        <h2 style={{ marginBottom: 16 }}>Lista de Fornecedores</h2>
        {carregando ? (
          <p className="empty-message">Carregando...</p>
        ) : fornecedores.length === 0 ? (
          <p className="empty-message">Nenhum fornecedor cadastrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Endereço</th>
                <th>Contato</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {fornecedores.map((f) => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.nome}</td>
                  <td>{f.cnpj || '—'}</td>
                  <td>{f.endereco || '—'}</td>
                  <td>{f.contato || '—'}</td>
                  <td className="actions-cell">
                    <button className="btn-secondary" onClick={() => handleEditar(f)}>
                      Editar
                    </button>
                    <button className="btn-danger" onClick={() => handleDeletar(f.id)}>
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

export default Fornecedores;
