export function boardTo2DArray<T>(board: T[]): T[][] {
	const r1 = board.slice(0, 5);
	const r2 = board.slice(5, 10);
	const r3 = board.slice(10, 15);
	const r4 = board.slice(15, 20);
	const r5 = board.slice(20, 25);

	return [r1, r2, r3, r4, r5];
}
