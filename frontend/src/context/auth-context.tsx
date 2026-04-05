import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { AuthUser } from "@/features/auth/types";
import { authStorage } from "@/lib/auth-storage";

type AuthContextValue = {
	user: AuthUser | null;
	token: string | null;
	isLoading: boolean;
	isSignedIn: boolean;
	signIn: (params: { token: string; user: AuthUser }) => Promise<void>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		async function hydrateAuth() {
			const storedAuth = await authStorage.get();
			if (!isMounted) {
				return;
			}

			setToken(storedAuth?.token ?? null);
			setUser(storedAuth?.user ?? null);
			setIsLoading(false);
		}

		void hydrateAuth();

		return () => {
			isMounted = false;
		};
	}, []);

	const value: AuthContextValue = {
		user,
		token,
		isLoading,
		isSignedIn: Boolean(user && token),
		signIn: async ({ token: nextToken, user: nextUser }) => {
			setToken(nextToken);
			setUser(nextUser);
			await authStorage.set({ token: nextToken, user: nextUser });
		},
		signOut: async () => {
			setToken(null);
			setUser(null);
			await authStorage.clear();
		},
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}

	return context;
}
