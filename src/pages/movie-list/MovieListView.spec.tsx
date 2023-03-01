import { screen, render, waitFor, getByTestId, getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MovieListView } from "./MovieListView";

describe("List of movies", () => {
	it("Test Component MovieListView - Filter Year", async () => {
		const mockHandleFilterYear = jest.fn();
		const mockHandleFilterWinner = jest.fn();
		const mockOnChangePage = jest.fn();

		const listMovies = [
			{
				id: 96,
				year: 1998,
				title: "An Alan Smithee Film: Burn Hollywood Burn",
				studios: ["Hollywood Pictures"],
				producers: ["Ben Myron", "Joe Eszterhas"],
				winner: true,
			},
		];

		const { container } = render(
			<MovieListView
				loadingList={false}
				loadingPage={false}
				listMovies={listMovies}
				onChangePage={mockOnChangePage}
				pagination={{ size: 45, page: 0, count: 3 }}
				handleChangeYear={mockHandleFilterYear}
				handleChangeWinner={mockHandleFilterWinner}
				winnerFilter={0}
				yearFilter={1998}
			/>
		);

		const searchByYear = screen.getByTestId("searchByYear");

		await userEvent.click(searchByYear);
		await userEvent.type(searchByYear, "1980");
		await userEvent.click(getByTestId(container, "searchByYearBtn"));

		await waitFor(() => {
			expect(mockHandleFilterYear).toBeCalledTimes(2);
		});
	});

	it("Test Component MovieListView - Filter Winner", async () => {
		const mockWinnerFilter = 1;
		const mockYearFilter = 1998;
		const mockHandleFilterYear = jest.fn();
		const mockHandleFilterWinner = jest.fn();
		const mockOnChangePage = jest.fn();

		const listMovies = [
			{
				id: 96,
				year: 1998,
				title: "An Alan Smithee Film: Burn Hollywood Burn",
				studios: ["Hollywood Pictures"],
				producers: ["Ben Myron", "Joe Eszterhas"],
				winner: true,
			},
		];

		render(
			<MovieListView
				loadingList={false}
				loadingPage={false}
				listMovies={listMovies}
				onChangePage={mockOnChangePage}
				pagination={{ size: 45, page: 0, count: 3 }}
				handleChangeYear={mockHandleFilterYear}
				handleChangeWinner={mockHandleFilterWinner}
				winnerFilter={mockWinnerFilter}
				yearFilter={mockYearFilter}
			/>
		);

		const filterWinner = await screen.getByTestId("selectWinner");

		await userEvent.type(filterWinner, "{enter}{arrowdown}{enter}");

		await waitFor(() => {
			expect(mockHandleFilterWinner).toBeCalledTimes(1);
		});
	});
});
