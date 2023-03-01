import { screen, render, waitFor } from "@testing-library/react";

import { TableContent, TTableContentHeaders } from "./TableContent";

describe("Component TableContent", () => {
	it("Test Component TableContent", async () => {
		const headers: TTableContentHeaders[] = [
			{ label: "ID", field: "id", width: "20%" },
			{ label: "Year", field: "year", width: "30%" },
			{ label: "Title", field: "title", width: "30%" },
			{
				label: "Winner?",
				field: "winner",
				width: "30%",
				render: (value) => {
					return value ? "Yes" : "No";
				},
			},
		];

		const rows = [
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
		];

		const { container } = render(<TableContent headers={headers} rows={rows} minWidth={700} />);

		await waitFor(() => {
			expect(container.querySelector("table"));
			expect(container.querySelector("td"));
			expect(container.querySelector("tr"));
		});
	});
});
