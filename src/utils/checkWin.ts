import { getBoardDescription } from "./getWords";
import englishDictionary from "../englishDictionary";

export function checkErrors(boardState: Array<TLetterDef | "" | "#">) {
	const { singletons, words } = getBoardDescription(boardState);

	const englishDict = new Set(englishDictionary);

	const errors: TFoundWord[] = [...singletons];
	words.forEach((w) => {
		console.log("checking word: ", w);
		if (!englishDict.has(w.word.toLowerCase())) {
			errors.push(w);
		}
	});

	return errors;
}
