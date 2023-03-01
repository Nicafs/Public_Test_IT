import { useCallback, useEffect, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import { TableContent, TTableContentHeaders, CardContentTitle } from "~/components";
import { YearsWithMultipleWinnersItemDTO } from "~/dto";
import { MovieService } from "~/services";

import { EmptyState } from "./EmptyState";

export const ListWinnersYears = () => {
	const [listWinnersYears, setListWinnersYears] = useState<YearsWithMultipleWinnersItemDTO[]>([]);
	const [loadingList, setLoadingList] = useState<boolean>(true);

	const headers: TTableContentHeaders[] = [
		{ label: "Year", field: "year" },
		{ label: "Win Count", field: "winnerCount" },
	];

	const getListWinnersYears = useCallback(() => {
		setLoadingList(true);

		MovieService.getYearsWinners()
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
		<CardContentTitle title="List years with multiple winners">
			<>
				{loadingList && (
					<Box display="flex" justifyContent="center" alignItems="center" height="100%">
						<CircularProgress />
					</Box>
				)}

				{!loadingList && (
					<>
						{(!listWinnersYears || listWinnersYears.length === 0) && <EmptyState />}

						{!!listWinnersYears && listWinnersYears.length > 0 && <TableContent id="table-winners-years" headers={headers} rows={listWinnersYears} />}
					</>
				)}
			</>
		</CardContentTitle>
	);
};
