"use client";

import { createContext, useMemo, useState } from "react";


export interface userContext {
	loggedIn: boolean,
	id?: string,
	name?: string,
	setUser?: (userCtx:userContext) => void;
}

export interface authProviderProp {
	userCtx: userContext
	children: React.ReactNode
}


export const AuthContext = createContext<userContext>({
		loggedIn: false,
	});


export default function AuthProvider({userCtx, children}: authProviderProp){
	const [user, setUser] = useState<userContext>(userCtx)
	const value = useMemo(() => ({
		...user,
		setUser: setUser
	}),[user])

	return (
		<AuthContext value={value}>
			{children}
		</AuthContext>
	)
}
