"use client";

import { createContext, useContext, useMemo, useState } from "react";


interface User {
	loggedIn: boolean,
	id?: string,
	name?: string,
}

export interface userContext {
	user: User
	setUser: () => void;
}


export interface authProviderProp {
	userCtx: userContext
	children: React.ReactNode
}

export const AuthContext = createContext<userContext | null>(null);

export function useAuthCtx() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error("AuthContext Wrapper isn't found")
	return ctx
}

export default function AuthProvider({userCtx, children}: authProviderProp){
	const value = useMemo(() => ({
		...userCtx
	}),[userCtx])

	return (
		<AuthContext value={value}>
			{children}
		</AuthContext>
	)
}
