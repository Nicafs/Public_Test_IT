import { Box, Typography } from "@mui/material";

import { EmptyData } from "~/assets";

export const EmptyState = () => {
	return (
		<Box sx={{ flex: "1 1 auto" }} display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="12px">
			<EmptyData />
			<Typography>No data found</Typography>
		</Box>
	);
};
