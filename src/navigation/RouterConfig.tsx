import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Loading } from "~/components";

import { paths, TPath } from "./CONSTANTS";
import { LayoutContainerMovie } from "./layouts";
import { NotFound } from "./NotFound";

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
								<LayoutContainerMovie paths={paths}>
									<Element />
								</LayoutContainerMovie>
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
