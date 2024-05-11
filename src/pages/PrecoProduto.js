import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PrecoProduto = () => {
	const [precos, setPrecos] = useState([]);
	const [ordenacao, setOrdenacao] = useState(""); // Estado para controlar a ordenação atual
	const { id } = useParams();
	const [nomeProduto, setNomeProduto] = useState(""); // Estado para armazenar o nome do produto

	useEffect(() => {
		const produtosCadastrados =
			JSON.parse(localStorage.getItem("produtos")) || [];
		const precosCadastrados =
			JSON.parse(localStorage.getItem("precos")) || [];

		// Buscar o nome do produto correspondente ao ID
		const produto = produtosCadastrados.find(
			(produto) => produto.id === id
		);
		if (produto) {
			setNomeProduto(produto.nome);
		}

		// Filtrar os preços do produto atual
		const precosProduto = precosCadastrados.filter(
			(preco) => preco.produto === id
		);
		setPrecos(precosProduto);
	}, [id]);

	const buscarNomeLoja = (idLoja) => {
		const lojasSalvas = JSON.parse(localStorage.getItem("lojas")) || [];
		const loja = lojasSalvas.find((loja) => loja.id === idLoja);
		return loja ? loja.nome : "";
	};

	const converterParaReal = (valorDolar, cotacaoDolar) => {
		const valorReal = valorDolar * cotacaoDolar;
		return valorReal;
	};

	const buscarCotacaoDolar = (idLoja) => {
		const lojasSalvas = JSON.parse(localStorage.getItem("lojas")) || [];
		const loja = lojasSalvas.find((loja) => loja.id === idLoja);
		return loja ? loja.cotacaoDolar : 0;
	};

	// Função para ordenar os itens
	const ordenarPreco = (criterio) => {
		const precosOrdenados = [...precos];
		if (criterio === "dolar") {
			precosOrdenados.sort((a, b) => a.valorDolar - b.valorDolar);
		} else if (criterio === "real") {
			precosOrdenados.sort((a, b) => {
				const cotacaoDolarA = buscarCotacaoDolar(a.loja);
				const cotacaoDolarB = buscarCotacaoDolar(b.loja);
				const valorRealA = converterParaReal(
					a.valorDolar,
					cotacaoDolarA
				);
				const valorRealB = converterParaReal(
					b.valorDolar,
					cotacaoDolarB
				);
				return valorRealA - valorRealB;
			});
		}
		setPrecos(precosOrdenados);
		setOrdenacao(criterio); // Atualizar o estado de ordenação
	};

	const handleExcluirPreco = (idPreco) => {
		const confirmacao = window.confirm(
			"Tem certeza que deseja excluir esse preço?"
		);
		if (confirmacao) {
			const precosAtualizados = precos.filter(
				(preco) => preco.id !== idPreco
			);
			setPrecos(precosAtualizados);
			// Atualizar o localStorage com os preços atualizados
			localStorage.setItem("precos", JSON.stringify(precosAtualizados));
		}
	};

	return (
		<div className="container mt-5">
			<h2>Preços do Produto - {nomeProduto}</h2>
			{/* Botões para ordenar */}
			<div className="btn-group mt-3" role="group">
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => ordenarPreco("dolar")}
				>
					Ordenar por Valor em Dólar
				</button>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => ordenarPreco("real")}
				>
					Ordenar por Valor em Real
				</button>
			</div>
			<table className="table table-striped mt-3">
				<thead>
					<tr>
						<th>Loja</th>
						<th>Preço em Dólar</th>
						<th>Preço em Real</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{precos.map((preco) => (
						<tr key={preco.id}>
							<td>{buscarNomeLoja(preco.loja)}</td>
							<td>${preco.valorDolar.toFixed(2)}</td>
							{/* Mostrar o valor convertido de dólar para real */}
							<td>
								R${" "}
								{converterParaReal(
									preco.valorDolar,
									buscarCotacaoDolar(preco.loja)
								).toFixed(2)}
							</td>
							<td>
								<button
									type="button"
									className="btn btn-danger"
									onClick={() => handleExcluirPreco(preco.id)}
								>
									Excluir
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PrecoProduto;
