import confetti from "canvas-confetti";
import randInt from "./randInt";

export default function winAnimation() {
	const duration = 5000;
	const animationEnd = Date.now() + duration;
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

	// eslint-disable-next-line
	const interval: any = setInterval(function () {
		const timeLeft = animationEnd - Date.now();

		if (timeLeft <= 0) {
			return clearInterval(interval);
		}

		const particleCount = 50 * (timeLeft / duration);
		// since particles fall down, start a bit higher than random
		confetti({ ...defaults, particleCount, origin: { x: randInt(1, 3) / 10, y: Math.random() - 0.2 } });
		confetti({ ...defaults, particleCount, origin: { x: randInt(7, 9) / 10, y: Math.random() - 0.2 } });
	}, 250);
	// for (let i = 0; i < 5; i++) {
	// 	setTimeout(() => {
	// 		confetti({
	// 			angle: randInt(30, 150),
	// 			spread: 70,
	// 			particleCount: randInt(50, 150),
	// 			origin: { y: 0.6 },
	// 		});
	// 	}, i * randInt(200, 500));
	// }
}
