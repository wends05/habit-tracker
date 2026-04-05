import { Redirect, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { loginOptions } from "@/features/auth/options";
import { AuthForm } from "@/features/auth/components/auth-form";

export default function LoginScreen() {
	const { isLoading, isSignedIn, signIn } = useAuth();

	const loginMutation = useMutation({
		...loginOptions(),
		onSuccess: async (response) => {
			await signIn({
				token: response.token,
				user: response.user,
			});
			router.replace("/");
		},
	});

	if (isLoading) {
		return null;
	}

	if (isSignedIn) {
		return <Redirect href="/" />;
	}

	return (
		<AuthForm
			title="Welcome back"
			description="Log in with your username and password."
			submitLabel="Sign in"
			footerLabel="Need an account?"
			footerActionLabel="Sign up"
			footerActionHref="/signup"
				onSubmit={async (values) => {
					loginMutation.mutate(values);
				}}
				isPending={loginMutation.isPending}
				errorMessage={loginMutation.error instanceof Error ? loginMutation.error.message : null}
			/>
	);
}
