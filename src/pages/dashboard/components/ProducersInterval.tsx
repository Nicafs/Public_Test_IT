import { useCallback, useEffect, useState } from "react";

import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import { TableContent, TTableContentHeaders, CardContentTitle } from "~/components";
import { MaxMinWinIntervalForProducersDTO } from "~/dto";
import { MovieService } from "~/services";

import { EmptyState } from "./EmptyState";

export const ProducersInterval = () => {
	const [listProducerInterval, setListProducerInterval] = useState<MaxMinWinIntervalForProducersDTO>({ max: [], min: [] });
	const [loadingList, setLoadingList] = useState<boolean>(true);

	const headersMax: TTableContentHeaders[] = [
		{ label: "Producer", field: "producer", width: "30%" },
		{ label: "Interval", field: "interval", width: "20%" },
		{ label: "Previous Year", field: "previousWin", width: "20%" },
		{ label: "Following Year", field: "followingWin", width: "20%" },
	];

	const headersMin: TTableContentHeaders[] = [
		{ label: "Producer", field: "producer", width: "30%" },
		{ label: "Interval", field: "interval", width: "20%" },
		{ label: "Previous Year", field: "previousWin", width: "20%" },
		{ label: "Following Year", field: "followingWin", width: "20%" },
	];

	const getListProducerInterval = useCallback(() => {
		setLoadingList(true);

		MovieService.getMaxMinIntervalProducers()
			.then(({ data }) => {
				setLoadingList(false);
				setListProducerInterval(data || { max: [], min: [] });
			})
			.catch(() => {
				setLoadingList(false);
			});
	}, []);

	useEffect(() => {
		getListProducerInterval();
	}, [getListProducerInterval]);

	return (
		<CardContentTitle title="Producers with longest and shortest interval between wins">
			<>
				{loadingList && <CircularProgress />}

				{!loadingList && (
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Box>
								<Typography fontSize="18px" sx={{ mb: 1 }}>
									Maximum
								</Typography>
							</Box>

							{(!listProducerInterval?.max || listProducerInterval?.max.length === 0) && <EmptyState />}

							{!!listProducerInterval?.max && listProducerInterval?.max.length > 0 && (
								<TableContent headers={headersMax} rows={listProducerInterval?.max} />
							)}
						</Grid>

						<Grid item xs={12}>
							<Box>
								<Typography fontSize="18px" sx={{ mb: 1 }}>
									Minimum
								</Typography>
							</Box>

							{(!listProducerInterval?.min || listProducerInterval?.min.length === 0) && <h3>Nenhum dado encontrado</h3>}

							{!!listProducerInterval?.min && listProducerInterval?.min.length > 0 && (
								<TableContent headers={headersMin} rows={listProducerInterval?.min} />
							)}
						</Grid>
					</Grid>
				)}
			</>
		</CardContentTitle>
	);
};
