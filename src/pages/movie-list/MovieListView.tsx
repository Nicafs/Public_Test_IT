import { Backdrop, CircularProgress, FormControl, Grid, MenuItem, Pagination, Select, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

import { CardContentTitle, SearchByYear, TableContent, TTableContentHeaders } from "~/components";
import { MoviesContentDTO } from "~/dto";

import { TPagination } from "./MovieListContainer";

const StyledSelect = styled(Select)(({ theme }) => ({
	backgroundColor: "white",
	// width: "100%",
	height: "44px",
	color: theme.palette.common.black,
}));

export type TMovieListView = {
	listMovies: MoviesContentDTO[];
	loadingList: boolean;
	loadingPage: boolean;
	pagination: TPagination;
	winnerFilter: number;
	yearFilter: number;
	onChangePage: (page: number) => void;
	handleChangeYear: (value: number) => void;
	handleChangeWinner: (value: number) => void;
};

export const MovieListView = ({
	listMovies,
	loadingList,
	loadingPage,
	pagination,
	winnerFilter,
	yearFilter,
	onChangePage,
	handleChangeYear,
	handleChangeWinner,
}: TMovieListView) => {
	const filterYear = (): JSX.Element => {
		return <SearchByYear placeholder="Filter by year" onClickSearch={(value: number) => handleChangeYear(value)} defaultValue={yearFilter} />;
	};

	const filterWinner = () => {
		return (
			<FormControl sx={{ minWidth: "100%" }}>
				<StyledSelect value={winnerFilter} label="" onChange={(e) => handleChangeWinner(Number(e.target.value))} data-testid="selectWinner">
					<MenuItem data-testid="item-0" value={0}>
						Yes/No
					</MenuItem>
					<MenuItem data-testid="item-1" value={1}>
						Yes
					</MenuItem>
					<MenuItem data-testid="item-2" value={2}>
						No
					</MenuItem>
				</StyledSelect>
			</FormControl>
		);
	};

	const headers: TTableContentHeaders[] = [
		{ label: "ID", field: "id", width: "20%" },
		{ label: "Year", field: "year", width: "30%", filter: filterYear() },
		{ label: "Title", field: "title", width: "30%" },
		{
			label: "Winner?",
			field: "winner",
			width: "30%",
			render: (value) => {
				return value ? "Yes" : "No";
			},
			filter: filterWinner(),
		},
	];

	return (
		<CardContentTitle title="List movies">
			<>
				{loadingList && <Skeleton variant="rectangular" width={"100%"} height={100 + 53.2 * pagination.size} sx={{ borderRadius: "4px" }} />}

				{!loadingList && (
					<Grid container spacing={2}>
						<Grid item xs={12} sx={{ position: "relative" }}>
							<TableContent headers={headers} rows={listMovies} minWidth={700} />

							{loadingPage && (
								<Backdrop
									sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, position: "absolute", ml: 2, mt: 2, borderRadius: "4px" }}
									open={true}
								>
									<CircularProgress color="inherit" />
								</Backdrop>
							)}
						</Grid>

						{pagination.count > 1 && (
							<Grid item xs={12} justifyContent={"center"} alignItems="center">
								<Pagination
									data-testid="pagination"
									sx={{ display: "flex", justifyContent: "center" }}
									shape="rounded"
									count={pagination.count}
									page={pagination.page}
									onChange={(_, page: number) => onChangePage(page)}
									color="primary"
									showFirstButton
									showLastButton
								/>
							</Grid>
						)}
					</Grid>
				)}
			</>
		</CardContentTitle>
	);
};
