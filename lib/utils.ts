import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}


export function formatPhoneNumber(input: string) {
	const digits = input.replace(/-/g, "");
	switch (true) {
		case digits.length < 4:
			return digits;

		case digits.length < 8:
			return digits.replace(/(\d{3})(\d{1,4})/, "$1-$2");

		default:
			return digits.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
	}
}


