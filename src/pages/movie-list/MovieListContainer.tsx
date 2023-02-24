import { useCallback, useEffect, useState } from "react";

import { MovieService } from "~/services";

import { MovieListView } from "./MovieListView";

export const MovieListContainer = () => {
	const [listMovies, setListMovies] = useState<any>([]);
	const [loadingList, setLoadingList] = useState<boolean>(true);

	const [onlyWinner, setOnlyWinner] = useState<boolean>(false);
	const [movieWinner, setMovieWinner] = useState<number>();

	const [pagination, setPagination] = useState<{
		limit: number;
		page: number;
		count: number;
	}>({ limit: 5, page: 0, count: 0 });

	const getListMovies = useCallback(() => {
		setLoadingList(true);

		const payload = {
			page: pagination?.page || 0,
			size: pagination?.limit || 5,
			winner: onlyWinner,
			year: movieWinner,
		};

		MovieService.getMovies(payload)
			.then(({ data }) => {
				const { content = [], totalElements = 0 } = data || {};

				setLoadingList(false);
				setListMovies(content || []);

				pagination.count = totalElements;
				setPagination(pagination);
			})
			.catch(() => {
				setLoadingList(false);
			});
	}, [movieWinner, onlyWinner, pagination]);

	const onChangePage = (page: number) => {
		const newPagination = { ...pagination };
		newPagination.page = page;
		setPagination(newPagination);
	};

	const onChangeRowsPerPage = (rowsPerPage: number) => {
		const newPagination = { ...pagination };
		newPagination.limit = rowsPerPage;
		newPagination.page = 0;
		setPagination(newPagination);
	};

	useEffect(() => {
		getListMovies();
	}, [getListMovies]);

	return (
		<MovieListView
			loadingList={loadingList}
			listMovies={listMovies}
			onChangePage={onChangePage}
			onChangeRowsPerPage={onChangeRowsPerPage}
			pagination={pagination}
		/>
	);
};
