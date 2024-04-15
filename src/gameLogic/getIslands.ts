import { indexToXY } from "../utils/indexToXY";
import { isLetter } from "../utils/isLetter";
import { notNull } from "../utils/notNull";
import { left, above, right, below } from "./adjacentSquares";

export function get1Islands(boardState: TRenderedBoardState): XY[] {
	// map into array of null for non islands and index of island for islands, then strip nulls
	const islands = boardState
		.map((l, index): XY | null => {
			if (!isLetter(l)) {
				return null;
			}

			const surroundingIndices = [left(index), above(index), right(index), below(index)];
			const surroundingChars = surroundingIndices.filter(notNull).map((i) => boardState[i]);

			return surroundingChars.every((l) => !isLetter(l)) ? indexToXY(index) : null;
		})
		.filter(notNull);

	return islands;
}

export function check1Islands(boardState: TRenderedBoardState) {
	const islands = get1Islands(boardState);
	return islands.length !== 0;
}
