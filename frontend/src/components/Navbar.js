import React from 'react';
import './Navbar.css';

function Navbar({ paginaAtual, onChangePagina }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">📦</span>
        <span className="brand-text">Projeto Integrador</span>
      </div>
      <ul className="navbar-menu">
        <li>
          <button
            className={paginaAtual === 'produtos' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => onChangePagina('produtos')}
          >
            Produtos
          </button>
        </li>
        <li>
          <button
            className={paginaAtual === 'fornecedores' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => onChangePagina('fornecedores')}
          >
            Fornecedores
          </button>
        </li>
        <li>
          <button
            className={paginaAtual === 'associacoes' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => onChangePagina('associacoes')}
          >
            Associações
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
