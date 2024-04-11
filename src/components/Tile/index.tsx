import cx from "classnames";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTile } from "../../activeTileSlice";
import { setErrors } from "../../boardSlice";
import { selectActiveTile, selectRackDef } from "../../selectors";
import styles from "./Tile.module.scss";

type Props = { id: number };

const Tile = ({ id }: Props) => {
	const dispatch = useDispatch();
	const activeTile = useSelector(selectActiveTile);
	const letter = useSelector(selectRackDef)[id];

	const isActive = activeTile === id;

	const onClick = useCallback(() => {
		dispatch(setErrors([]));
		dispatch(setActiveTile(id));
		dispatch(setErrors([]));
	}, [id, dispatch]);

	return (
		<button className={cx(styles.tile, { [styles.active]: isActive })} onClick={onClick}>
			{letter}
		</button>
	);
};

export default Tile;
