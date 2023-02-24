export type MaxMinWinIntervalForProducersItemDTO = {
	followingWin: number;
	interval: number;
	previousWin: number;
	producer: string;
};

export type MaxMinWinIntervalForProducersDTO = {
	max: MaxMinWinIntervalForProducersItemDTO[];
	min: MaxMinWinIntervalForProducersItemDTO[];
};
