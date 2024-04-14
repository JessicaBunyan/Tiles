import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialiseBoard } from "../../boardSlice";
import useErrors from "../../hooks/useErrors";
import { initialiseRack } from "../../rackSlice";
import { selectBoardState } from "../../selectors";
import Board from "../Board";
import Rack from "../Rack";
import { newGame } from "../../utils/newGame";

const game: TGameDef = {
	boardDef: ["", "", "", "#", "", "", "", "", "", "#", "", "", "", "", "", "", "", "", "", "", "", "#", "", "", ""],
	// rackDef: ["A", "C", "E", "C"],
	rackDef: ["A", "C", "E", "C", "H", "T", "I", "O", "S", "C"],
};

// type Props{
//     gameDef: TGameDef
// }

const Game = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("CREATING GAME");
		const game = newGame({ date: new Date(), keyLetter: "E", density: 0.5 });
		console.log("GAME CREATED");
		console.log(game);

		dispatch(initialiseBoard(game.boardDef));
		dispatch(initialiseRack(game.rackDef));
	}, [dispatch]);

	const boardState = useSelector(selectBoardState);
	useErrors();

	// if (hasWon) {
	// 	return <>well done</>;
	// }
	return (
		<>
			<h1>Make a valid scrabble board</h1>
			<h2>Click tile then click the board to place it. Drag and drop coming soonTM</h2>

			<Board state={boardState} />

			<Rack />
			{/* <button onClick={check}>Check</button> */}
		</>
	);
};

export default Game;
