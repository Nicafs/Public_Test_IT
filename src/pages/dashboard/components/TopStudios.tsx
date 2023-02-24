import { useCallback, useEffect, useState } from "react";

import { Card, CardContent, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { MovieService } from "~/services";

export const TopStudios = () => {
	const [listStudios, setListStudios] = useState<any>([]);
	const [loadingList, setLoadingList] = useState<boolean>(true);

	const getListStudios = useCallback(() => {
		setLoadingList(true);

		MovieService.getStudios()
			.then(({ data }) => {
				setLoadingList(false);
				setListStudios(data?.studios || []);
			})
			.catch(() => {
				setLoadingList(false);
			});
	}, []);

	useEffect(() => {
		getListStudios();
	}, [getListStudios]);

	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				{loadingList && <CircularProgress />}

				{!loadingList && (
					<>
						{(!listStudios || listStudios.length === 0) && <h3>Nenhum dado encontrado</h3>}

						{!!listStudios && listStudios.length > 0 && (
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell align="right">Win Count</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{listStudios.map((row) => (
											<TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
												<TableCell>{row.name}</TableCell>
												<TableCell align="right">{row.winCount}</TableCell>
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
