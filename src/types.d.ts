type Props = { letter: string };

type TSquareDef = "" | "#";

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
type TRenderedSquareState = TLetterDef | "#" | "";

type TIdPortion = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
type TTileId = `${TLetterDef}${TIdPortion}`;
type TBoardDef = TSquareDef[];
type TBoardState = TSquareState[];

type TRenderedBoardState = TRenderedSquareState[];

type TRackDef = TLetterDef[];

type TFoundWord = {
	direction: "H" | "V";
	word: string;
	pos: XY;
};

type TGameValidity = {
	isValid: boolean;
	errors: TErrorInfo;
	validWords: TFoundWord[];
};

type TErrorInfo = {
	count: number;
	invalidWords: TFoundWord[];
	islands: XY[];
};

type TFeedbackIndicator = {
	position: XY;
	width: number;
	height: number;
	type: "ISLAND" | "INVALID_WORD" | "VALID_WORD";
};

type TGameDef = {
	boardDef: TBoardDef;
	rackDef: TRackDef;
};

type TExtendedGameDef = TGameDef & {
	sourceWords: string[];
	bonusLetters: string[];
};

type XY = [number, number];
