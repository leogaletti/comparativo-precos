import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListarProdutos = () => {
	const [produtos, setProdutos] = useState([]);

	useEffect(() => {
		const produtosSalvos =
			JSON.parse(localStorage.getItem("produtos")) || [];
		setProdutos(produtosSalvos);
	}, []);

	const handleExcluirProduto = (idProduto) => {
		const confirmacao = window.confirm(
			"Tem certeza que deseja excluir esse produto?"
		);
		if (confirmacao) {
			const produtosAtualizados = produtos.filter(
				(produto) => produto.id !== idProduto
			);
			setProdutos(produtosAtualizados);
			// Atualizar o localStorage com os produtos atualizados
			localStorage.setItem(
				"produtos",
				JSON.stringify(produtosAtualizados)
			);
		}
	};

	return (
		<div className="container mt-5">
			<h2 className="mb-4">Listar Produtos</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Nome do Produto</th>
						<th>Quantidade de Preços Cadastrados</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{produtos.length > 0 ? (
						produtos.map((produto) => (
							<tr key={produto.id}>
								<td>
									<Link to={`/preco-produto/${produto.id}`}>
										{produto.nome}
									</Link>
								</td>
								<td>{calcularQuantidadePrecos(produto.id)}</td>
								<td>
									<button
										type="button"
										className="btn btn-danger"
										onClick={() =>
											handleExcluirProduto(produto.id)
										}
									>
										Excluir
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="3" className="text-center">
								Nenhum produto cadastrado.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

// Função para calcular a quantidade de preços cadastrados para um produto
const calcularQuantidadePrecos = (idProduto) => {
	const precosCadastrados = JSON.parse(localStorage.getItem("precos")) || [];
	const quantidadePrecos = precosCadastrados.filter(
		(preco) => preco.produto === idProduto
	).length;
	return quantidadePrecos;
};

export default ListarProdutos;
