import React from "react";
import DumbBoard from "../DumbBoard";
import { all55CrossBoards, squarePositionsToBoardDef } from "../../utils/getBoard";

type Props = {};

const BoardViewer = (props: Props) => {
	return (
		<>
			{all55CrossBoards.map((board) => (
				<div style={{ margin: "1rem" }}>
					<p>{board.join(",")}</p>
					<DumbBoard state={squarePositionsToBoardDef(board)} />
				</div>
			))}
		</>
	);
};

export default BoardViewer;
