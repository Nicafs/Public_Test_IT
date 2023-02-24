import { lazy, LazyExoticComponent } from "react";

export type TPath = {
	path: string;
	element: LazyExoticComponent<() => JSX.Element>;
	label: string;
};

export const paths: TPath[] = [
	{
		path: "/dashboard",
		label: "Dashboard",
		element: lazy(() => import("../pages/dashboard")),
	},
	{
		path: "/movie-list",
		label: "Movie List",
		element: lazy(() => import("../pages/movie-list")),
	},
];
