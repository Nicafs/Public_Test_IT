import { AxiosResponse } from "axios";

import { MaxMinWinIntervalForProducersDTO, MoviesDTO, MoviesPerYearDTO, StudiosWithWinCountDTO, YearsWithMultipleWinnersDTO } from "~/dto";

import { HttpService } from "./config/http.service";

export type TGetMovies = {
	page: number;
	size: number;
	winner: boolean;
	year: number;
};

const getMovies = async ({ page, size, winner, year }: TGetMovies): Promise<AxiosResponse<MoviesDTO>> => {
	return HttpService.get(`movies`, {
		params: {
			page,
			size,
			winner,
			year,
		},
	});
};

const getYearsWinners = async (): Promise<AxiosResponse<YearsWithMultipleWinnersDTO>> => {
	return HttpService.get(`movies`, {
		params: {
			projection: "years-with-multiple-winners",
		},
	});
};

const getStudiosCount = async (): Promise<AxiosResponse<StudiosWithWinCountDTO>> => {
	return HttpService.get(`movies`, {
		params: {
			projection: "studios-with-win-count",
		},
	});
};

const getMaxMinIntervalProducers = async (): Promise<AxiosResponse<MaxMinWinIntervalForProducersDTO>> => {
	return HttpService.get(`movies`, {
		params: {
			projection: "max-min-win-interval-for-producers",
		},
	});
};

export type TGetMoviesPerYear = {
	winner?: boolean;
	year?: number;
};

const getMoviesPerYear = async ({ winner = false, year }: TGetMoviesPerYear): Promise<AxiosResponse<MoviesPerYearDTO[]>> => {
	return HttpService.get(`movies`, {
		params: {
			winner,
			year,
		},
	});
};

export const MovieService = {
	getMovies,
	getYearsWinners,
	getStudiosCount,
	getMaxMinIntervalProducers,
	getMoviesPerYear,
};
