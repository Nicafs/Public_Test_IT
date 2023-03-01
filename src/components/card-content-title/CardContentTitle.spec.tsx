import { screen, render, waitFor } from "@testing-library/react";

import { CardContentTitle } from "./CardContentTitle";

describe("Component CardContentTitle", () => {
	it("Test Component CardContentTitle", async () => {
		const { container } = render(
			<CardContentTitle title="Test Content Title">
				<h4>TestContentTitle</h4>
			</CardContentTitle>
		);

		await waitFor(() => {
			expect(screen.findByText(/Test Content Title/i));
			expect(screen.findByText(/TestContentTitle/i));
			expect(container.querySelector("h4"));
		});
	});
});
