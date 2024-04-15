export function indexToXY(index: number): XY {
	return [Math.floor(index / 5), index % 5];
}
