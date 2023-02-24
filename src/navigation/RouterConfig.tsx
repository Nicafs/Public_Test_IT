import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Container } from "@mui/material";

import { HeaderContainer, Loading } from "~/components";

import { paths, TPath } from "./CONSTANTS";
import { NotFound } from "./NotFound";

export const RouterConfig: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="dashboard" replace />} />

			{paths.map((p: TPath) => {
				const { path, element: Element, disableGutters, ...rest } = p;

				return (
					<Route
						key={path}
						path={path}
						element={
							<Suspense fallback={<Loading />}>
								<>
									<HeaderContainer />

									<Container
										maxWidth="xl"
										disableGutters
										sx={{
											mt: "58px !important",
											minHeight: "calc(100vh - 58px)",
											display: "flex",
											flexDirection: "column",
										}}
										style={{ margin: "0 auto" }}
									>
										<Element />
									</Container>
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
