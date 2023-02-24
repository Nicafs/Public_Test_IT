import { lazy, LazyExoticComponent } from "react";

export const ROOT = "/";
export const HOME = "/home";

export type TPath = {
	path: string;
	exact: boolean;
	element: LazyExoticComponent<() => JSX.Element>;
	isPrivate?: boolean;
	disableGutters?: boolean;
};

export const paths: TPath[] = [
	{
		path: "/dashboard",
		exact: true,
		element: lazy(() => import("../pages/dashboard")),
	},
	{
		path: "/movie-list",
		exact: true,
		element: lazy(() => import("../pages/movie-list")),
	},
];
