import randInt from "./randInt";

import englishDictionary from "../englishDictionary";
import shuffleArray from "./shuffleArray";
type TCreateGameOptions = {
	date: Date;
	keyLetter: TLetterDef;
	density: number;
};

export function getGameSeed(date: Date): TCreateGameOptions {
	const d = new Date("2020-01-01T00:00:01+0000");

	const ms = date.getTime() - d.getTime();
	const days = ms / (1000 * 60 * 60 * 24);

	console.log(days);

	return {
		date,
		keyLetter: "E",
		density: 0.4,
	};
}

export function newGame(opts: TCreateGameOptions): TGameDef {
	const density = opts.density;

	// TODO do imports better
	const letterDict = require(`../dictionaries/${opts.keyLetter.toLowerCase()}Dictionary`).default;

	const max = letterDict.length;
	console.log(letterDict);
	console.log(max);

	// TODO seed this
	const n1 = randInt(0, max - 1);
	const n2 = randInt(0, max - 1);

	const w1 = letterDict[n1].toUpperCase();
	const w2 = letterDict[n2].toUpperCase();

	console.log("==========");
	console.log("==========");
	console.log(w1);
	console.log(w2);

	const letterPool = [...w1, ...w2];
	const totalLetters = 12;
	const toAdd = totalLetters - letterPool.length;

	for (let i = 0; i < toAdd; i++) {
		letterPool.push(randomProportionLetter());
	}
	const rack = shuffleArray(letterPool);

	let boardDef: TBoardDef = [];

	const numBlackSquares = Math.round((25 - totalLetters) * density);
	for (let i = 0; i < 25; i++) {
		if (i < numBlackSquares) {
			boardDef.push("#");
		} else {
			boardDef.push("");
		}
	}

	boardDef = shuffleArray(boardDef);

	const gameCandidate = { boardDef, rackDef: rack };

	if (isSolvable(gameCandidate)) {
		return gameCandidate;
	} else {
		return newGame({ ...opts, density: Math.max(0, opts.density - 0.1) });
	}
}

export function isSolvable(arg: TGameDef) {
	return true;
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
	});

	return letter;
}
