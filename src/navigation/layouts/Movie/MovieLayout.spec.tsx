import "@testing-library/jest-dom/extend-expect";
import { screen, render, waitFor, fireEvent, getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { paths } from "../../CONSTANTS";
import { HeaderMovies } from "./HeaderMovies";
import { LayoutContainerMovie } from "./LayoutContainerMovie";
import { MenuMovie } from "./MenuMovie";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
	//eslint-disable-next-line
	...(jest.requireActual("react-router-dom") as any),
	useNavigate: () => mockedUsedNavigate,
}));

describe("Layout Container Movie test", () => {
	const originalEnv = process.env;

	it("Test Component LayoutContainerMovie", async () => {
		const { container } = render(
			<LayoutContainerMovie paths={paths}>
				<h3>Teste Movie Container</h3>
			</LayoutContainerMovie>
		);

		await waitFor(() => {
			expect(screen.findByText(/Teste Movie Container/i));
			expect(screen.findByRole("menu"));
			expect(container.querySelector("main"));
		});

		await userEvent.click(screen.getByTestId("toogle-menu"));
	});

	it("Test Component MenuMovie", async () => {
		const { container } = render(<MenuMovie paths={paths} drawerWidth={300} handleDrawerToggle={() => null} mobileOpen={false} />);

		await waitFor(() => {
			expect(screen.findByRole("menu"));

			expect(screen.findByRole("presentation"));
			expect(container.querySelector("main"));

			const qtdLi = container.querySelectorAll("li");
			expect(container.querySelector("li"));
			expect(qtdLi.length).toEqual(2);
		});

		fireEvent.mouseEnter(container.querySelector("li"));
		fireEvent.click(container.querySelector("li"));
		fireEvent.mouseLeave(container.querySelector("li"));
	});

	it("Test Component HeaderMovies - Dev", async () => {
		jest.resetModules();
		process.env = {
			...originalEnv,
			REACT_APP_ENVIRONMENT: "development",
		};

		const { container } = render(<HeaderMovies handleDrawerToggle={() => null} />);

		await waitFor(() => {
			expect(container.querySelector("img"));

			const logo = screen.getByRole("img");
			expect(logo).toHaveAttribute("src", "logo.svg");
			expect(logo).toHaveAttribute("alt", "Logo");

			expect(container.querySelector("h4"));
			expect(screen.findByText(/Frontend React Test/i));
			expect(screen.findByText(/Development/i));
		});
	});

	it("Test Component HeaderMovies - Staging", async () => {
		jest.resetModules();
		process.env = {
			...originalEnv,
			REACT_APP_ENVIRONMENT: "staging",
		};

		const { container } = render(<HeaderMovies handleDrawerToggle={() => null} />);

		await waitFor(() => {
			expect(container.querySelector("img"));

			const logo = screen.getByRole("img");
			expect(logo).toHaveAttribute("src", "logo.svg");
			expect(logo).toHaveAttribute("alt", "Logo");

			expect(container.querySelector("h4"));
			expect(screen.findByText(/Frontend React Test/i));
			expect(screen.findByText(/Staging/i));
		});
	});
});
