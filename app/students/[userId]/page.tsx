import { getUserData } from "@/app/lib/users"

export default async function Page(
	{ 
		params
	}: {
		params: Promise<{ userId: string}>
	}) {
		const { userId } = await params
		const user = await getUserData(userId);


	return (
		<div>
		{user && <div>{user.name}</div>}
		{user && <div>{user.school}</div>}
		</div>
	)
}
