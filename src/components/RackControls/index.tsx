import React, { useCallback } from "react";
import styles from "./RackControls.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { resetGame, shuffleRack } from "../../gameSlice";
import Button from "../Button";
import { selectHasWon } from "../../selectors";

const RackControls = () => {
	const dispatch = useDispatch();

	const hasWon = useSelector(selectHasWon);

	const shuffle = useCallback(() => {
		dispatch(shuffleRack());
	}, [dispatch]);
	const reset = useCallback(() => {
		dispatch(resetGame());
	}, [dispatch]);

	if (hasWon) {
		return (
			<div className={styles.rackControls}>
				<Button onClick={() => window.location.reload()}>New</Button>
			</div>
		);
	}
	return (
		<div className={styles.rackControls}>
			<Button onClick={shuffle}>Shuffle</Button>
			<Button onClick={reset}>Reset</Button>
		</div>
	);
};

export default RackControls;
