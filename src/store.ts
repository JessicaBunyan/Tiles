import { configureStore } from "@reduxjs/toolkit";
import activeTileSlice from "./activeTileSlice";
import boardSlice from "./boardSlice";
import rackSlice from "./rackSlice";

export const store = configureStore({
	reducer: {
		activeTile: activeTileSlice,
		board: boardSlice,
		rack: rackSlice,
	},
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
