// import clientPromise from "@/app/lib/db"

import { mockProjects } from "@/app/lib/projects";
import { findOneUser, mockUser } from "@/app/lib/users";



export default async function Page(
	{ 
		params
	}: {
		params: Promise<{ userId: string}>
	}) {
		await mockUser();
		await mockProjects();
		const { userId } = await params
		const user = await findOneUser(userId);
		console.log(user);

	return (
		<div>
			<div>{user!.name}</div>
			<div>{user!.age}</div>
			<div>{user!.school}</div>
			<div>{user!.phoneNumber}</div>
		</div>
		
	)
}
