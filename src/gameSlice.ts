import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getBoardValidity } from "./utils/checkWin";
import { getCurrentRack } from "./utils/getCurrentRack";
import { renderBoard } from "./utils/renderBoard";

// export type boardState = TBoardDef

const initialState: TGameSliceState = {
	rack: [],
	board: ["", ""],
	gameDefinition: { rackDef: [], boardDef: ["", ""] },

	gameValidity: {
		errors: { count: 0, invalidWords: [], islands: [] },
		isValid: true,
		validWords: [],
	},
};

type TSetTilePayload = {
	position: number;
	tileId: number;
};

type TGameSliceState = {
	rack: TRackDef;
	board: TBoardState;
	gameValidity: TGameValidity;
	gameDefinition: TGameDef;
	// errors: TErrorInfo;
	// validWords: TFoundWord[];
	won?: boolean;
};

export const gameSlice = createSlice({
	name: "board",
	initialState: initialState,
	reducers: {
		initialiseGame: (state, action: PayloadAction<TGameDef>) => {
			state.gameDefinition = action.payload;
			state.board = action.payload.boardDef;
			state.rack = action.payload.rackDef;
		},
		placeTile: (state, action: PayloadAction<TSetTilePayload>) => {
			if (state.won) {
				return state;
			}

			const { position, tileId } = action.payload;
			if (state.board[position] === "#") {
				return;
			}

			const currentPos = state.board.findIndex((sq) => sq === tileId);
			if (currentPos !== -1) {
				state.board[currentPos] = "";
			}
			state.board[position] = tileId;

			const renderedBoard = renderBoard(state.rack, state.board);
			state.gameValidity = getBoardValidity(renderedBoard);
			const remainingTiles = getCurrentRack(state.board, state.rack);

			if (remainingTiles.length === 0 && state.gameValidity.isValid) {
				state.won = true;
			}
		},
		removeTileFromBoard: (state, action: PayloadAction<number>) => {
			if (state.won) {
				return state;
			}
			const currentPos = state.board.findIndex((sq) => sq === action.payload);

			state.board[currentPos] = "";
		},
		shuffleRack: (state) => {
			// state.rack = shuffleArray(state.rack); //TODO won't work with things on board
		},
		resetGame: (state) => {
			state.board = state.gameDefinition.boardDef;
			state.rack = state.gameDefinition.rackDef;
		},
	},
});

export const { removeTileFromBoard, initialiseGame, placeTile, shuffleRack, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
