import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ========== PRODUTOS ==========
export const getProdutos = () => api.get('/produtos');
export const getProduto = (id) => api.get(`/produtos/${id}`);
export const createProduto = (data) => api.post('/produtos', data);
export const updateProduto = (id, data) => api.put(`/produtos/${id}`, data);
export const deleteProduto = (id) => api.delete(`/produtos/${id}`);

// ========== FORNECEDORES ==========
export const getFornecedores = () => api.get('/fornecedores');
export const getFornecedor = (id) => api.get(`/fornecedores/${id}`);
export const createFornecedor = (data) => api.post('/fornecedores', data);
export const updateFornecedor = (id, data) => api.put(`/fornecedores/${id}`, data);
export const deleteFornecedor = (id) => api.delete(`/fornecedores/${id}`);

// ========== ASSOCIAÇÕES ==========
export const getAssociacoes = () => api.get('/associacoes');
export const getFornecedoresPorProduto = (produtoId) => api.get(`/associacoes/produto/${produtoId}`);
export const getProdutosPorFornecedor = (fornecedorId) => api.get(`/associacoes/fornecedor/${fornecedorId}`);
export const createAssociacao = (data) => api.post('/associacoes', data);
export const deleteAssociacao = (produtoId, fornecedorId) =>
  api.delete(`/associacoes/${produtoId}/${fornecedorId}`);

export default api;
