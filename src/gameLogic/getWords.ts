import { boardTo2DArray, boardTo2DArrayTransposed } from "../utils/boardTo2d";
import { isLetter } from "../utils/isLetter";

export function getWordsFromBoard(boardState: TRenderedBoardState): TFoundWord[] {
	const boardAcross = boardTo2DArray(boardState);
	const boardDown = boardTo2DArrayTransposed(boardState);

	return [
		...getWordsAcross(boardAcross),
		...getWordsAcross(boardDown).map((w) => ({ word: w.word, pos: w.pos.reverse() as XY, direction: "V" as "V" })),
	];
}

function getWordsAcross(board: TRenderedSquareState[][]): TFoundWord[] {
	const foundWords: TFoundWord[] = [];
	let current: string = "";
	let currentStart: number[] = [];
	for (let row = 0; row < 5; row++) {
		for (let col = 0; col < 5; col++) {
			const thisTile = board[row][col];
			if (!current && isLetter(thisTile)) {
				currentStart = [row, col];
				current = thisTile;
			} else {
				if (current && isLetter(thisTile)) {
					current = current + thisTile;
				} else {
					if (current.length > 1) {
						foundWords.push({
							direction: "H",
							pos: currentStart as XY,
							word: current,
						});
					}
					current = "";
					currentStart = [];
				}
			}
		}
		if (current.length > 1) {
			foundWords.push({
				direction: "H",
				pos: currentStart as XY,
				word: current,
			});
		}
		current = "";
		currentStart = [];
	}

	return foundWords;
}
