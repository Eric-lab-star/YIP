
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { toast, Toaster } from "sonner";

const JWT_SECRET = process.env.JWT_SECRET!;
export default async function Layout({children}: {children: React.ReactNode}){

	return(
		<div>
			{children}
			<Toaster />
		</div>
	)
}
