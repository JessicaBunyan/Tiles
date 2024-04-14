import { boardTo2DArray } from "./boardTo2d";

export function check1Islands(boardState: TRenderedBoardState) {
	const hasIslands = boardState.some((l, index) => {
		if (!isLetter(l)) {
			return false;
		}

		const surroundingIndices = [left(index), above(index), right(index), below(index)];
		const surroundingChars = surroundingIndices.filter(notNull).map((i) => boardState[i]);

		return surroundingChars.every((l) => !isLetter(l));
	});

	return hasIslands;
}
function notNull<TValue>(value: TValue | null): value is TValue {
	return value !== null;
}

function isLetter(l: "" | TLetterDef | "#"): boolean {
	return l !== "#" && l !== "";
}

function left(i: number): number | null {
	if (i % 5 === 0) {
		return null;
	} else {
		return i - 1;
	}
}
function above(i: number): number | null {
	if (i < 5) {
		return null;
	} else {
		return i - 5;
	}
}
function right(i: number): number | null {
	if (i % 5 === 4) {
		return null;
	} else {
		return i + 1;
	}
}
function below(i: number): number | null {
	if (i > 19) {
		return null;
	} else {
		return i + 5;
	}
}

export function getBoardDescription(boardState: Array<TLetterDef | "" | "#">): TBoardDescription {
	const board = boardTo2DArray(boardState);

	// console.log("IN GET WORDS");

	const foundWords: TFoundWord[] = [];
	const isolateds: Record<string, number> = {};

	// horizontal
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
							pos: currentStart,
							word: current,
						});
					} else {
						isolateds["" + currentStart[0] + currentStart[1]] =
							(isolateds["" + currentStart[0] + currentStart[1]] || 0) + 1;
					}
					current = "";
					currentStart = [];
				}
			}
		}
		if (current.length > 1) {
			foundWords.push({
				direction: "H",
				pos: currentStart,
				word: current,
			});
		} else {
			isolateds["" + currentStart[0] + currentStart[1]] = (isolateds["" + currentStart[0] + currentStart[1]] || 0) + 1;
		}
		current = "";
		currentStart = [];
	}

	//vertical TODO remove this dupilication
	current = "";
	currentStart = [];
	for (let col = 0; col < 5; col++) {
		for (let row = 0; row < 5; row++) {
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
							direction: "V",
							pos: currentStart,
							word: current,
						});
					} else {
						isolateds["" + currentStart[0] + currentStart[1]] =
							(isolateds["" + currentStart[0] + currentStart[1]] || 0) + 1;
					}
					current = "";
					currentStart = [];
				}
			}
		}
		if (current.length > 1) {
			foundWords.push({
				direction: "V",
				pos: currentStart,
				word: current,
			});
		} else {
			if (current) {
				isolateds["" + currentStart[0] + currentStart[1]] =
					(isolateds["" + currentStart[0] + currentStart[1]] || 0) + 1;
			}
		}
		current = "";
		currentStart = [];
	}

	// console.log(isolateds);
	const foundSingletons: TFoundWord[] = [];

	Object.entries(isolateds).forEach(([key, value]) => {
		if (value === 2) {
			const [row, col] = key;
			if (!isNaN(Number(row))) {
				foundSingletons.push({
					direction: "H",
					pos: [Number(row), Number(col)],
					word: "-",
				});
			}
		}
	});

	// console.log(foundSingletons);

	return { words: foundWords, singletons: foundSingletons };

	//vertical
}
