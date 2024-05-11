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

	return (
		<div className="container mt-5">
			<h2>Dashboard</h2>
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
