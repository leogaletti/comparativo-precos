import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CadastrarPreco = () => {
	const [lojas, setLojas] = useState([]);
	const [produtos, setProdutos] = useState([]);
	const [lojaSelecionada, setLojaSelecionada] = useState("");
	const [produtoSelecionado, setProdutoSelecionado] = useState("");
	const [valorDolar, setValorDolar] = useState("");
	const history = useHistory();

	useEffect(() => {
		const lojasSalvas = JSON.parse(localStorage.getItem("lojas")) || [];
		setLojas(lojasSalvas);
		const produtosSalvos =
			JSON.parse(localStorage.getItem("produtos")) || [];
		setProdutos(produtosSalvos);
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const novoPreco = {
			id: uuidv4(),
			loja: lojaSelecionada,
			produto: produtoSelecionado,
			valorDolar: parseFloat(valorDolar),
		};
		const precosCadastrados =
			JSON.parse(localStorage.getItem("precos")) || [];
		localStorage.setItem(
			"precos",
			JSON.stringify([...precosCadastrados, novoPreco])
		);
		console.log("Novo preço cadastrado:", novoPreco);
		setLojaSelecionada("");
		setProdutoSelecionado("");
		setValorDolar("");
		// Redirecionar para o dashboard após o cadastro
		history.push("/dashboard");
	};

	return (
		<div className="container mt-5">
			<h2>Cadastrar Preço</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="loja" className="form-label">
						Loja:
					</label>
					<select
						id="loja"
						className="form-select"
						value={lojaSelecionada}
						onChange={(event) =>
							setLojaSelecionada(event.target.value)
						}
						required
					>
						<option value="">Selecione uma loja</option>
						{lojas.map((loja) => (
							<option key={loja.id} value={loja.id}>
								{loja.nome}
							</option>
						))}
					</select>
				</div>
				<div className="mb-3">
					<label htmlFor="produto" className="form-label">
						Produto:
					</label>
					<select
						id="produto"
						className="form-select"
						value={produtoSelecionado}
						onChange={(event) =>
							setProdutoSelecionado(event.target.value)
						}
						required
					>
						<option value="">Selecione um produto</option>
						{produtos.map((produto) => (
							<option key={produto.id} value={produto.id}>
								{produto.nome}
							</option>
						))}
					</select>
				</div>
				<div className="mb-3">
					<label htmlFor="valorDolar" className="form-label">
						Valor em Dólar:
					</label>
					<input
						type="number"
						id="valorDolar"
						className="form-control"
						value={valorDolar}
						onChange={(event) => setValorDolar(event.target.value)}
						step="0.01"
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Cadastrar
				</button>
			</form>
		</div>
	);
};

export default CadastrarPreco;
