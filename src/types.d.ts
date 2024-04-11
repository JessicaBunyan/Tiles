type Props = { letter: string };

type TSquareDef = "" | "#" | "*";

type TLetterDef =
	| "A"
	| "B"
	| "C"
	| "D"
	| "E"
	| "F"
	| "G"
	| "H"
	| "I"
	| "J"
	| "K"
	| "L"
	| "M"
	| "N"
	| "O"
	| "P"
	| "Q"
	| "R"
	| "S"
	| "T"
	| "U"
	| "V"
	| "W"
	| "X"
	| "Y"
	| "Z";
type TSquareState = TSquareDef | number;

type TIdPortion = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
type TTileId = `${TLetterDef}${TIdPortion}`;
type TBoardDef = TSquareDef[];
type TBoardState = TSquareState[];

type TRackDef = TLetterDef[];

type TFoundWord = {
	direction: "H" | "V";
	word: string;
	pos: number[];
};

type TBoardDescription = {
	words: TFoundWord[];
	singletons: TFoundWord[];
};

type TGameDef = {
	boardDef: TBoardDef;
	rackDef: TRackDef;
};
