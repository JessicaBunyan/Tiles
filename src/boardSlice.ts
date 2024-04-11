import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// export type boardState = TBoardDef

const initialState: TBoardSliceState = { board: ["", ""], errors: [] };

type TSetTilePayload = {
	position: number;
	tileId: number;
};

type TBoardSliceState = {
	board: TBoardState;
	errors: TFoundWord[];
	won?: boolean;
};

export const boardSlice = createSlice({
	name: "board",
	initialState: initialState,
	reducers: {
		initialiseBoard: (state, action: PayloadAction<TBoardDef>) => {
			console.log(action);
			state.board = action.payload;
		},
		placeTile: (state, action: PayloadAction<TSetTilePayload>) => {
			const { position, tileId } = action.payload;
			if (state.board[position] === "#") {
				return;
			}

			const currentPos = state.board.findIndex((sq) => sq === tileId);
			if (currentPos !== -1) {
				state.board[currentPos] = "";
			}
			state.board[position] = tileId;
		},
		removeTileFromBoard: (state, action: PayloadAction<number>) => {
			const currentPos = state.board.findIndex((sq) => sq === action.payload);

			state.board[currentPos] = "";
		},
		setErrors: (state, action: PayloadAction<TFoundWord[]>) => {
			state.errors = action.payload;
		},
		win: (state) => {
			state.won = true;
		},
	},
});

export const { removeTileFromBoard, initialiseBoard, placeTile, setErrors, win } = boardSlice.actions;
export default boardSlice.reducer;
