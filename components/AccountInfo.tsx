
import { getUserFromCookie } from "@/app/lib/auth";
import LoginForm from "../home/components/LoginFormnents/LoginForm";
import { LoginJWTPayload } from "@/app/lib/actions";

export default async function AccountInfo() {
	const user = await getUserFromCookie() as LoginJWTPayload
	
	return(
		<div className={`flex flex-col space-y-3 lg:col-span-2 lg:order-last md:order-first rounded-md
			p-2 md:mb-3 lg:mb-0 `}>
			{user ? <LoggedInUser user={user} /> : <LoginForm />}
			<div className="bg-amber-50 h-50 w-full rounded-md p-3"> 달력 </div>
			<div className="bg-amber-50 h-50 w-full rounded-md p-3"> 뉴스  </div>
			<div className="bg-amber-50 h-50 w-full rounded-md p-3">  상담 문의 </div>
		</div>
	)
}

