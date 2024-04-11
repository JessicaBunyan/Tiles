import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearActiveTile } from "../../activeTileSlice";
import { removeTileFromBoard } from "../../boardSlice";
import { selectActiveTile, selectCurrentRack } from "../../selectors";
import Tile from "../Tile";
import styles from "./Rack.module.scss";

const Rack = () => {
	const rack = useSelector(selectCurrentRack);
	const activeTile = useSelector(selectActiveTile);
	const isActiveTileOnBoard = activeTile !== undefined && !rack.includes(activeTile);
	const dispatch = useDispatch();

	const reRackTile = useCallback(() => {
		if (isActiveTileOnBoard) {
			dispatch(removeTileFromBoard(activeTile));
			dispatch(clearActiveTile());
		}
	}, [dispatch, activeTile, isActiveTileOnBoard]);

	return (
		<div className={styles.rack}>
			{rack.map((tileId) => (
				<Tile id={tileId} />
			))}
			{isActiveTileOnBoard && (
				<button onClick={reRackTile} className={styles.remove}>
					x
				</button>
			)}
		</div>
	);
};

export default Rack;
