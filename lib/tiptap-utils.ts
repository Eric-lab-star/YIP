export function getUnusedKeys(keysA: string[], keysB: string[]) {
	return keysA.filter(k => !keysB.includes(k))
}
