import { getFirst5Col, getFirst5Row } from "./newGame";

const boardPermutations = [
	[3, 9, 21],
	[3, 9, 15],
	[3, 9, 15, 21],
	[0, 3, 9, 15, 21, 24],

	[3, 9, 15, 16, 21],
	[0, 4, 20, 24],
	[0, 4, 7, 20, 17, 24],
	[0, 4, 12, 20, 24],
	[0, 2, 4, 10, 12, 14, 20, 22, 24],
	[1, 3, 5, 9, 15, 19, 21, 23],

	[1, 9, 15, 23],
	[1, 9, 12, 15, 23],
	[0, 1, 4, 9, 15, 20, 23, 24],
	[0, 1, 4, 9, 12, 15, 20, 23, 24],

	[3, 5, 19, 21],
	[0, 3, 4, 5, 19, 20, 21, 24],
	[0, 3, 4, 5, 12, 19, 20, 21, 24],

	[3, 5, 12, 19, 21],

	[2, 10, 12, 14, 22],

	[6, 8, 16, 18],

	[0, 12, 24],

	[0, 1, 2, 5, 6, 10],
	[0, 1, 2, 5, 6, 10, 24],

	[8, 10, 12, 15, 20, 21, 22],

	[3, 9, 10, 15, 20, 21, 22],

	[0, 4, 8, 15, 20, 21, 24],

	[0, 2, 10, 12, 24],
	[2, 10, 12, 24],
	[1, 5, 12, 24],
	[1, 5, 18, 24],
	[1, 4, 5, 18, 20, 24],
];

export const allBoards = getAllBoardPermutations(boardPermutations);
export const all55CrossBoards = allBoards.filter(
	(b) => getFirst5Col(squarePositionsToBoardDef(b)) !== -1 && getFirst5Row(squarePositionsToBoardDef(b)) !== -1,
);

function getAllBoardPermutations(boardLayouts: number[][]): number[][] {
	const allBoards: number[][] = [];
	boardLayouts.forEach((b) => {
		const origString = b.sort().join("-");
		const r1 = rotate90(b);
		const r2 = rotate90(r1);
		const r3 = rotate90(r2);

		allBoards.push(b);

		if (r1.sort().join("-") !== origString) {
			allBoards.push(r1);
		}
		if (r2.sort().join("-") !== origString) {
			allBoards.push(r2);
		}
		if (r3.sort().join("-") !== origString) {
			allBoards.push(r3);
		}
	});
	return allBoards;
}

function rotate90(arr: number[]) {
	const output = arr.map((a) => {
		const col = a % 5;
		const row = 4 - Math.floor(a / 5);
		return col * 5 + row;
	});

	return output;
}

export function getBoard(seed: number): TBoardDef {
	const b = selectBoard(seed);
	return squarePositionsToBoardDef(b);
}

function selectBoard(seed: number) {
	//TODO include non 5cross boards
	return all55CrossBoards[seed % allBoards.length];
}

export function squarePositionsToBoardDef(positions: number[]): TBoardDef {
	const def: TBoardDef = [];

	for (let i = 0; i < 25; i++) {
		if (positions.indexOf(i) === -1) {
			def.push("");
		} else {
			def.push("#");
		}
	}

	return def;
}
