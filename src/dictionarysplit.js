const fs = require("node:fs");
const readline = require("readline");
const englishDictionary = require("./englishDictionary.js");

const dict = new Set(englishDictionary);

async function read() {
	const stream = fs.createReadStream("5000.txt", "utf-8");
	const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

	const byLetter = {};

	for await (const line of rl) {
		const word = line.split("\t")[0].trim();
		console.log("word", word);
		if (word.length > 5 || word.length < 4 || !dict.has(word)) {
			console.log("skipping");
			continue;
		}

		for (let i = 0; i < word.length; i++) {
			const char = word.charAt(i);
			if (!byLetter[char]) {
				byLetter[char] = [];
			}
			byLetter[char].push(`"${word}"`);
		}
	}

	let total = 0;
	Object.entries(byLetter).map(([letter, words]) => {
		total = total + words.length;
		const string = `const ${letter}Dictionary = [${words.join(",\r\n")}]; export default ${letter}Dictionary;`;

		fs.writeFileSync(`dictionaries/${letter}Dictionary.ts`, string);
	});

	const combined = Object.values(byLetter).flat();
	const fullDictSting = `const fullDictionary = [${combined.join(",\r\n")}]; export default fullDictionary;`;

	fs.writeFileSync(`dictionaries/fullDictionary.ts`, fullDictSting);

	console.log("number of words", total);
}
read().then(() => {});

console.log(englishDictionary);
console.log(dict.has("noble"));
