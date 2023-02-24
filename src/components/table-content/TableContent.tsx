import { Box, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.action.hover,
		color: theme.palette.common.black,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(even)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TTableContentHeaders = { label: string; field: string; width?: string; render?: (value: any) => string; filter?: JSX.Element };

export type TTableContent = {
	headers: TTableContentHeaders[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	rows: any[];
	minWidth?: number;
	id?: string;
};

export const TableContent = ({ headers, rows, minWidth = 450, ...rest }: TTableContent) => {
	return (
		<TableContainer component={Paper} {...rest}>
			<Table sx={{ minWidth }} aria-label="simple table">
				<TableHead>
					<TableRow>
						{headers.map((header) => (
							<>
								<StyledTableCell sx={{ width: header?.width }} align={header?.filter ? "center" : undefined}>
									<Box display="flex" flexDirection="column">
										{header.label}

										{!!header?.filter && header?.filter}
									</Box>
								</StyledTableCell>
							</>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<StyledTableRow key={`${row[headers[0].field]}_${index}`} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							{headers.map((header) => (
								<StyledTableCell sx={{ width: header?.width }}>
									{header?.render ? header.render(row[header.field]) : row[header.field]}
								</StyledTableCell>
							))}
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
