import { MemoryRouter } from "react-router-dom";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import App from "./App";
import { RouterConfig } from "./navigation";

describe("App test", () => {
	it("Test Component App - Routes", async () => {
		render(<App />);

		const user = userEvent.setup();

		await waitFor(() => {
			expect(screen.queryByTestId("Dashboard"));
			expect(screen.queryByTestId("Movie_List"));
		});

		const menuDashboard = screen.queryByTestId("Dashboard");
		await user.click(menuDashboard);

		await waitFor(() => {
			expect(screen.queryByText(/List years with multiple winners/i));
			expect(screen.queryByText(/Top 3 studios with winners/i));
			expect(screen.queryByText(/Producers with longest and shortest interval between wins/i));
			expect(screen.queryByText(/List movie winners by year/i));
		});

		const menuMovieList = screen.queryByTestId("Movie_List");
		await user.click(menuMovieList);

		await waitFor(() => {
			expect(screen.queryByText(/List movies/i));
		});
	});

	it("Test Component App - Not Found Route", async () => {
		const notfound = "/notfound";

		render(
			<MemoryRouter initialEntries={[notfound]}>
				<RouterConfig />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByText(/404: Page Not Found!/i)).toBeInTheDocument();
		});
	});
});
