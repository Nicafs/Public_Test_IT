import { screen, render, waitFor } from "@testing-library/react";

import { Loading } from "./Loading";

describe("Component Loading", () => {
	it("Test Component Loading", async () => {
		const { container } = render(<Loading />);

		await waitFor(() => {
			expect(screen.findByTestId("circularLoading"));
			expect(screen.findByRole("button"));
		});

		const circularProgress = (await waitFor(() => container.querySelector("span"))) as HTMLInputElement;

		expect(circularProgress.classList.contains("MuiCircularProgress-root")).toBe(true);
	});
});
