import { useCallback, useEffect, useState } from "react";

import { Card, CardContent, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { MovieService } from "~/services";

export const ListWinnersYears = () => {
	const [listWinnersYears, setListWinnersYears] = useState<any>([]);
	const [loadingList, setLoadingList] = useState<boolean>(true);

	const getListWinnersYears = useCallback(() => {
		setLoadingList(true);

		MovieService.getAwardsMovies()
			.then(({ data }) => {
				setLoadingList(false);
				setListWinnersYears(data?.years || []);
			})
			.catch(() => {
				setLoadingList(false);
			});
	}, []);

	useEffect(() => {
		getListWinnersYears();
	}, [getListWinnersYears]);

	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				{loadingList && <CircularProgress />}

				{!loadingList && (
					<>
						{(!listWinnersYears || listWinnersYears.length === 0) && <h3>Nenhum dado encontrado</h3>}

						{!!listWinnersYears && listWinnersYears.length > 0 && (
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Year</TableCell>
											<TableCell align="right">Win Count</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{listWinnersYears.map((row) => (
											<TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
												<TableCell>{row.year}</TableCell>
												<TableCell align="right">{row.winnerCount}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						)}
					</>
				)}
			</CardContent>
		</Card>
	);
};
