import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import { styled } from "@mui/material/styles";

import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";

import { TPath } from "../../CONSTANTS";

const StyledMenuItem = styled(MenuItem)(() => ({
	padding: "4px 8px",

	"&:hover": {
		backgroundColor: "transparent",
		".MuiTypography-root": {
			color: "#4263EB",
		},
	},
	"&.Mui-selected, &.Mui-selected:hover": {
		background: "transparent",
		borderLeft: `4px ${"#4263EB"} solid`,
		padding: "4px 8px 4px 4px",

		".MuiTypography-root": {
			color: "#4263EB",
		},
	},
}));

const MenuItemDesktop = ({ label, path, handleMenuItemClick, index }) => {
	const [isHover, setIsHover] = useState<boolean>(false);

	const isSelected = path.includes(location?.pathname);

	return (
		<StyledMenuItem
			key={label}
			data-testid={label.replace(" ", "_")}
			selected={isSelected || isHover}
			onClick={() => handleMenuItemClick(path)}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<ListItemButton>
				<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
				<ListItemText primary={label} />
			</ListItemButton>
		</StyledMenuItem>
	);
};

export type TMenuMovie = {
	mobileOpen: boolean;
	drawerWidth: number;
	handleDrawerToggle: () => void;
	paths: TPath[];
};

export const MenuMovie = ({ paths, mobileOpen, drawerWidth, handleDrawerToggle }: TMenuMovie) => {
	const navigate = useNavigate();

	const container = window?.document?.body;

	const handleMenuItemClick = (route: string) => {
		navigate(route);
	};

	const menuDesktop = (
		<List>
			{paths.map((path, index) => (
				<MenuItemDesktop key={path.label} label={path.label} path={path.path} index={index} handleMenuItemClick={handleMenuItemClick} />
			))}
		</List>
	);

	const menuMobile = (
		<List sx={{ py: 7 }}>
			{paths.map((path, index) => (
				<MenuItemDesktop
					key={path.label}
					label={path.label}
					path={path.path}
					index={index}
					handleMenuItemClick={(route) => {
						handleDrawerToggle();
						handleMenuItemClick(route);
					}}
				/>
			))}
		</List>
	);

	return (
		<>
			<Drawer
				container={container}
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: "block", md: "none" },
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
				}}
			>
				{menuMobile}
			</Drawer>

			<Box
				sx={{
					display: { xs: "none", md: "block" },
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
				}}
			>
				<MenuList sx={{ padding: "0px" }}>{menuDesktop}</MenuList>
			</Box>
		</>
	);
};
