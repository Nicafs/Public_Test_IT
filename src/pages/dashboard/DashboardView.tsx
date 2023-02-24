import { Grid } from "@mui/material";

import { ListWinnersYears, MoviesWinners, ProducersInterval, TopStudios } from "./components";

export const DashboardView = () => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={6}>
				<ListWinnersYears />
			</Grid>
			<Grid item xs={6}>
				<MoviesWinners />
			</Grid>
			<Grid item xs={6}>
				<ProducersInterval />
			</Grid>
			<Grid item xs={6}>
				<TopStudios />
			</Grid>
		</Grid>
	);
};
