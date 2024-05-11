import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
	const [produtos, setProdutos] = useState([]);
	const [lojas, setLojas] = useState([]);
	const [precos, setPrecos] = useState([]);

	useEffect(() => {
		const produtosCadastrados =
			JSON.parse(localStorage.getItem("produtos")) || [];
		setProdutos(produtosCadastrados);
		const lojasCadastradas =
			JSON.parse(localStorage.getItem("lojas")) || [];
		setLojas(lojasCadastradas);
		const precosCadastrados =
			JSON.parse(localStorage.getItem("precos")) || [];
		setPrecos(precosCadastrados);
	}, []);

	// Função para remover uma loja e os preços associados a ela
	const removerLoja = (id) => {
		const confirmarExclusao = window.confirm(
			"Tem certeza de que deseja excluir esta loja?"
		);
		if (confirmarExclusao) {
			// Remover os preços associados à loja
			const novosPrecos = precos.filter((preco) => preco.loja !== id);
			setPrecos(novosPrecos);
			localStorage.setItem("precos", JSON.stringify(novosPrecos));

			// Remover a loja
			const novasLojas = lojas.filter((loja) => loja.id !== id);
			setLojas(novasLojas);
			localStorage.setItem("lojas", JSON.stringify(novasLojas));
		}
	};

	return (
		<div className="container mt-5">
			<h2>Dashboard</h2>
			<div className="row mt-3">
				<div className="col-md-6">
					<h3>Produtos Cadastrados</h3>
					<ul className="list-group">
						{produtos.map((produto) => (
							<li key={produto.id} className="list-group-item">
								{/* Adicione o link para a página de preços do produto */}
								<Link to={`/preco-produto/${produto.id}`}>
									{produto.nome}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="col-md-6">
					<h3>Lojas Cadastradas</h3>
					<table className="table">
						<thead>
							<tr>
								<th>Nome da Loja</th>
								<th>Cotação do Dólar</th>
								<th>Ações</th>{" "}
								{/* Adicionar a coluna de ações */}
							</tr>
						</thead>
						<tbody>
							{lojas.map((loja) => (
								<tr key={loja.id}>
									<td>{loja.nome}</td>
									<td>${loja.cotacaoDolar.toFixed(2)}</td>
									<td>
										{/* Adicionar botão para excluir a loja */}
										<button
											className="btn btn-danger"
											onClick={() => removerLoja(loja.id)}
										>
											Excluir
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
