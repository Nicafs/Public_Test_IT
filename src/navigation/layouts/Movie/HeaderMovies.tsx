import { Toolbar, AppBar, Typography, Box, IconButton, Container } from "@mui/material";
import { green, red } from "@mui/material/colors";

import MenuIcon from "@mui/icons-material/Menu";

import { Logo } from "~/assets";
import { getVersion } from "~/utils";

export type THeaderView = {
	handleDrawerToggle: () => void;
};

export const HeaderMovies = ({ handleDrawerToggle }: THeaderView): JSX.Element => {
	return (
		<AppBar position="fixed">
			<Box display="flex" justifyContent="center" sx={{ backgroundColor: "#343A40" }}>
				<Container maxWidth="xl" disableGutters>
					<Toolbar disableGutters sx={{ minHeight: "58px", px: { xs: 2, md: 0 } }} variant="dense">
						{/* PARA MOBILE APENAS   */}
						<Box display="flex" justifyContent="space-between" sx={{ flexGrow: 1 }}>
							<Box display="flex">
								<Box sx={{ display: { xs: "flex", md: "none" } }}>
									<IconButton
										type="button"
										color="inherit"
										aria-label="open drawer"
										edge="start"
										onClick={handleDrawerToggle}
										sx={{ display: { xs: "flex", md: "none" } }}
									>
										<MenuIcon />
									</IconButton>
								</Box>

								<img src={Logo} className="App-logo" alt="logo" style={{ width: "40px", height: "40px" }} />

								<Box display="flex" justifyContent="center" alignItems={"center"}>
									<Typography variant={"h4"} sx={{ fontSize: { xs: "20px", md: "30px" } }}>
										Frontend React Test
									</Typography>
								</Box>
							</Box>

							{(process.env.REACT_APP_ENVIRONMENT === "development" || process.env.REACT_APP_ENVIRONMENT === "staging") && (
								<Box display="flex" justifyContent="center" sx={{ display: { xs: "none", md: "block" } }}>
									<Typography fontSize={"25px"} color={red[500]}>
										{process.env.REACT_APP_ENVIRONMENT === "development" ? "Development" : "Staging"}
									</Typography>
								</Box>
							)}

							<Box display="flex" justifyContent="center" sx={{ display: { xs: "none", md: "block" } }}>
								<Typography fontSize={"25px"} color={green[500]}>
									{getVersion()}
								</Typography>
							</Box>
						</Box>
					</Toolbar>
				</Container>
			</Box>
		</AppBar>
	);
};
