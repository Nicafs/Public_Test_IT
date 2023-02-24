import { createTheme } from "@mui/material/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const customTheme = ({ darkMode }: { darkMode: boolean }) =>
	createTheme({
		palette: {
			mode: darkMode ? "dark" : "light",
			...(darkMode
				? {
						primary: {
							main: "#040f3d",
						},
						secondary: {
							main: "#757575",
						},
				  }
				: {
						primary: {
							main: "#212529",
						},
						secondary: {
							main: "#F8F9FA",
						},
				  }),
		},
	});
