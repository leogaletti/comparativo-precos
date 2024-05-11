import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PrecoProduto = () => {
	const [precos, setPrecos] = useState([]);
	const [ordenacao, setOrdenacao] = useState("asc"); // Estado para controlar a ordenação
	const { id } = useParams();
	const [nomeProduto, setNomeProduto] = useState(""); // Estado para armazenar o nome do produto

	useEffect(() => {
		const precosCadastrados =
			JSON.parse(localStorage.getItem("precos")) || [];
		const precosProduto = precosCadastrados.filter(
			(preco) => preco.produto === id
		);
		setPrecos(precosProduto);

		const produtosSalvos =
			JSON.parse(localStorage.getItem("produtos")) || [];
		const produto = produtosSalvos.find((produto) => produto.id === id);
		if (produto) {
			setNomeProduto(produto.nome);
		}
	}, [id]);

	const buscarNomeLoja = (idLoja) => {
		const lojasSalvas = JSON.parse(localStorage.getItem("lojas")) || [];
		const loja = lojasSalvas.find((loja) => loja.id === idLoja);
		return loja ? loja.nome : "";
	};

	const converterParaReal = (valorDolar, cotacaoDolar) => {
		const valorReal = valorDolar * cotacaoDolar;
		return `R$ ${valorReal.toFixed(2)}`;
	};

	const buscarCotacaoDolar = (idLoja) => {
		const lojasSalvas = JSON.parse(localStorage.getItem("lojas")) || [];
		const loja = lojasSalvas.find((loja) => loja.id === idLoja);
		return loja ? loja.cotacaoDolar : 0;
	};

	// Função para ordenar os preços
	const handleOrdenarPrecos = () => {
		const precosOrdenados = [...precos];
		if (ordenacao === "asc") {
			precosOrdenados.sort((a, b) => a.valorDolar - b.valorDolar);
			setOrdenacao("desc");
		} else {
			precosOrdenados.sort((a, b) => b.valorDolar - a.valorDolar);
			setOrdenacao("asc");
		}
		setPrecos(precosOrdenados);
	};

	return (
		<div className="container mt-5">
			{/* Nome do produto no topo da página */}
			<h2 className="mb-4">Preços do Produto - {nomeProduto}</h2>
			{/* Botão de ordenação */}
			<button
				className="btn btn-primary mb-3"
				onClick={handleOrdenarPrecos}
			>
				Ordenar Preços {ordenacao === "asc" ? "↓" : "↑"}
			</button>
			{/* Tabela de preços */}
			<table className="table">
				<thead>
					<tr>
						<th>Loja</th>
						<th>Preço em Dólar</th>
						<th>Preço em Real</th>
					</tr>
				</thead>
				<tbody>
					{precos.map((preco) => (
						<tr key={preco.id}>
							<td>{buscarNomeLoja(preco.loja)}</td>
							<td>${preco.valorDolar.toFixed(2)}</td>
							<td>
								{converterParaReal(
									preco.valorDolar,
									buscarCotacaoDolar(preco.loja)
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PrecoProduto;
