import englishDictionary from "../englishDictionary";
import { get1Islands } from "../gameLogic/getIslands";
import { getWordsFromBoard } from "../gameLogic/getWords";

const englishDict = new Set(englishDictionary);
export function getBoardValidity(boardState: Array<TLetterDef | "" | "#">): TGameValidity {
	const islands = get1Islands(boardState);
	const words = getWordsFromBoard(boardState);

	const invalidWords: TFoundWord[] = [];
	const validWords: TFoundWord[] = [];
	words.forEach((w) => {
		// console.log("checking word: ", w);
		if (englishDict.has(w.word.toLowerCase())) {
			validWords.push(w);
		} else {
			invalidWords.push(w);
		}
	});

	const errors: TErrorInfo = {
		islands,
		invalidWords,
		count: islands.length + invalidWords.length,
	};

	return {
		errors,
		isValid: errors.count === 0,
		validWords,
	};
}
