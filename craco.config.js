const path = require("path");

module.exports = {
	webpack: {
		alias: {
			"~/app": path.resolve(__dirname, "src"),
			"~/navigation": path.resolve(__dirname, "src/navigation"),
			"~/components": path.resolve(__dirname, "src/components"),
			"~/pages": path.resolve(__dirname, "src/pages"),
			"~/services": path.resolve(__dirname, "src/services"),
			"~/utils": path.resolve(__dirname, "src/utils"),
			"~/assets": path.resolve(__dirname, "src/assets"),
			"~/dto": path.resolve(__dirname, "src/dto"),
		},
		maximumFileSizeToCacheInBytes: 5000000,
	},
};
