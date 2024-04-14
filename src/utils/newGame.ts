import randInt from "./randInt";

import { boardTo2DArray, boardTo2DArrayTransposed } from "./boardTo2d";
import { checkErrors } from "./checkWin";
import { getBoard } from "./getBoard";
import { check1Islands } from "./getWords";
import shuffleArray from "./shuffleArray";
type TCreateGameOptions = {
	date: Date;
	keyLetter: TLetterDef;
};

export function getGameSeed(date: Date): TCreateGameOptions {
	const d = new Date("2020-01-01T00:00:01+0000");

	const ms = date.getTime() - d.getTime();
	const days = ms / (1000 * 60 * 60 * 24);

	console.log(days);

	return {
		date,
		keyLetter: "E",
	};
}

export function getFirst5Row(board: TBoardDef) {
	const grid = boardTo2DArray(board);

	const result = grid.findIndex((row) => {
		return row.join("") === "";
	});

	return result;
}
export function getFirst5Col(board: TBoardDef) {
	const grid = boardTo2DArrayTransposed(board);

	const result = grid.findIndex((row) => {
		return row.join("") === "";
	});

	return result;
}

export function newGame(opts: TCreateGameOptions, depth = 0): TGameDef {
	const boardDef = getBoard(0);

	//TODO we're assuming a lot about the board here. Need to check this works with 4 letter starting words as well as 5., what if board shape doesn't fit those? etc.

	// TODO do imports better
	const letterDict: string[] = require(`../dictionaries/${opts.keyLetter.toLowerCase()}Dictionary`).default;

	const max = letterDict.length;
	console.log(letterDict);
	console.log(max);

	const row = getFirst5Row(boardDef);
	const col = getFirst5Col(boardDef);

	console.log({ row, col });

	// TODO seed this
	const n1 = randInt(0, max - 1);
	const w1: string = letterDict[n1].toUpperCase();
	const charAtIntersection = w1.charAt(col);

	console.log({ charAtIntersection });

	const newLetterDict: string[] = require(`../dictionaries/${charAtIntersection.toLowerCase()}Dictionary`).default;

	// todo doesn't necessarily have to come from the same letter dict as it wont always intersect on the key letter
	const matchingWords = newLetterDict.filter((w) => w.charAt(row).toUpperCase() === charAtIntersection);
	console.log({ matchingWords });

	const n2 = randInt(0, matchingWords.length);

	const w2: string = matchingWords[n2].toUpperCase();

	console.log("==========");
	console.log("==========");
	console.log(w1);
	console.log(w2);

	const letterPool = [...w1, ...w2];
	letterPool.splice(
		letterPool.findIndex((l) => l === charAtIntersection),
		1,
	); //don't double count the overlap
	const totalLetters = 12;
	const toAdd = totalLetters - letterPool.length;
	const bonusLetters: string[] = [];

	for (let i = 0; i < toAdd; i++) {
		const toAdd = randomProportionLetter();
		letterPool.push(toAdd);
		bonusLetters.push(toAdd);
	}
	const rack = shuffleArray(letterPool) as TLetterDef[];

	// const boardDef = getBoard(randInt(0, 10000));

	// const numBlackSquares = Math.round((25 - totalLetters) * density);
	// for (let i = 0; i < 25; i++) {
	// 	if (i < numBlackSquares) {
	// 		boardDef.push("#");
	// 	} else {
	// 		boardDef.push("");
	// 	}
	// }

	// boardDef = shuffleArray(boardDef);

	const gameCandidate = { boardDef, rackDef: rack, sourceWords: [w1, w2], bonusLetters };
	// const gameCandidate: TExtendedGameDef = {
	// 	boardDef: ["", "", "", "#", "", "", "", "", "", "#", "", "", "", "", "", "", "", "", "", "", "", "#", "", "", ""],
	// 	rackDef: ["O", "D", "N", "T", "K", "D", "E", "A", "N", "O", "A", "E"],
	// 	sourceWords: ["NAKED", "NAKED"],
	// 	bonusLetters: ["O", "O", "T"],
	// };
	console.log("checking this game candidate");
	console.log(gameCandidate);

	if (isSolvable(gameCandidate)) {
		return gameCandidate;
	} else {
		// console.error("unsolvable TM");
		if (depth > 5) {
			console.error("No solution findable, trying again");
			return newGame(opts, depth + 1);
		}
		console.error("!!!!!!! Moving to new keyLetter");
		return newGame({ ...opts, keyLetter: "S" });
		// throw Error("oops");
		// return newGame({ ...opts, density: Math.max(0, opts.density - 0.1) });
	}
}

function permutator<T>(inputArr: Array<T>): Array<Array<T>> {
	let result: Array<Array<T>> = [];

	const permute = (arr: Array<T>, m = []) => {
		if (arr.length === 0) {
			result.push(m);
		} else {
			for (let i = 0; i < arr.length; i++) {
				let curr = arr.slice();
				let next = curr.splice(i, 1);
				//@ts-ignore
				permute(curr.slice(), m.concat(next));
			}
		}
	};

	permute(inputArr);

	return result;
}

export function isSolvable(arg: TExtendedGameDef) {
	const { boardDef, rackDef, sourceWords, bonusLetters } = arg;
	const tiles: string[] = [...rackDef];
	for (let i = tiles.length; i < 25; i++) {
		tiles.push("");
	}

	const boardState: TRenderedBoardState = JSON.parse(JSON.stringify(boardDef));

	const row = getFirst5Row(boardDef);
	const col = getFirst5Col(boardDef);

	fillRow(boardState, sourceWords[0], row);
	fillCol(boardState, sourceWords[1], col);

	const remainingRack = [...bonusLetters];
	const toPermute = [...bonusLetters];

	console.log("TO PERMUTE");
	console.log(toPermute);

	const allLetterOrders = permutator(remainingRack);
	console.log(allLetterOrders);

	const squaresToFill: number[] = [];

	boardState.forEach((l, index) => {
		if (l === "") {
			squaresToFill.push(index);
		}
	});

	const allLetterPositions = k_combinations(squaresToFill, remainingRack.length);
	const filteredLetterPositions = allLetterPositions.filter((positions) => {
		const test = [...boardState];
		positions.forEach((p) => (test[p] = "L"));
		return !check1Islands(test);
	});

	let solveAttempt: TRenderedBoardState = [];
	let skippedPositions = 0;
	let solved = false;

	outerLoop: for (let posIndex = 0; posIndex < filteredLetterPositions.length; posIndex++) {
		for (let orderIndex = 0; orderIndex < allLetterOrders.length; orderIndex++) {
			solveAttempt = [...boardState];
			const letterPosition = filteredLetterPositions[posIndex];
			const letterOrder = allLetterOrders[orderIndex];

			for (let i = 0; i < letterOrder.length; i++) {
				solveAttempt[letterPosition[i]] = letterOrder[i] as TLetterDef;
			}
			const errors = checkErrors(solveAttempt);

			if (!errors.length) {
				solved = true;
				break outerLoop;
			}
		}
	}

	console.log({ skippedPositions });

	if (solved) {
		console.log("SOLUTION FOUND");
		console.log(boardTo2DArray(solveAttempt));
		return true;
	}
}

export function fillArray(n: number) {
	const arr: number[] = [];

	for (let i = 0; i < n; i++) {
		arr.push(i);
	}
	return arr;
}

function fillRow(board: TRenderedBoardState, word: string, row: number) {
	const i1 = row * 5;
	const i2 = i1 + 1;
	const i3 = i1 + 2;
	const i4 = i1 + 3;
	const i5 = i1 + 4;

	const indices = [i1, i2, i3, i4, i5];

	indices.forEach((squareIndex, wordIndex) => {
		board[squareIndex] = word.charAt(wordIndex) as TLetterDef;
	});
}

function fillCol(board: TRenderedBoardState, word: string, col: number) {
	const i1 = col;
	const i2 = i1 + 5;
	const i3 = i1 + 10;
	const i4 = i1 + 15;
	const i5 = i1 + 20;

	const indices = [i1, i2, i3, i4, i5];

	indices.forEach((squareIndex, wordIndex) => {
		board[squareIndex] = word.charAt(wordIndex) as TLetterDef;
	});
}

export function randomProportionLetter() {
	const letters = [..."ZJXQKVBPGWYFCULDRHAINOSTE"];
	const values = [
		200, 400, 400, 500, 800, 1200, 1600, 1700, 1700, 2000, 2000, 2500, 3000, 3000, 3400, 4000, 4400, 6200, 6400, 8000,
		8000, 8000, 8000, 8000, 9000, 9000,
	];

	const max = values.reduce((prev, curr) => prev + curr, 0);

	const choice = randInt(0, max);

	let letter = "E";
	let runningTotal = 0;

	letters.some((candidateLetter, index) => {
		runningTotal = runningTotal + values[index];
		if (choice < runningTotal) {
			letter = candidateLetter;
			return true;
		}
		return false;
	});

	return letter;
}

function k_combinations<T>(set: Array<T>, k: number): Array<Array<T>> {
	var i, j, combs, head, tailcombs;
	if (k > set.length || k <= 0) {
		return [];
	}
	if (k === set.length) {
		return [set];
	}
	if (k === 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i + 1);
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}
