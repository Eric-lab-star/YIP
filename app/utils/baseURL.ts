import { headers } from "next/headers";

export default async function getBaseURL(){
	const host = (await headers()).get("host");
	const url = process.env.NODE_ENV === "development" ?
		`http://${host}` : `https://${host}`;
	return url
}
