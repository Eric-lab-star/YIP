import { createSmartFactoryCollection } from "../lib/books/smartFactory"

export default async function Page() {
	await createSmartFactoryCollection();

	return (
		<div className="">
		play
		</div>
	)
}


