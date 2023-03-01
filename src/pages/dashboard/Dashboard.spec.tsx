import axios from "axios";

import "@testing-library/jest-dom/extend-expect";
import { screen, render, waitFor, fireEvent, getByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

describe("Dashboard test", () => {
	beforeEach(() => {
		axios.get = jest.fn();
	});

	it("Test Component ListWinnersYears - Success Api", async () => {
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

		const { container } = render(<ListWinnersYears />);

		await waitFor(() => {
			expect(screen.findByText(/List years with multiple winners/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(screen.findByText(/1986/i));
			expect(container.querySelector("table"));
		});
	});

	it("Test Component ListWinnersYears - Error Api", async () => {
		const networkError = new Error("Some network error");
		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getYearsWinners").mockRejectedValueOnce(networkError); // the function that we want to mock/spy

		const { container } = render(<ListWinnersYears />);

		await waitFor(() => {
			expect(screen.findByText(/List years with multiple winners/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(screen.findByText(/No data found</i));
			expect(!container.querySelector("table"));
		});
	});

	it("Test Component MoviesWinners - Success Api", async () => {
		const user = userEvent.setup();

		// eslint-disable-next-line
		let spyApi = jest.spyOn(MovieService, "getMoviesPerYear").mockResolvedValue({ data: [] } as any); // the function that we want to mock/spy

		const { container } = render(<MoviesWinners />);

		await waitFor(() => {
			expect(screen.findByText(/List movie winners by year/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(screen.findByText(/No data found</i));
			expect(!container.querySelector("table"));
		});

		const valueSearch = [
			{
				id: 96,
				year: 1998,
				title: "An Alan Smithee Film: Burn Hollywood Burn",
				studios: ["Hollywood Pictures"],
				producers: ["Ben Myron", "Joe Eszterhas"],
				winner: true,
			},
		];

		// eslint-disable-next-line
		spyApi.mockResolvedValue({ data: valueSearch } as any);

		user.type(screen.getByTestId("searchByYear"), "1997");

		const btnSearchById = getByTestId(container, "searchByYearBtn");
		fireEvent.click(btnSearchById);

		await waitFor(() => {
			expect(screen.findByText(/List movie winners by year/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(screen.findByText(/An Alan Smithee Film: Burn Hollywood Burn/i));
			expect(container.querySelector("table"));
		});
	});

	it("Test Component MoviesWinners - Error Api", async () => {
		const networkError = new Error("Some network error");
		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getMoviesPerYear").mockRejectedValueOnce(networkError); // the function that we want to mock/spy

		const { container } = render(<MoviesWinners />);

		await waitFor(() => {
			expect(screen.findByText(/List movie winners by year/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(screen.findByText(/No data found</i));
			expect(!container.querySelector("table"));
		});
	});

	it("Test Component ProducersInterval - Success Api", async () => {
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

		const { container } = render(<ProducersInterval />);

		await waitFor(() => {
			expect(screen.findByText(/Producers with longest and shortest interval between wins/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(screen.findByText(/Joel Silver/i));
			expect(container.querySelector("table"));
		});
	});

	it("Test Component ProducersInterval - Error Api", async () => {
		const networkError = new Error("Some network error");
		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getMaxMinIntervalProducers").mockRejectedValueOnce(networkError); // the function that we want to mock/spy

		const { container } = render(<ProducersInterval />);

		await waitFor(() => {
			expect(screen.findByText(/Producers with longest and shortest interval between wins/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(screen.findByText(/No data found</i));
			expect(!container.querySelector("table"));
		});
	});

	it("Test Component TopStudios - Success Api", async () => {
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

		const { container } = render(<TopStudios />);

		await waitFor(() => {
			expect(screen.findByText(/Top 3 studios with winners/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(screen.findByText(/Columbia Pictures/i));
			expect(container.querySelector("table"));
		});
	});

	it("Test Component TopStudios - Error Api", async () => {
		const networkError = new Error("Some network error");
		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getStudiosCount").mockRejectedValueOnce(networkError); // the function that we want to mock/spy

		const { container } = render(<TopStudios />);

		await waitFor(() => {
			expect(screen.findByText(/Top 3 studios with winners/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(screen.findByText(/No data found</i));
			expect(!container.querySelector("table"));
		});
	});
});
