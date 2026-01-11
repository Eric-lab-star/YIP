import useSWR from "swr";

async function blurFetcher(url: string) {
	const res = await fetch(url)
	const json: {blurDataURL: string} = await res.json();
	return json.blurDataURL
}

export function getBlurData(imageKey: string) {
	const {data, error, isLoading} = useSWR(`/api/r2blur/${imageKey}`, blurFetcher);
	return {blurURL:data, error, isLoading}
}


