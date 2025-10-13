export default async function page({
	params
}: {
	params: Promise<{doc: string}>
}){
	const {doc} = await params
	return (
		<div>{doc}</div>
	)
}
