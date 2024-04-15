import React, { useEffect } from "react";
import winAnimation from "../../utils/winAnimation";

type Props = {};

const WinMessage = (props: Props) => {
	useEffect(() => {
		const anim = winAnimation();

		return () => {
			window.clearInterval(anim);
		};
	}, []);

	return <h1>Congrats!!</h1>;
};

export default WinMessage;
