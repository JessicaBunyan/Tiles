import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ActiveTileState {
	activeTile: number | undefined;
}

const initialState: ActiveTileState = {
	activeTile: undefined,
};

export const activeTileSlice = createSlice({
	name: "activeTile",
	initialState: initialState,
	reducers: {
		setActiveTile: (state, action: PayloadAction<number>) => {
			state.activeTile = action.payload;
		},
		clearActiveTile: (state) => {
			state.activeTile = undefined;
		},
	},
});

export const { setActiveTile, clearActiveTile } = activeTileSlice.actions;
export default activeTileSlice.reducer;
