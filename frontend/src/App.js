import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Produtos from './pages/Produtos';
import Fornecedores from './pages/Fornecedores';
import Associacoes from './pages/Associacoes';

function App() {
  const [pagina, setPagina] = useState('produtos');

  return (
    <div className="App">
      <Navbar paginaAtual={pagina} onChangePagina={setPagina} />
      <main className="main-content">
        {pagina === 'produtos' && <Produtos />}
        {pagina === 'fornecedores' && <Fornecedores />}
        {pagina === 'associacoes' && <Associacoes />}
      </main>
      <footer className="footer">
        <p>FACULDADE GRAN — Projeto Integrador Fullstack</p>
      </footer>
    </div>
  );
}

export default App;
