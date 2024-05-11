import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import CadastrarLoja from "../pages/CadastrarLoja";
import CadastrarProduto from "../pages/CadastrarProduto";
import CadastrarPreco from "../pages/CadastrarPreco";
import Dashboard from "../pages/Dashboard";
import Menu from "./Menu";
import ListarProdutos from "../pages/ListarProdutos";
import PrecoProduto from "../pages/PrecoProduto";

const AppRouter = () => {
	return (
		<Router>
			<Menu />
			<Switch>
				<Route
					exact
					path="/"
					render={() => <Redirect to="/dashboard" />}
				/>
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/cadastrar-loja" component={CadastrarLoja} />
				<Route path="/cadastrar-produto" component={CadastrarProduto} />
				<Route path="/cadastrar-preco" component={CadastrarPreco} />
				<Route path="/listar-produtos" component={ListarProdutos} />
				<Route path="/preco-produto/:id" component={PrecoProduto} />
			</Switch>
		</Router>
	);
};

export default AppRouter;
