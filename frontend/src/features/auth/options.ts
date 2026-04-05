import { mutationOptions } from "@tanstack/react-query";

import { apiRequest } from "@/lib/api";

import type { AuthCredentials, AuthResponse } from "./types";

export const authMutationKeys = {
	login: ["auth", "login"] as const,
	signup: ["auth", "signup"] as const,
	logout: ["auth", "logout"] as const,
};

type ApiResult<T> = Awaited<ReturnType<typeof apiRequest<T>>>;

function unwrapResult<T>(result: ApiResult<T>) {
	if (!result.success) {
		throw result.error;
	}

	return result.data;
}

export const loginOptions = () =>
	mutationOptions({
		mutationKey: authMutationKeys.login,
		mutationFn: async (credentials: AuthCredentials) => {
			const result = await apiRequest<AuthResponse>("/user/login", {
				method: "POST",
				body: credentials,
			});

			return unwrapResult(result);
		},
	});

export const signupOptions = () =>
	mutationOptions({
		mutationKey: authMutationKeys.signup,
		mutationFn: async (credentials: AuthCredentials) => {
			const result = await apiRequest<AuthResponse>("/user/signup", {
				method: "POST",
				body: credentials,
			});

			return unwrapResult(result);
		},
	});

export const logoutOptions = (signOut: () => Promise<void>) =>
	mutationOptions({
		mutationKey: authMutationKeys.logout,
		mutationFn: async () => signOut(),
	});
