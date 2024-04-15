export function getCurrentRack(board: TBoardState, rack: TRackDef) {
	const usedTiles: number[] = [];
	const availableTiles: number[] = [];
	board.forEach((t) => {
		if (t !== "" && t !== "#") usedTiles.push(t);
	});

	rack.forEach((tile, index) => {
		if (!usedTiles.includes(index)) {
			availableTiles.push(index);
		}
	});
	return availableTiles;
}
