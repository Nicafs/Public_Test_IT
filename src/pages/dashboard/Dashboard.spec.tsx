import axios from "axios";

import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";

import { MovieService } from "../../services/movies";
import { ListWinnersYears, MoviesWinners, ProducersInterval, TopStudios } from "./components";

jest.mock("axios", () => {
	return {
		create: () => {
			return {
				interceptors: {
					request: { eject: jest.fn(), use: jest.fn() },
					response: { eject: jest.fn(), use: jest.fn() },
				},
			};
		},
	};
});

describe("<ListWinnersYears />", () => {
	beforeEach(() => {
		axios.get = jest.fn();
	});

	beforeAll(() => {
		console.error = function consoleErrorWithStack(message) {
			const error = { message };
			Error.captureStackTrace(error, consoleErrorWithStack);
			console.log(error.message);
		};
	});

	it("Test Component <ListWinnersYears />", async () => {
		const valueGet = {
			years: [
				{
					year: 1986,
					winnerCount: 2,
				},
				{
					year: 1990,
					winnerCount: 2,
				},
				{
					year: 2015,
					winnerCount: 2,
				},
			],
		};
		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getYearsWinners").mockResolvedValue({ data: valueGet } as any); // the function that we want to mock/spy

		render(<ListWinnersYears />);

		expect(spyApi).toBeCalledTimes(1);
		expect(await screen.findByText(/1986/i)).toBeInTheDocument();
	});

	it("Test Component <MoviesWinners />", async () => {
		const valueGet = [
			{
				id: 193,
				year: 2017,
				title: "Baywatch",
				studios: ["Paramount Pictures"],
				producers: ["Beau Flynn", "Douglas Schwartz", "Gregory J. Bonann", "Ivan Reitman", "Michael Berk"],
				winner: false,
			},
			{
				id: 194,
				year: 2017,
				title: "Fifty Shades Darker",
				studios: ["Universal Pictures"],
				producers: ["Dana Brunetti", "E. L. James", "Marcus Viscidi", "Michael De Luca"],
				winner: false,
			},
			{
				id: 195,
				year: 2017,
				title: "The Mummy",
				studios: ["Universal Pictures"],
				producers: ["Alex Kurtzman", "Chris Morgan", "Sarah Bradshaw", "Sean Daniel"],
				winner: false,
			},
			{
				id: 196,
				year: 2017,
				title: "Transformers: The Last Knight",
				studios: ["Paramount Pictures"],
				producers: ["Don Murphy", "Ian Bryce", "Lorenzo di Bonaventura", "Tom DeSanto"],
				winner: false,
			},
		];
		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getMoviesPerYear").mockResolvedValue({ data: valueGet } as any); // the function that we want to mock/spy

		render(<MoviesWinners />);

		expect(spyApi).toBeCalledTimes(1);
		expect(await screen.findByText(/Baywatch/i)).toBeInTheDocument();
	});

	it("Test Component <ProducersInterval />", async () => {
		const valueGet = {
			min: [
				{
					producer: "Joel Silver",
					interval: 1,
					previousWin: 1990,
					followingWin: 1991,
				},
			],
			max: [
				{
					producer: "Matthew Vaughn",
					interval: 13,
					previousWin: 2002,
					followingWin: 2015,
				},
			],
		};
		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getMaxMinIntervalProducers").mockResolvedValue({ data: valueGet } as any); // the function that we want to mock/spy

		render(<ProducersInterval />);

		expect(spyApi).toBeCalledTimes(1);
		expect(await screen.findByText(/Joel Silver/i)).toBeInTheDocument();
	});

	it("Test Component <TopStudios />", async () => {
		const valueGet = {
			studios: [
				{
					name: "Columbia Pictures",
					winCount: 7,
				},
				{
					name: "Paramount Pictures",
					winCount: 6,
				},
				{
					name: "Warner Bros.",
					winCount: 5,
				},
				{
					name: "20th Century Fox",
					winCount: 4,
				},
				{
					name: "MGM",
					winCount: 3,
				},
				{
					name: "Universal Studios",
					winCount: 2,
				},
				{
					name: "Universal Pictures",
					winCount: 2,
				},
				{
					name: "Hollywood Pictures",
					winCount: 2,
				},
				{
					name: "Nickelodeon Movies",
					winCount: 1,
				},
				{
					name: "C2 Pictures",
					winCount: 1,
				},
				{
					name: "Summit Entertainment",
					winCount: 1,
				},
				{
					name: "Hasbro",
					winCount: 1,
				},
				{
					name: "Associated Film Distribution",
					winCount: 1,
				},
				{
					name: "Revolution Studios",
					winCount: 1,
				},
				{
					name: "First Look Pictures",
					winCount: 1,
				},
				{
					name: "Focus Features",
					winCount: 1,
				},
				{
					name: "Cannon Films",
					winCount: 1,
				},
				{
					name: "United Artists",
					winCount: 1,
				},
				{
					name: "Touchstone Pictures",
					winCount: 1,
				},
				{
					name: "Samuel Goldwyn Films",
					winCount: 1,
				},
				{
					name: "Quality Flix",
					winCount: 1,
				},
				{
					name: "TriStar Pictures",
					winCount: 1,
				},
				{
					name: "Franchise Pictures",
					winCount: 1,
				},
				{
					name: "Relativity Media",
					winCount: 1,
				},
				{
					name: "Castle Rock Entertainment",
					winCount: 1,
				},
				{
					name: "Screen Gems",
					winCount: 1,
				},
				{
					name: "Triumph Releasing",
					winCount: 1,
				},
				{
					name: "DreamWorks",
					winCount: 1,
				},
			],
		};
		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getStudiosCount").mockResolvedValue({ data: valueGet } as any); // the function that we want to mock/spy

		render(<TopStudios />);

		expect(spyApi).toBeCalledTimes(1);
		expect(await screen.findByText(/Columbia Pictures/i)).toBeInTheDocument();
	});
});
