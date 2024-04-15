import { configureStore } from "@reduxjs/toolkit";
import activeTileSlice from "./activeTileSlice";
import gameSlice from "./gameSlice";

export const store = configureStore({
	reducer: {
		activeTile: activeTileSlice,
		game: gameSlice,
		// rack: rackSlice,
	},
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
