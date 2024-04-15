export function left(i: number): number | null {
	if (i % 5 === 0) {
		return null;
	} else {
		return i - 1;
	}
}
export function above(i: number): number | null {
	if (i < 5) {
		return null;
	} else {
		return i - 5;
	}
}
export function right(i: number): number | null {
	if (i % 5 === 4) {
		return null;
	} else {
		return i + 1;
	}
}
export function below(i: number): number | null {
	if (i > 19) {
		return null;
	} else {
		return i + 5;
	}
}
