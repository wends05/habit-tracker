import { Redirect } from "expo-router";

import { useAuth } from "@/context/auth-context";

export default function IndexScreen() {
	const { isLoading, isSignedIn } = useAuth();

	if (isLoading) {
		return null;
	}

	return <Redirect href={isSignedIn ? "/(tabs)/home" : "/login"} />;
}
