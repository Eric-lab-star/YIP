import { ValidationFail, ValidationSuccess } from "@/app/lib/auth/login";
import useSWR from "swr";

async function userFetcher(url: string) {
	const res = await fetch(url);
	const json: ValidationFail | ValidationSuccess = await res.json();
	return json;
}

export default function useUser() {
	// Auth state is stable for the session's lifetime, so we don't re-fetch it
	// every time the tab regains focus or the network reconnects — one request
	// per load is enough. dedupingInterval also collapses the duplicate mounts
	// (Header renders it, and other components read the same key).
	const { data, isLoading, mutate } = useSWR("/api/auth/user", userFetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 60_000,
	});
	return {
		user: data,
		isLoading,
		userMutate: mutate,
	};
}
