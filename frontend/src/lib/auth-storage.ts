import * as SecureStore from "expo-secure-store";

import type { AuthUser } from "@/features/auth/types";

type StoredAuth = {
	token: string;
	user: AuthUser;
};

const AUTH_KEY = "habit-tracker.auth";

export const authStorage = {
	async get(): Promise<StoredAuth | null> {
		const value = await SecureStore.getItemAsync(AUTH_KEY);
		if (!value) {
			return null;
		}

		return JSON.parse(value) as StoredAuth;
	},
	async set(auth: StoredAuth) {
		await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(auth));
	},
	async clear() {
		await SecureStore.deleteItemAsync(AUTH_KEY);
	},
};
