import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import HomeStackToolbars from "@/components/HomeStackToolbars";
import LogsPage from "@/features/logs/components/LogsPage";

export default function LogsScreen() {
	return (
		<ScrollView className="flex-1 bg-background">
			<Stack.Header transparent />
			<Stack.Screen.Title asChild>
				<Text className="font-sans text-2xl font-bold text-foreground">
					Logs
				</Text>
			</Stack.Screen.Title>
			<HomeStackToolbars />
			<View>
				<LogsPage />
			</View>
		</ScrollView>
	);
}
