import { boardTo2DArrayTransposed } from "../../utils/boardTo2d";
import Square from "../Square";
import styles from "./Board.module.scss";
import FeedbackLayer from "./FeedbackLayer";

type Props = { state: TSquareState[] };

const Board = ({ state }: Props) => {
	const data = boardTo2DArrayTransposed(state);

	return (
		<div style={{ position: "relative" }}>
			<table className={styles.table}>
				<tbody>
					{data.map((row, rowIndex) => {
						return (
							<tr key={rowIndex}>
								{row.map((l, colIndex) => (
									<Square index={rowIndex * 5 + colIndex} />
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
			<FeedbackLayer />
		</div>
	);
};

export default Board;
