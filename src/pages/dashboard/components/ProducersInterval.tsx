import { useCallback, useEffect, useState } from "react";

import { Card, CardContent, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { MovieService } from "~/services";

export const ProducersInterval = () => {
	const [listProducerInterval, setListProducerInterval] = useState<any>([]);
	const [loadingList, setLoadingList] = useState<boolean>(true);

	const getListProducerInterval = useCallback(() => {
		setLoadingList(true);

		MovieService.getAwards()
			.then(({ data }) => {
				setLoadingList(false);
				setListProducerInterval(data || []);
			})
			.catch(() => {
				setLoadingList(false);
			});
	}, []);

	useEffect(() => {
		getListProducerInterval();
	}, [getListProducerInterval]);

	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				{loadingList && <CircularProgress />}

				{!loadingList && (
					<>
						{(!listProducerInterval?.max || listProducerInterval?.max.length === 0) && <h3>Nenhum dado encontrado</h3>}

						{!!listProducerInterval?.max && listProducerInterval?.max.length > 0 && (
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Producer</TableCell>
											<TableCell>Interval</TableCell>
											<TableCell>Previous Year</TableCell>
											<TableCell>Following Year</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{listProducerInterval.max.map((row) => (
											<TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
												<TableCell>{row.producer}</TableCell>
												<TableCell>{row.interval}</TableCell>
												<TableCell>{row.previousWin}</TableCell>
												<TableCell>{row.followingWin}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						)}

						{(!listProducerInterval?.min || listProducerInterval?.min.length === 0) && <h3>Nenhum dado encontrado</h3>}

						{!!listProducerInterval?.min && listProducerInterval?.min.length > 0 && (
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Producer</TableCell>
											<TableCell>Interval</TableCell>
											<TableCell>Previous Year</TableCell>
											<TableCell>Following Year</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{listProducerInterval.min.map((row) => (
											<TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
												<TableCell>{row.producer}</TableCell>
												<TableCell>{row.interval}</TableCell>
												<TableCell>{row.previousWin}</TableCell>
												<TableCell>{row.followingWin}</TableCell>
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
