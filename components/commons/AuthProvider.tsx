"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface userContext {
	user: User
	setUser: (user: User) => void;
}

export interface User {
	loggedIn: boolean,
	name?: string,
}


export const AuthContext = createContext<userContext | null>(null);

export function useAuthCtx() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error("AuthContext Wrapper isn't found")
	return ctx
}

export default function AuthProvider ({children}: {children: React.ReactNode}  ){



	const [user, setUser] = useState<User>({loggedIn: false})

	useEffect(() => {
		
		const name = window.localStorage.getItem("userName") 
		const defaultUser = name
			? {loggedIn: true, name} : {loggedIn: false}
		// setUser(defaultUser)
	},[])

 const value = useMemo(() => ({
 	user,
 }),[user])

	return (
		<AuthContext.Provider value={{setUser, user: value.user}}>
			{children}
		</AuthContext.Provider>
	)
}
