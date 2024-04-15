import { useSelector } from "react-redux";
import { selectActiveTile, selectCurrentRack, selectErrorFeedback } from "../../../selectors";

type Props = {};

const FeedbackLayer = (props: Props) => {
	const hasActiveTile = !!useSelector(selectActiveTile);
	const errorFeedback = useSelector(selectErrorFeedback);

	const allTilesPlaced = useSelector(selectCurrentRack).length === 0;

	return (
		<>
			{!hasActiveTile &&
				allTilesPlaced &&
				errorFeedback.map((e, index) => {
					return (
						<div
							key={index}
							style={{
								position: "absolute",
								top: e.position[0] * 61,
								left: e.position[1] * 61,
								height: e.height * 61,
								width: e.width * 61,
								// outline: "solid 2px red",
								pointerEvents: "none",
								boxShadow: "0 0 12px red inset",
							}}
						/>
					);
				})}
		</>
	);
};

export default FeedbackLayer;
