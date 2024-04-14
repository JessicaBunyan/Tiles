export function boardTo2DArray<T>(board: T[]): T[][] {
	const r1 = board.slice(0, 5);
	const r2 = board.slice(5, 10);
	const r3 = board.slice(10, 15);
	const r4 = board.slice(15, 20);
	const r5 = board.slice(20, 25);

	return [r1, r2, r3, r4, r5];
}

export function boardTo2DArrayTransposed<T>(board: T[]): T[][] {
	const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y] = board;

	return [
		[a, f, k, p, u],
		[b, g, l, q, v],
		[c, h, m, r, w],
		[d, i, n, s, x],
		[e, j, o, t, y],
	];
}
