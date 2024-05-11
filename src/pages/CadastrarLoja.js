import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CurrencyInput from "react-currency-masked-input";

const CadastrarLoja = () => {
	const history = useHistory();
	const [nome, setNome] = useState("");
	const [cotacaoDolar, setCotacaoDolar] = useState("");

	const handleNomeChange = (event) => {
		setNome(event.target.value);
	};

	const handleCotacaoDolarChange = (event, value) => {
		setCotacaoDolar(value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const novaLoja = {
			id: uuidv4(),
			nome: nome,
			cotacaoDolar: parseFloat(
				cotacaoDolar.replace("R$ ", "").replace(",", ".")
			),
		};
		let lojas = JSON.parse(localStorage.getItem("lojas")) || [];
		lojas.push(novaLoja);
		localStorage.setItem("lojas", JSON.stringify(lojas));
		console.log("Loja cadastrada:", novaLoja);
		setNome("");
		setCotacaoDolar("");
		history.push("/dashboard");
	};

	return (
		<div className="container mt-3">
			<h2>Cadastrar Loja</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="nome" className="form-label">
						Nome da Loja:
					</label>
					<input
						type="text"
						className="form-control"
						id="nome"
						value={nome}
						onChange={(event) => setNome(event.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="cotacaoDolar" className="form-label">
						Cotação do Dólar:
					</label>
					<CurrencyInput
						className="form-control"
						id="cotacaoDolar"
						value={cotacaoDolar}
						onChange={handleCotacaoDolarChange}
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

export default CadastrarLoja;
