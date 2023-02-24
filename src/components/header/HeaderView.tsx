import { Toolbar, AppBar, Typography, Box, Button, Menu, MenuItem, IconButton, Container } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { Logo } from "~/assets";
import { getVersion } from "~/utils";

import { IMenuItens } from "./HeaderContainer";

export type THeaderView = {
	menuItens: IMenuItens[];
	anchorElNav: null | HTMLElement;
	handleClickMenuItem: (path: string) => void;
	handleOpenNavMenu: (event: null | React.MouseEvent<HTMLElement>) => void;
	isDev: boolean;
	isHomolog: boolean;
};

export const HeaderView = ({ menuItens, anchorElNav, handleClickMenuItem, handleOpenNavMenu, isDev, isHomolog }: THeaderView): JSX.Element => (
	<AppBar position="fixed">
		<Box display="flex" justifyContent="center">
			<Container maxWidth="xl" sx={{ mx: 4, my: 0 }}>
				<Toolbar disableGutters sx={{ minHeight: "58px" }} variant="dense">
					{/* PARA MOBILE APENAS   */}
					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="menu bar"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={() => handleOpenNavMenu(null)}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{menuItens.map(({ name, path }) => (
								<MenuItem key={name} onClick={() => handleClickMenuItem(path)}>
									<Typography textAlign="center">{name}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<Box sx={{ display: { xs: "none", md: "flex" }, mr: 4 }}>
						<img src={Logo} className="App-logo" alt="logo" style={{ width: "40px", height: "40px" }} />
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{menuItens.map(({ name, path }) => (
							<Button
								variant="text"
								key={name}
								onClick={() => handleClickMenuItem(path)}
								sx={{
									display: "block",
									"&:hover": {
										background: "#F1F3F5",
									},
								}}
							>
								{name}
							</Button>
						))}
					</Box>

					{isDev && (
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							<Typography fontSize={"25px"} color="red">
								Development
							</Typography>
						</Box>
					)}

					{isHomolog && (
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							<Typography fontSize={"25px"} color="red">
								Staging
							</Typography>
						</Box>
					)}

					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						<Typography fontSize={"25px"} color="red">
							{getVersion()}
						</Typography>
					</Box>
				</Toolbar>
			</Container>
		</Box>
	</AppBar>
);
