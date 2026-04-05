import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { logoutOptions } from "@/features/auth/options";

export default function ProfileScreen() {
	const { user, signOut } = useAuth();
	const queryClient = useQueryClient();

	const logoutMutation = useMutation({
		...logoutOptions(signOut),
		onSuccess: async () => {
			queryClient.clear();
			router.replace("/login");
		},
	});

	return (
		<View className="flex-1 bg-background px-4 py-4">
			<Card className="gap-4">
				<Text className="font-sans text-2xl font-bold text-foreground">
					Profile
				</Text>
				<Text className="font-sans text-foreground">
					Signed in as {user?.name ?? "Unknown"}
				</Text>
				<Button
					title={logoutMutation.isPending ? "Logging out..." : "Logout"}
					variant="destructive"
					onPress={() => {
						logoutMutation.mutate();
					}}
					disabled={logoutMutation.isPending}
				/>
			</Card>
		</View>
	);
}
