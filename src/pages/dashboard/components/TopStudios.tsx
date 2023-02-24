import { useCallback, useEffect, useState } from "react";

import { CircularProgress } from "@mui/material";

import { TableContent, TTableContentHeaders, CardContentTitle } from "~/components";
import { StudiosWithWinCountItemDTO } from "~/dto";
import { MovieService } from "~/services";

import { EmptyState } from "./EmptyState";

export const TopStudios = () => {
	const [listTopStudios, setListTopStudios] = useState<StudiosWithWinCountItemDTO[]>([]);
	const [loadingList, setLoadingList] = useState<boolean>(true);

	const headers: TTableContentHeaders[] = [
		{ label: "Name", field: "name" },
		{ label: "Win Count", field: "winCount" },
	];

	const getListTopStudios = useCallback(() => {
		setLoadingList(true);

		MovieService.getStudiosCount()
			.then(({ data }) => {
				setLoadingList(false);

				const top3Studios = (data?.studios || []).splice(0, 3);

				setListTopStudios(top3Studios);
			})
			.catch(() => {
				setLoadingList(false);
			});
	}, []);

	useEffect(() => {
		getListTopStudios();
	}, [getListTopStudios]);

	return (
		<CardContentTitle title="Top 3 studios with winners">
			<>
				{loadingList && <CircularProgress />}

				{!loadingList && (
					<>
						{(!listTopStudios || listTopStudios.length === 0) && <EmptyState />}

						{!!listTopStudios && listTopStudios.length > 0 && <TableContent headers={headers} rows={listTopStudios} />}
					</>
				)}
			</>
		</CardContentTitle>
	);
};
