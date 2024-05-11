import React, { useState, useEffect } from "react";

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

	const handleInstall = () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === "accepted") {
					console.log("User accepted the A2HS prompt");
				} else {
					console.log("User dismissed the A2HS prompt");
				}
				deferredPrompt = null;
			});
		}
	};

	let deferredPrompt;

	window.addEventListener("beforeinstallprompt", (e) => {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e;
		// Update UI notify the user they can add to home screen
		//btnAdd.style.display = 'block';
	});

	return (
		<div className="container mt-5">
			<h2>Dashboard</h2>
			<div className="row mt-3">
				<div className="col-md-6">
					<h3>Produtos Cadastrados</h3>
					<ul className="list-group">
						{produtos.map((produto) => (
							<li key={produto.id} className="list-group-item">
								{produto.nome}
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
			<button className="btn btn-primary mt-3" onClick={handleInstall}>
				Instalar App
			</button>
		</div>
	);
};

export default Dashboard;
