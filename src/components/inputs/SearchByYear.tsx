import { useState } from "react";

import { IconButton, InputBase, InputBaseProps, Paper } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export type TSearchByYear = InputBaseProps & {
	onClickSearch?: (value: number) => void;
	defaultValue?: number;
};

export const SearchByYear = ({ placeholder, onClickSearch, defaultValue, ...rest }: TSearchByYear) => {
	const [searchValue, setSearchValue] = useState<number | undefined>(defaultValue);

	const handleSubmit = (event) => {
		event.preventDefault();
		onClickSearch(searchValue);
	};

	return (
		<Paper component="form" sx={{ display: "flex", alignItems: "center", width: "100%" }} onSubmit={handleSubmit} noValidate autoComplete="off">
			<InputBase
				data-testid="searchByYear"
				value={searchValue || ""}
				onChange={(e) => setSearchValue(Number(e.target.value))}
				type="number"
				sx={{ ml: 1, flex: 1 }}
				placeholder={placeholder}
				inputProps={{ "aria-label": placeholder }}
				{...rest}
			/>

			<IconButton
				data-testid="searchByYearBtn"
				type="submit"
				sx={{ p: "10px" }}
				aria-label="button search"
				onClick={() => onClickSearch(searchValue)}
			>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};
