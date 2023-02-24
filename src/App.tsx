import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";

import { RouterConfig } from "~/navigation";
import { customTheme } from "~/styles";

import "./App.css";

const App = () => {
	return (
		<ThemeProvider theme={customTheme({ darkMode: false })}>
			<BrowserRouter>
				<RouterConfig />
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
