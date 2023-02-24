import axios, { AxiosRequestConfig } from "axios";

const axiosRequestConfig = {
	timeout: 15000,
	baseURL: process.env.REACT_APP_URL_SERVER_API,
	headers: {
		accept: "application/json",
		"Content-Type": "application/json",
	},
	retry: 10,
};

const httpClient = axios.create(axiosRequestConfig);

httpClient.interceptors.request.use(
	async (request) => {
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);

httpClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async (err) => {
		const { config, message, response: responseErr } = err;

		if ([404].includes(responseErr?.status || err?.status)) {
			return Promise.reject(err);
		}

		if (
			!(
				message.includes("timeout") ||
				message.includes("Network Error") ||
				responseErr?.data?.message.includes("timeout") ||
				responseErr?.data?.message.includes("Network Error")
			)
		) {
			return Promise.reject(err);
		}

		if (!config.retry) {
			return Promise.reject(err);
		}

		config.retry -= 1;

		const delayRetryRequest = new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log("retry the request", config.url);
				httpClient
					.request(err.config)
					.then((newResponse) => resolve(newResponse))
					.catch((newErr) => reject(newErr));
			}, config.retryDelay || 1000);
		});

		return delayRetryRequest;
	}
);

export const get = (url: string, config?: AxiosRequestConfig) => {
	return httpClient.get(url, config);
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = (url: string, data?: any, config?: AxiosRequestConfig) => {
	return httpClient.post(url, data, config);
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const put = (url: string, data?: any, config?: AxiosRequestConfig) => {
	return httpClient.put(url, data, config);
};

export const HttpService = httpClient;
