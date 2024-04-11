import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// export type boardState = TBoardDef

const initialState: TRackState = { rackDef: ["Z"] };

type TRackState = {
	rackDef: TRackDef;
	// currentRack: number[];
};

export const activeTileSlice = createSlice({
	name: "board",
	initialState: initialState,
	reducers: {
		initialiseRack: (state, action: PayloadAction<TLetterDef[]>) => {
			state.rackDef = action.payload;
		},
		clearTile: (state, action: PayloadAction<number>) => {
			// const position = action.payload;
			// state.board[position] = "";
		},
	},
});

export const { clearTile, initialiseRack } = activeTileSlice.actions;
export default activeTileSlice.reducer;
