import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "default";
	children: ReactNode;
};

function Button({ variant, children, ...htmlProps }: Props) {
	return (
		<button {...htmlProps} className={styles.button}>
			{children}
		</button>
	);
}

export default Button;
