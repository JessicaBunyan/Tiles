export function renderBoard(rack: TRackDef, board: TBoardState): TRenderedBoardState {
	const b = board.map((sq) => (sq !== "" && sq !== "#" ? rack[sq] : ""));

	return b;
}
