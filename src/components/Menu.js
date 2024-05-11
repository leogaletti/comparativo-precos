import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link className="navbar-brand" to="/" onClick={closeMenu}>
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
							<Link
								className="nav-link"
								to="/dashboard"
								onClick={closeMenu}
							>
								Dashboard
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								to="/cadastrar-loja"
								onClick={closeMenu}
							>
								Cadastrar Loja
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								to="/cadastrar-produto"
								onClick={closeMenu}
							>
								Cadastrar Produto
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								to="/cadastrar-preco"
								onClick={closeMenu}
							>
								Cadastrar Preço
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								to="/listar-produtos"
								onClick={closeMenu}
							>
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
