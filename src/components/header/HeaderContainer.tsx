import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { HeaderView } from "./HeaderView";

export type IMenuItens = {
	name: string;
	path: string;
};

const menuItens: IMenuItens[] = [
	{
		name: "Clientes",
		path: "/clientes",
	},
	{
		name: "Pedidos",
		path: "/pedidos",
	},
	{
		name: "Consultas",
		path: "/consultas",
	},
];

export const HeaderContainer = () => {
	const navigate = useNavigate();

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleClickMenuItem = (path: string) => {
		navigate(path);
	};

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement> | null) => {
		if (event) setAnchorElNav(event.currentTarget);
		else setAnchorElNav(null);
	};

	const isDev = process.env.REACT_APP_ENVIRONMENT === "development";
	const isHomolog = process.env.REACT_APP_ENVIRONMENT === "staging";

	return (
		<HeaderView
			menuItens={menuItens}
			handleClickMenuItem={handleClickMenuItem}
			anchorElNav={anchorElNav}
			handleOpenNavMenu={handleOpenNavMenu}
			isHomolog={isHomolog}
			isDev={isDev}
		/>
	);
};
