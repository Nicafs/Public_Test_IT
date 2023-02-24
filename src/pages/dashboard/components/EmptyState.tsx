import { Box, Typography } from "@mui/material";

export const EmptyState = () => {
	return (
		<Box sx={{ flex: "1 1 auto" }} display="flex" justifyContent="center" alignItems="center">
			<Typography variant="h4" gutterBottom>
				Nenhum dado foi encontrado!
			</Typography>
		</Box>
	);
};
