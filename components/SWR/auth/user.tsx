import { ValidationFail, ValidationSuccess } from "@/app/lib/auth/login";
import useSWR from "swr";

async function userFetcher(url: string)  {
	const res = await fetch(url)
	const json:  ValidationFail | ValidationSuccess  = await res.json()
	return json
}


export default function useUser() {
	const {data, isLoading, mutate} = useSWR("/api/auth/user", userFetcher)
	console.log(data)
	return {
		user: data,
		isLoading,
		userMutate: mutate
	}
	
}
