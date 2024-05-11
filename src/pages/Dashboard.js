import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
	const [produtos, setProdutos] = useState([]);
	const [lojas, setLojas] = useState([]);

	useEffect(() => {
		const produtosCadastrados =
			JSON.parse(localStorage.getItem("produtos")) || [];
		setProdutos(produtosCadastrados);
		const lojasCadastradas =
			JSON.parse(localStorage.getItem("lojas")) || [];
		setLojas(lojasCadastradas);
	}, []);

	const handleInstallClick = () => {
		if (window.matchMedia("(display-mode: standalone)").matches) {
			console.log("Já instalado como PWA.");
		} else {
			console.log("Iniciando a instalação como PWA...");
			window.addEventListener("beforeinstallprompt", (event) => {
				event.preventDefault();
				event.prompt();
			});
		}
	};

	return (
		<div className="container mt-5">
			<h2>Dashboard</h2>
			<p>
				Bem-vindo ao Dashboard! Este é um aplicativo de comparativo de
				preços. Você pode instalar este aplicativo em seu dispositivo
				para usá-lo offline. Basta clicar no botão abaixo para instalar.
			</p>
			<button
				className="btn btn-primary mb-3"
				onClick={handleInstallClick}
			>
				Instalar App
			</button>
			<div className="row mt-3">
				<div className="col-md-6">
					<h3>Produtos Cadastrados</h3>
					<ul className="list-group">
						{produtos.map((produto) => (
							<li key={produto.id} className="list-group-item">
								<Link
									to={`/preco-produto/${produto.id}`}
									className="text-decoration-none"
								>
									{produto.nome}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="col-md-6">
					<h3>Lojas Cadastradas</h3>
					<ul className="list-group">
						{lojas.map((loja) => (
							<li key={loja.id} className="list-group-item">
								{loja.nome} - Cotação do Dólar: $
								{loja.cotacaoDolar.toFixed(2)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
