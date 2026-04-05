import { Redirect, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { signupOptions } from "@/features/auth/options";
import { AuthForm } from "@/features/auth/components/auth-form";

export default function SignupScreen() {
	const { isLoading, isSignedIn, signIn } = useAuth();

	const signupMutation = useMutation({
		...signupOptions(),
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
			title="Create account"
			description="Pick a username and password."
			submitLabel="Create account"
			footerLabel="Already have an account?"
			footerActionLabel="Log in"
			footerActionHref="/login"
				onSubmit={async (values) => {
					signupMutation.mutate(values);
				}}
				isPending={signupMutation.isPending}
				errorMessage={signupMutation.error instanceof Error ? signupMutation.error.message : null}
			/>
	);
}
