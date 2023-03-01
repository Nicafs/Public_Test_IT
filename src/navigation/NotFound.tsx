import { Typography, Button } from "@mui/material";

export const NotFound = () => (
	<div>
		<Typography variant="h2">404: Page Not Found!</Typography>

		<Button type="button" variant="contained" color="primary" href="/">
			Go to home
		</Button>
	</div>
);
