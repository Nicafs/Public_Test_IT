import { Typography, Button } from "@mui/material";

export const NotFound = () => (
	<div>
		<Typography variant="h2">404: Página não Encontrada!</Typography>

		<Button type="button" variant="contained" color="primary" href="/">
			Ir para página inicial
		</Button>
	</div>
);
