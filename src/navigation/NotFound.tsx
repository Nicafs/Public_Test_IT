import { Typography, Button } from "@mui/material";

export const NotFound = () => (
	<div>
		<Typography variant="h2">404: Página não Encontrada!</Typography>

		<Button variant="contained" color="primary" href="/">
			Ir para página inicial
		</Button>
	</div>
);
