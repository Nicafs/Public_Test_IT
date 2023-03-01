import { Box, Card, CardContent, Typography } from "@mui/material";

export type TCardContentTitle = {
	title: string;
	children: JSX.Element;
};

export const CardContentTitle = ({ title, children }: TCardContentTitle) => {
	return (
		<Card sx={{ height: "100%" }}>
			<CardContent sx={{ height: "calc(100% - 32px)", display: "flex", flexDirection: "column" }}>
				<Box display="flex" flexDirection="column" height="100%">
					<Typography role="heading" fontSize="22px" fontWeight="bold" sx={{ mb: 1 }}>
						{title}
					</Typography>

					<Box height="100%" flex="1 1 auto">
						{children}
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};
