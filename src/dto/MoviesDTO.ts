export type MoviesContentDTO = {
	id: number;
	producers: string[];
	studios: string[];
	title: string;
	winner: boolean;
	year: number;
};

export type MoviesSortDTO = {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
};

export type MoviesPageableDTO = {
	offset: number;
	pageNumber: number;
	pageSize: number;
	paged: boolean;
	sort: MoviesSortDTO;
	unpaged: boolean;
};

export type MoviesDTO = {
	content: MoviesContentDTO[];
	empty: boolean;
	first: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	pageable: MoviesPageableDTO;
	size: number;
	sort: MoviesSortDTO;
	totalElements: number;
	totalPages: number;
};
