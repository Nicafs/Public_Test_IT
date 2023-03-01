import * as React from "react";

import { Box, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import { HeaderMovies } from "./HeaderMovies";
import { MenuMovie } from "./MenuMovie";

export const BoxBarCustom = styled(Box)(() => ({
	"::-webkit-scrollbar": {
		width: "8px",
	},
	"::-webkit-scrollbar-track": {
		borderRadius: "5px",
		background: "#E9ECEF",
	},
	"::-webkit-scrollbar-thumb": {
		background: "#ADB5BD",
		borderRadius: "14px",
		height: "2px",
	},
	"::-webkit-scrollbar-thumb:hover": {
		background: "#CED4DA",
		maxHeight: "2px",
	},
}));

export const BoxBarCustomLarge = styled(Box)(() => ({
	"::-webkit-scrollbar": {
		width: "12px",
	},
	"::-webkit-scrollbar-track": {
		borderRadius: "5px",
		background: "#E9ECEF",
	},
	"::-webkit-scrollbar-thumb": {
		background: "#ADB5BD",
		borderRadius: "14px",
		height: "2px",
	},
	"::-webkit-scrollbar-thumb:hover": {
		background: "#CED4DA",
		maxHeight: "8px",
	},
}));

const drawerWidth = 180;

export const LayoutContainerMovie = ({ paths, children }) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<HeaderMovies handleDrawerToggle={handleDrawerToggle} />

			<Container
				maxWidth="xl"
				disableGutters
				sx={{
					mt: "58px !important",
					minHeight: "calc(100vh - 58px)",
					display: "flex",
					flexDirection: "column",
				}}
				style={{ margin: "0 auto" }}
			>
				<Grid id="container-menu" container sx={{ flexGrow: "1", flexWrap: "nowrap", display: { xs: "none", md: "flex" } }}>
					<BoxBarCustom
						data-testid="customMenu"
						sx={{
							width: drawerWidth,
							flexShrink: "0",
							borderRight: "1px solid #DEE2E6",
							background: "#FFF",
							height: "calc(100vh - 58px)",
							overflowY: "auto",
						}}
					>
						<Box component="nav">
							<MenuMovie mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} paths={paths} />
						</Box>
					</BoxBarCustom>

					<BoxBarCustomLarge
						sx={{
							flexGrow: "1",
							borderRight: "1px solid #DEE2E6",
							height: "calc(100vh - 58px)",
							overflow: "auto",
							position: "relative",
						}}
					>
						<Box component="main" sx={{ flexGrow: 1, p: 3, minWidth: `calc(100% - ${drawerWidth}px)` }}>
							{children}
						</Box>
					</BoxBarCustomLarge>
				</Grid>

				<Box sx={{ display: { xs: "block", md: "none" } }}>
					<Box component="nav" data-testid="customMenu">
						<MenuMovie mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} paths={paths} />
					</Box>

					<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
						{children}
					</Box>
				</Box>
			</Container>
		</Box>
	);
};
