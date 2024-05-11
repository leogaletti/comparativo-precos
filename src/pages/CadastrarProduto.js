import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CadastrarProduto = () => {
	const history = useHistory();
	const [nome, setNome] = useState("");

	const handleNomeChange = (event) => {
		setNome(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const novoProduto = {
			id: uuidv4(),
			nome: nome,
		};
		let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
		produtos.push(novoProduto);
		localStorage.setItem("produtos", JSON.stringify(produtos));
		console.log("Produto cadastrado:", novoProduto);
		setNome("");
		history.push("/dashboard");
	};

	return (
		<div className="container mt-5">
			<h2 className="mt-5">Cadastrar Produto</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="nome" className="form-label">
						Nome do Produto:
					</label>
					<input
						type="text"
						className="form-control"
						id="nome"
						value={nome}
						onChange={handleNomeChange}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Cadastrar
				</button>
			</form>
		</div>
	);
};

export default CadastrarProduto;
