import { Box, CircularProgress } from "@mui/material";

export const Loading = (): JSX.Element => {
	return (
		<Box
			sx={{
				position: "relative",
				height: "100vh",
			}}
		>
			<CircularProgress
				data-testid="circularLoading"
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			/>
		</Box>
	);
};
