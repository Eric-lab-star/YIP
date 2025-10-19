
type Result<T> = { ok: true; value: T} | { ok: false; error: Error}
type AsyncResult<T> = Promise<Result<T>>

export function safe<T>(fn: ()=> T): Result<T> {
	try {
		return { ok: true, value: fn() };
		
	} catch (error) {
		return { ok: false, error: error instanceof Error ? error : new Error(String(error))}
	}
}


export async function safeAsync<T>(fn: () => Promise<T>): AsyncResult<T> {
	try {
		const value = await fn()
		return { ok: true, value}
	} catch(err) {
		return {ok: false, error: err instanceof Error ? err : new Error(String(err)) }
	}
}

export function unwrap<T>(result: Result<T>): T {
	if(!result.ok) throw result.error;
	return result.value;
}
