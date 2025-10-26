
/**
* Delays function for 0.5sec
* @param sec - delay time
*
	* */
export async function delay(time: number) {
	return new Promise<string>((resolve) => {
		setTimeout(()=>{
			return resolve("success")
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
