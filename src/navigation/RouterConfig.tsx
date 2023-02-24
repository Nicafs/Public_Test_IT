import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Box } from "@mui/material";

// import { Container } from "@mui/material";

import { HeaderContainer, Loading } from "~/components";

import { paths, TPath } from "./CONSTANTS";
import { NotFound } from "./NotFound";

const Dashboard = lazy(() => import("../pages/dashboard"));

export const RouterConfig: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="dashboard" replace />} />

			{paths.map((p: TPath) => {
				const { path, element: Element, ...rest } = p;

				return (
					<Route
						key={path}
						path={path}
						element={
							<Suspense fallback={<Loading />}>
								<>
									<HeaderContainer />

									<Element />
								</>
							</Suspense>
						}
						{...rest}
					/>
				);
			})}

			{/* List a generic 404-Not Found route here */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
