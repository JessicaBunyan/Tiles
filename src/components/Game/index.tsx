import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialiseGame } from "../../gameSlice";
import { selectBoardState, selectHasWon } from "../../selectors";
import { newGame } from "../../utils/newGame";
import Board from "../Board";
import BoardViewer from "../BoardViewer";
import Rack from "../Rack";
import RackControls from "../RackControls";
import WinMessage from "../WinMessage";

// nostalgia
// eslint-disable-next-line
const staticGame: TGameDef = {
	boardDef: ["", "", "", "#", "", "", "", "", "", "#", "", "", "", "", "", "", "", "", "", "", "", "#", "", "", ""],
	// rackDef: ["A", "C", "E", "C"],
	rackDef: ["A", "C", "E", "C", "H", "T", "I", "O", "S", "C"],
};

const game = newGame({ date: new Date(), keyLetter: "E" });

const Game = () => {
	const dispatch = useDispatch();
	const hasWon = useSelector(selectHasWon);

	useEffect(() => {
		dispatch(initialiseGame(game));
	}, [dispatch]);

	const boardState = useSelector(selectBoardState);

	//  TODO router
	const boardViewer = window.location.href.split("/").pop() === "boards";

	if (boardViewer) {
		return <BoardViewer />;
	}

	return (
		<div id="game">
			<h1>Make a valid scrabble board</h1>
			<h2>
				Click tile then click the board to place it. <br /> Drag and drop coming soonTM
			</h2>

			{hasWon && <WinMessage />}

			<Board state={boardState} />

			<Rack />
			<RackControls />
			{/* <button onClick={check}>Check</button> */}
		</div>
	);
};

export default Game;
