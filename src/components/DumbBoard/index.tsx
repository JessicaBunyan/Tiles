import cx from "classnames";
import { boardTo2DArrayTransposed } from "../../utils/boardTo2d";
import styles from "./Board.module.scss";

type Props = { state: TSquareState[] };

const DumbBoard = ({ state }: Props) => {
	const data = boardTo2DArrayTransposed(state);

	return (
		<div style={{ position: "relative" }}>
			<table className={styles.table}>
				<tbody>
					{data.map((row) => {
						return (
							<tr>
								{row.map((l) => (
									<td className={cx(styles.square, { [styles.blocked]: l === "#" })}></td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default DumbBoard;
