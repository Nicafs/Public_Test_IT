import { Card, CardContent, Typography } from "@mui/material";

export type TCardContentTitle = {
	title: string;
	children: JSX.Element;
};

export const CardContentTitle = ({ title, children }: TCardContentTitle) => {
	return (
		<Card sx={{ height: "100%" }}>
			<CardContent sx={{ height: "calc(100% - 32px)", display: "flex", flexDirection: "column" }}>
				<Typography fontSize="22px" fontWeight="bold" sx={{ mb: 1 }}>
					{title}
				</Typography>

				{children}
			</CardContent>
		</Card>
	);
};
