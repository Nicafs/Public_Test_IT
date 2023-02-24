import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

export type TMovieListView = {
	listMovies: any;
	loadingList: boolean;
	pagination: any;
	onChangePage: (page: number) => void;
	onChangeRowsPerPage: (rowsPerPage: number) => void;
};

export const MovieListView = ({ listMovies, loadingList, pagination, onChangePage, onChangeRowsPerPage }: TMovieListView) => {
	return (
		<>
			{loadingList && <CircularProgress />}

			{!loadingList && (
				<>
					{(!listMovies || listMovies.length === 0) && <h3>Nenhum dado encontrado</h3>}

					{!!listMovies && listMovies.length > 0 && (
						<Paper sx={{ width: "100%", overflow: "hidden" }}>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>ID</TableCell>
											<TableCell>Year</TableCell>
											<TableCell>Title</TableCell>
											<TableCell>Winner?</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{listMovies.map((row) => (
											<TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
												<TableCell component="th" scope="row">
													{row.id}
												</TableCell>
												<TableCell>{row.year}</TableCell>
												<TableCell>{row.title}</TableCell>
												<TableCell>{row.winner}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>

							<TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								component="div"
								count={pagination.count}
								rowsPerPage={pagination.limit}
								page={pagination.page}
								onPageChange={(_, page: number) => onChangePage(page)}
								onRowsPerPageChange={(e) => onChangeRowsPerPage(Number(e.target.value))}
							/>
						</Paper>
					)}
				</>
			)}
		</>
	);
};
