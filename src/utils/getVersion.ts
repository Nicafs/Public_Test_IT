export const getVersion = (): string => {
	//eslint-disable-next-line
	const { version } = require("../../package.json");
	return version;
};
