import { joinProjToUser } from "@/app/lib/projToUser";

export default async function Page({ params }: {
	params: Promise<{userId: string}>
}) {
	try {

		const {userId} = await params;
		const user = await joinProjToUser(userId);
		if (!user ) {
			throw new Error("Could not find joined collection")
		}
		console.log(user)
	
		return (
			<div> 
				<div> {user.name} </div>
				<div> {user.age} </div>
				<div> {user.projectDetails?.map((ps, i) => <div key={i}>{ps.name}<div> {ps.description}</div></div>)} </div>
			</div>
		)
	} catch (e) {
		console.log(e);
		return <div>somethins went wrong</div>
	}
}


