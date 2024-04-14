import { RootState } from "./store";

export const selectActiveTile = (state: RootState) => state.activeTile.activeTile;

export const selectCurrentRack = (state: RootState) => {
	const usedTiles: number[] = [];
	const availableTiles: number[] = [];
	state.board.board.forEach((t) => {
		if (t !== "" && t !== "#") usedTiles.push(t);
	});

	state.rack.rackDef.forEach((tile, index) => {
		if (!usedTiles.includes(index)) {
			availableTiles.push(index);
		}
	});
	return availableTiles;
};

// export const selectPlacedTiles = (state: RootState) => {};

export const selectRackDef = (state: RootState) => state.rack.rackDef;

export const selectBoardState = (state: RootState) => state.board.board;

export const selectRenderedBoardState = (state: RootState): TRenderedBoardState => {
	const rackDef = state.rack.rackDef;
	const b = state.board.board.map((sq) => (sq !== "" && sq !== "#" ? rackDef[sq] : ""));

	return b;
};

export const selectErrors = (state: RootState) => {
	return state.board.errors;
};

export const selectWon = (state: RootState) => {
	return state.board.won;
};
