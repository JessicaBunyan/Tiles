import { useSelector } from "react-redux";
import { selectActiveTile, selectErrors } from "../../selectors";
import { boardTo2DArray } from "../../utils/boardTo2d";
import Square from "../Square";
import styles from "./Board.module.scss";

type Props = { state: TSquareState[] };

const Board = ({ state }: Props) => {
	const data = boardTo2DArray(state);
	const hasActiveTile = !!useSelector(selectActiveTile);

	const errors = useSelector(selectErrors);
	// const errors = [
	// 	{
	// 		direction: "H",
	// 		pos: [2, 0],
	// 		word: "EAI",
	// 	},
	// 	{
	// 		direction: "H",
	// 		pos: [2, 1],
	// 		word: "CC",
	// 	},
	// 	{
	// 		direction: "H",
	// 		pos: [1, 2],
	// 		word: "SHT",
	// 	},
	// ];

	return (
		<div style={{ position: "relative" }}>
			<table className={styles.table}>
				<tbody>
					{data.map((row, rowIndex) => {
						return (
							<tr>
								{row.map((l, colIndex) => (
									<Square index={rowIndex * 5 + colIndex} />
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
			{!hasActiveTile &&
				errors.map((e) => {
					const width = e.word.length * 61 - 1;
					return (
						<div
							style={{
								position: "absolute",
								top: e.pos[0] * 61,
								left: e.pos[1] * 61,
								height: e.direction === "H" ? 60 : width,
								width: e.direction === "V" ? 60 : width,
								// outline: "solid 2px red",
								pointerEvents: "none",
								boxShadow: "0 0 12px red inset",
							}}
						/>
					);
				})}
		</div>
	);
};

export default Board;
