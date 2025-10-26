
import useSWR from "swr";
import { IsmartFactory } from "../books/smartFactory";

interface Ibook extends IsmartFactory {
	url: string;
}

async function bookFetcher(url: string) {
	const res = await fetch(url)
	const json: Ibook = await res.json();
	return json
}


async function manyBookFetcher(url: string) {
	const res = await fetch(url)
	const json: Ibook[] = await res.json();
	return json
}



export function getBookData(key: string) {
	const {data, error, isLoading} = useSWR(
		`/api/books/smartFactory/${key}`, 
			bookFetcher,
	);
	return {data, error, isLoading}
}

export function getManyBookData(start: number, end:number,){
	const {data, error, isLoading} = useSWR(
		`/api/books/smartFactory?start=${start}&&end=${end}`,
			manyBookFetcher
	);
	return {data, error, isLoading}
	
}
