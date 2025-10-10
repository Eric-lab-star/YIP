
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
