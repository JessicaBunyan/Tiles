import cx from "classnames";
import { ReactNode, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearActiveTile } from "../../activeTileSlice";
import { placeTile } from "../../gameSlice";
import { selectActiveTile, selectBoardState, selectValidWordSquares } from "../../selectors";
import Tile from "../Tile";
import styles from "./Square.module.scss";

type Props = { index: number };

const Square = ({ index }: Props) => {
	const activeTile = useSelector(selectActiveTile);

	const letter = useSelector(selectBoardState)[index];
	const validWordIndices = useSelector(selectValidWordSquares);
	const isPartOfValidWord = validWordIndices.indexOf(index) !== -1;
	const dispatch = useDispatch();

	const onClick = useCallback(() => {
		if (activeTile !== undefined) {
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
		default:
			contents = <Tile id={letter} />;
			break;
	}

	return (
		<td className={cx(styles.square, { [styles.blocked]: letter === "#", [styles.inValidWord]: isPartOfValidWord })}>
			{contents}
		</td>
	);
};

export default Square;
