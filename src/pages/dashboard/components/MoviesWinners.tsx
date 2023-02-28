import { useCallback, useEffect, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import { SearchByYear, TableContent, TTableContentHeaders, CardContentTitle } from "~/components";
import { MoviesPerYearDTO } from "~/dto";
import { MovieService } from "~/services";

import { EmptyState } from "./EmptyState";

export const MoviesWinners = () => {
	const [listWinnersYears, setListWinnersYears] = useState<MoviesPerYearDTO[]>([]);
	const [loadingList, setLoadingList] = useState<boolean>(true);

	const [yearSelect, setYearSelect] = useState<number>(new Date().getFullYear());

	const headers: TTableContentHeaders[] = [
		{ label: "ID", field: "id" },
		{ label: "Year", field: "year" },
		{ label: "Title", field: "title" },
	];

	const getListWinnersYears = useCallback(() => {
		setLoadingList(true);

		MovieService.getMoviesPerYear({ year: yearSelect, winner: true })
			.then(({ data }) => {
				setLoadingList(false);
				setListWinnersYears(data || []);
			})
			.catch(() => {
				setLoadingList(false);
			});
	}, [yearSelect]);

	const handleClickSearch = (year: number) => {
		setYearSelect(year);
	};

	useEffect(() => {
		getListWinnersYears();
	}, [getListWinnersYears]);

	return (
		<CardContentTitle title="List movie winners by year">
			<Box display="flex" flexDirection="column" height="100%" gap="16px">
				<Box>
					<SearchByYear
						placeholder="Search by year"
						onClickSearch={(value: number) => handleClickSearch(value)}
						defaultValue={new Date().getFullYear()}
					/>
				</Box>

				<>
					{loadingList && (
						<Box flex="1 1 auto" display="flex" justifyContent="center" alignItems="center" minHeight="200px">
							<CircularProgress />
						</Box>
					)}

					{!loadingList && (
						<>
							{(!listWinnersYears || listWinnersYears.length === 0) && (
								<Box mt={2}>
									<EmptyState />
								</Box>
							)}

							{!!listWinnersYears && listWinnersYears.length > 0 && <TableContent headers={headers} rows={listWinnersYears} />}
						</>
					)}
				</>
			</Box>
		</CardContentTitle>
	);
};
