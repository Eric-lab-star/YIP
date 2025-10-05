import { findOneProject,mockProjects, Projects } from "@/app/lib/projects";
import { findOneUser, getCurrentProject, mockUser } from "@/app/lib/users";
import { WithId } from "mongodb";

export default async function Page(
	{ 
		params
	}: {
		params: Promise<{ userId: string}>
	}) {
		// await mockUser();
		// await mockProjects();
		const { userId } = await params
		// const user = await findOneUser(userId);
		// const proj = await findOneProject("스마트 팩토리")
		// let currentProj: WithId<Projects>|null|undefined;
		// if (proj && user) {
		// 	user.currentProj.push(proj._id);
		// 	currentProj = await getCurrentProject(user)
		// }


	return (
		<div>{userId} </div>
	)
}
