import { RootState } from "./store";
import { getCurrentRack } from "./utils/getCurrentRack";
import { renderBoard } from "./utils/renderBoard";
import { xyToIndex } from "./utils/xyToIndex";

export const selectActiveTile = (state: RootState) => state.activeTile.activeTile;

export const selectCurrentRack = (state: RootState) => {
	return getCurrentRack(state.game.board, state.game.rack);
};

// export const selectPlacedTiles = (state: RootState) => {};

export const selectRackDef = (state: RootState) => state.game.rack;

export const selectBoardState = (state: RootState) => state.game.board;

export const selectRenderedBoardState = (state: RootState): TRenderedBoardState => {
	return renderBoard(state.game.rack, state.game.board);
};

export const selectValidWordsFeedback = (state: RootState): TFeedbackIndicator[] => {
	return state.game.gameValidity.validWords.map((w) => ({
		position: w.pos,
		width: w.direction === "H" ? w.word.length : 1,
		height: w.direction === "V" ? w.word.length : 1,
		type: "VALID_WORD",
	}));
};
export const selectErrors = (state: RootState) => {
	return state.game.gameValidity.errors;
};

export const selectValidWordSquares = (state: RootState): number[] => {
	const adjacencyOffset = {
		H: 1,
		V: 5,
	};

	return state.game.gameValidity.validWords
		.map((v) => [...v.word].map((char, index) => xyToIndex(v.pos) + adjacencyOffset[v.direction] * index))
		.flat();
};

export const selectErrorFeedback = (state: RootState): TFeedbackIndicator[] => {
	const islands: TFeedbackIndicator[] = state.game.gameValidity.errors.islands.map((i) => ({
		position: i,
		width: 1,
		height: 1,
		type: "ISLAND",
	}));
	const wrongWords: TFeedbackIndicator[] = state.game.gameValidity.errors.invalidWords.map((w) => ({
		position: w.pos,
		width: w.direction === "H" ? w.word.length : 1,
		height: w.direction === "V" ? w.word.length : 1,
		type: "INVALID_WORD",
	}));

	return [...islands, ...wrongWords];
};

export const selectHasWon = (state: RootState) => {
	return state.game.won;
};
