import axios from "axios";

import { render } from "@testing-library/react";

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

	it("Test Component <MovieListContainer />", async () => {
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

		expect(spyApi).toBeCalledTimes(1);
		expect(container.querySelector("table")).toBe(null);
	});
});
