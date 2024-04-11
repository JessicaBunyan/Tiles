import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentRack, selectErrors, selectRenderedBoardState, selectWon } from "../selectors";
import { checkErrors } from "../utils/checkWin";
import winAnimation from "../utils/winAnimation";
import { setErrors, win } from "../boardSlice";

export default function useErrors() {
	const rack = useSelector(selectCurrentRack);
	const hasWon = useSelector(selectWon);
	const errors = useSelector(selectErrors);
	const renderedBoard = useSelector(selectRenderedBoardState);
	const boardStr = renderedBoard.join("");
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("boardSTR");
		console.log(boardStr);
		console.log("rack", rack);
		if (rack.length === 0 && !hasWon && !errors.length) {
			const errors = checkErrors(renderedBoard);
			console.log("checked errors: ", errors);
			if (!errors.length) {
				console.log("win!!");
				winAnimation();
				dispatch(win());
			} else {
				dispatch(setErrors(errors));
			}
		}
	}, [renderedBoard, rack, hasWon, dispatch, errors, boardStr]);
}
