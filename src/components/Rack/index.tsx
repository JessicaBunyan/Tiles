import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearActiveTile } from "../../activeTileSlice";
import { removeTileFromBoard } from "../../gameSlice";
import { selectActiveTile, selectCurrentRack } from "../../selectors";
import Tile from "../Tile";
import styles from "./Rack.module.scss";
import cx from "classnames";
import BinIcon from "../../icons/bin";

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
			<button onClick={reRackTile} className={cx(styles.remove, { [styles.hide]: !isActiveTileOnBoard })}>
				<BinIcon />
			</button>
			{rack.map((tileId) => (
				<Tile key={tileId} id={tileId} />
			))}
		</div>
	);
};

export default Rack;
