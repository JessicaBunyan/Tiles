import cx from "classnames";
import { ReactNode, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearActiveTile } from "../../activeTileSlice";
import { placeTile, setErrors } from "../../boardSlice";
import { selectActiveTile, selectBoardState } from "../../selectors";
import Tile from "../Tile";
import styles from "./Square.module.scss";

type Props = { index: number };

const Square = ({ index }: Props) => {
	const activeTile = useSelector(selectActiveTile);

	const letter = useSelector(selectBoardState)[index];
	const dispatch = useDispatch();

	const onClick = useCallback(() => {
		console.log("in onclick");
		if (activeTile !== undefined) {
			dispatch(setErrors([]));
			dispatch(placeTile({ position: index, tileId: activeTile }));
			dispatch(clearActiveTile());
		}
	}, [activeTile, dispatch, index]);

	let contents: ReactNode = null;

	switch (letter) {
		case "":
			contents = <button onClick={() => onClick()}></button>;
			break;
		case "#":
			contents = null;
			break;
		case "*":
			contents = null;
			break;
		default:
			contents = <Tile id={letter} />;
			break;
	}

	return <td className={cx(styles.square, { [styles.blocked]: letter === "#" })}>{contents}</td>;
};

export default Square;
