import axios from "axios";

import { screen, render, waitFor, getByTestId, fireEvent, getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MovieService } from "../../services/movies";
import { MovieListContainer } from "./MovieListContainer";

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

describe("List of movies", () => {
	beforeEach(() => {
		axios.get = jest.fn();
	});

	it("Test Component MovieListContainer - API Success", async () => {
		const valueGet = {
			content: [
				{
					id: 2,
					year: 1980,
					title: "Cruising",
					studios: ["Lorimar Productions", "United Artists"],
					producers: ["Jerry Weintraub"],
					winner: false,
				},
				{
					id: 3,
					year: 1980,
					title: "The Formula",
					studios: ["MGM", "United Artists"],
					producers: ["Steve Shagan"],
					winner: false,
				},
				{
					id: 4,
					year: 1980,
					title: "Friday the 13th",
					studios: ["Paramount Pictures"],
					producers: ["Sean S. Cunningham"],
					winner: false,
				},
				{
					id: 5,
					year: 1980,
					title: "The Nude Bomb",
					studios: ["Universal Studios"],
					producers: ["Jennings Lang"],
					winner: false,
				},
				{
					id: 6,
					year: 1980,
					title: "The Jazz Singer",
					studios: ["Associated Film Distribution"],
					producers: ["Jerry Leider"],
					winner: false,
				},
			],
			totalPages: 33,
		};

		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getMovies").mockResolvedValue({ data: valueGet } as any); // the function that we want to mock/spy

		const { container } = render(<MovieListContainer />);

		await waitFor(() => {
			expect(screen.findByText(/List movies/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(screen.findByText(/Cruising/i));
			expect(container.querySelector("table"));
		});
	});

	it("Test Component MovieListContainer - API Error", async () => {
		const networkError = new Error("Some network error");
		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getMovies").mockRejectedValueOnce(networkError); // the function that we want to mock/spy

		const { container } = render(<MovieListContainer />);

		await waitFor(() => {
			expect(screen.findByText(/List movies/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(!container.querySelector("table"));
		});
	});

	it("Test Component MovieListContainer - Filters Year", async () => {
		const valueGet = {
			content: [],
			totalPages: 0,
		};

		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getMovies").mockResolvedValue({ data: valueGet } as any); // the function that we want to mock/spy

		const { container } = render(<MovieListContainer />);

		await waitFor(() => {
			expect(screen.findByText(/List movies/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(container.querySelector("table"));
		});

		const valueSearch = {
			content: [
				{
					id: 96,
					year: 1999,
					title: "An Alan Smithee Film: Burn Hollywood Burn Teste Year",
					studios: ["Hollywood Pictures"],
					producers: ["Ben Myron", "Joe Eszterhas"],
					winner: true,
				},
				{
					id: 97,
					year: 1999,
					title: "Armageddon",
					studios: ["Touchstone Pictures"],
					producers: ["Jerry Bruckheimer", "Michael Bay"],
					winner: false,
				},
				{
					id: 98,
					year: 1999,
					title: "The Avengers",
					studios: ["Warner Bros."],
					producers: ["Jerry Weintraub"],
					winner: false,
				},
				{
					id: 99,
					year: 1999,
					title: "Godzilla",
					studios: ["TriStar Pictures"],
					producers: ["Dean Devlin", "Roland Emmerich"],
					winner: false,
				},
				{
					id: 100,
					year: 1999,
					title: "Spice World",
					studios: ["Columbia Pictures"],
					producers: ["Barnaby Thompson", "Mark L. Rosen", "Uri Fruchtan"],
					winner: false,
				},
			],
			totalPages: 1,
		};

		// eslint-disable-next-line
		spyApi.mockResolvedValue({ data: valueSearch } as any);

		const searchById = await screen.getByTestId("searchByYear");

		await userEvent.click(searchById);
		await userEvent.type(searchById, "1980");
		await userEvent.click(getByTestId(container, "searchByYearBtn"));

		await waitFor(() => {
			expect(spyApi).toBeCalledTimes(2);
			expect(container.querySelector("table"));
			expect(screen.findByText(/An Alan Smithee Film: Burn Hollywood Burn Teste Year/i));
		});
	});

	it("Test Component MovieListContainer - Filter Winner", async () => {
		const valueGet = {
			content: [],
			totalPages: 0,
		};

		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getMovies").mockResolvedValue({ data: valueGet } as any); // the function that we want to mock/spy

		const { container } = render(<MovieListContainer />);

		await waitFor(() => {
			expect(screen.findByText(/List movies/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(container.querySelector("table"));
		});

		const valueSearch2 = {
			content: [
				{
					id: 96,
					year: 1999,
					title: "An Alan Smithee Film: Burn Hollywood Burn Teste",
					studios: ["Hollywood Pictures"],
					producers: ["Ben Myron", "Joe Eszterhas"],
					winner: true,
				},
			],
			totalPages: 1,
		};
		// eslint-disable-next-line
		spyApi.mockResolvedValue({ data: valueSearch2 } as any);

		await userEvent.click(getByRole(screen.getByTestId("selectWinner"), "button"));
		await userEvent.click(screen.getByTestId("item-1"));

		await waitFor(() => {
			expect(spyApi).toBeCalledTimes(2);
			expect(container.querySelector("table"));
			expect(screen.findByText(/An Alan Smithee Film: Burn Hollywood Burn Teste/i));
		});
	});

	it("Test Component MovieListContainer - Pagination", async () => {
		const valueGet = {
			content: [
				{
					id: 96,
					year: 1999,
					title: "An Alan Smithee Film: Burn Hollywood Burn",
					studios: ["Hollywood Pictures"],
					producers: ["Ben Myron", "Joe Eszterhas"],
					winner: true,
				},
			],
			totalPages: 4,
		};

		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getMovies").mockResolvedValue({ data: valueGet } as any); // the function that we want to mock/spy

		const { container } = render(<MovieListContainer />);

		await waitFor(() => {
			expect(screen.findByText(/List movies/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(container.querySelector("table"));
		});

		const valueSearch = {
			content: [
				{
					id: 97,
					year: 1999,
					title: "Armageddon",
					studios: ["Touchstone Pictures"],
					producers: ["Jerry Bruckheimer", "Michael Bay"],
					winner: false,
				},
			],
			totalPages: 4,
		};

		// eslint-disable-next-line
		spyApi.mockResolvedValue({ data: valueSearch } as any);

		const pagination = await screen.getByTestId("pagination");

		const buttonPage2 = await pagination.querySelectorAll("button");

		fireEvent.click(buttonPage2[3]);

		await waitFor(() => {
			expect(spyApi).toBeCalledTimes(2);
			expect(container.querySelector("table"));
			expect(screen.findByText(/Armageddon/i));
		});
	});

	it("Test Component MovieListContainer - Undefined Return Api", async () => {
		const valueGet = {
			content: undefined,
			totalPages: undefined,
		};

		// eslint-disable-next-line
		const spyApi = jest.spyOn(MovieService, "getMovies").mockResolvedValue({ data: valueGet } as any); // the function that we want to mock/spy

		const { container } = render(<MovieListContainer />);

		await waitFor(() => {
			expect(screen.findByText(/List movies/i));
			expect(spyApi).toBeCalledTimes(1);
			expect(container.querySelector("table"));
		});
	});
});
