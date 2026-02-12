"use client";

import { createContext, useContext, useMemo, useState } from "react";


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

export function useAuthCtx() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error("AuthContext Wrapper isn't found")
	return ctx
}

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
