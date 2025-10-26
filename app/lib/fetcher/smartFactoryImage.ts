
import useSWR from "swr";
import { IsmartFactory } from "../books/smartFactory";

interface Ibook extends IsmartFactory {
	url: string;
}

async function bookDataFetcher(url: string) {
	const res = await fetch(url)
	const json: Ibook = await res.json();
	return json
}

export function getBookData(key: string) {
	const {data, error, isLoading} = useSWR(
		`/api/books/smartFactory?key=${key}`, 
			bookDataFetcher
	);
	return {data, error, isLoading}
}


