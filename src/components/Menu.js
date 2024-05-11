import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
			<div className="container">
				<Link to="/" className="navbar-brand">
					Comparativo de Preços
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to="/dashboard" className="nav-link">
								Dashboard
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/cadastrar-loja" className="nav-link">
								Cadastrar Loja
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/cadastrar-produto" className="nav-link">
								Cadastrar Produto
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/cadastrar-preco" className="nav-link">
								Cadastrar Preço
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/listar-produtos" className="nav-link">
								Listar Produtos
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Menu;
