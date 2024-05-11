import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link className="navbar-brand" to="/">
					Comparativo de Preços Paraguai
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					onClick={toggleMenu}
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className={`collapse navbar-collapse ${
						isMenuOpen ? "show" : ""
					}`}
				>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/dashboard">
								Dashboard
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/cadastrar-loja">
								Cadastrar Loja
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/cadastrar-produto">
								Cadastrar Produto
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/cadastrar-preco">
								Cadastrar Preço
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/listar-produtos">
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
