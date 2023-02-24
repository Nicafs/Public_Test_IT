import { HttpService } from "./config/http.service";

export type TGetMovies = {
	page: number;
	size: number;
	winner: boolean;
	year: number;
};

const getMovies = async ({ page, size, winner, year }: TGetMovies): Promise<any> => {
	return HttpService.get(`movies`, {
		params: {
			page,
			size,
			winner,
			year,
		},
	});
};

const getAwardsMovies = async (): Promise<any> => {
	return HttpService.get(`movies`, {
		params: {
			projection: "years-with-multiple-winners",
		},
	});
};

const getStudios = async (): Promise<any> => {
	return HttpService.get(`movies`, {
		params: {
			projection: "studios-with-win-count",
		},
	});
};

const getAwards = async (): Promise<any> => {
	return HttpService.get(`movies`, {
		params: {
			projection: "max-min-win-interval-for-producers",
		},
	});
};

export type TGetMoviesPerYear = {
	winner: number;
	year: number;
};

const getMoviesPerYear = async ({ winner, year }: TGetMoviesPerYear): Promise<any> => {
	return HttpService.get(`movies`, {
		params: {
			winner,
			year,
		},
	});
};

export const MovieService = {
	getMovies,
	getMoviesPerYear,
	getAwardsMovies,
	getAwards,
	getStudios,
};
