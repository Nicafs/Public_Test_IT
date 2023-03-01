import { screen, render, waitFor, getByTestId, fireEvent } from "@testing-library/react";

import { SearchByYear } from "./SearchByYear";

describe("Componente - SearchByYear", () => {
	it("Test Component SearchByYear", async () => {
		const mockOnClickSearch = jest.fn(() => null);

		const { container } = render(<SearchByYear onClickSearch={mockOnClickSearch} />);

		await waitFor(() => {
			expect(screen.findByTestId("searchByYear"));
			expect(screen.findByRole("button"));
		});

		const inputSearchById = getByTestId(container, "searchByYear");
		fireEvent.change(inputSearchById, { value: "1998" });
		fireEvent.keyPress(inputSearchById, {
			key: "Enter",
			code: "Enter",
			keyCode: 13,
			charCode: 13,
		});

		const btnSearchById = getByTestId(container, "searchByYearBtn");
		fireEvent.click(btnSearchById);

		await waitFor(() => {
			expect(mockOnClickSearch).toBeCalledTimes(2);
		});
	});
});
