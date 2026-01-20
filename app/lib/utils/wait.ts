
/**
* Delays function for <time> sec
* @param sec - delay time
*
	* */
export async function delay(time: number) {
	return new Promise(() => {
		setTimeout(()=>{
			console.info("waiting....")
		}, time)
	})
}


export function toSafeNumber(str: string|undefined) {
	if (!str ||str.trim() === "" ){
		return null
	} 
	const num = Number(str);
	return isNaN(num) ? null : num
}
