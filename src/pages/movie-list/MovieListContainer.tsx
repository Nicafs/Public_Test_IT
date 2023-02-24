import { useCallback, useEffect, useState } from "react";

import { MoviesContentDTO } from "~/dto";
import { MovieService } from "~/services";

import { MovieListView } from "./MovieListView";

export type TPagination = {
	size: number;
	page: number;
	count: number;
};

export const MovieListContainer = () => {
	const [listMovies, setListMovies] = useState<MoviesContentDTO[]>([]);
	const [loadingList, setLoadingList] = useState<boolean>(true);
	const [loadingPage, setLoadingPage] = useState<boolean>(true);

	const [winnerFilter, setWinnerFilter] = useState<number>(0);
	const [yearFilter, setYearFilter] = useState<number | undefined>(undefined);

	const [pagination, setPagination] = useState<TPagination>({ size: 15, page: 0, count: 0 });

	const getListMovies = useCallback(() => {
		const payload = {
			page: pagination?.page || 0,
			size: pagination?.size || 15,
			...(!!winnerFilter && { winner: winnerFilter === 1 }),
			year: yearFilter,
		};

		MovieService.getMovies(payload)
			.then(({ data }) => {
				const { content = [], totalPages = 1 } = data || {};

				setLoadingList(false);
				setLoadingPage(false);
				setListMovies(content || []);

				pagination.count = totalPages - 1;
				setPagination(pagination);
			})
			.catch(() => {
				setLoadingList(false);
				setLoadingPage(false);
			});
	}, [yearFilter, winnerFilter, pagination]);

	const handleChangeYear = (value: number) => {
		if (value !== yearFilter) {
			setLoadingList(true);
			setYearFilter(value);
		}
	};

	const handleChangeWinner = (value: number) => {
		if (value !== winnerFilter) {
			setLoadingList(true);
			setWinnerFilter(value);
		}
	};

	const onChangePage = (page: number) => {
		const newPagination = { ...pagination };
		newPagination.page = page;
		setLoadingPage(true);
		setPagination(newPagination);
	};

	useEffect(() => {
		getListMovies();
	}, [getListMovies]);

	return (
		<MovieListView
			loadingList={loadingList}
			loadingPage={loadingPage}
			listMovies={listMovies}
			onChangePage={onChangePage}
			pagination={pagination}
			handleChangeYear={handleChangeYear}
			handleChangeWinner={handleChangeWinner}
			winnerFilter={winnerFilter}
		/>
	);
};
