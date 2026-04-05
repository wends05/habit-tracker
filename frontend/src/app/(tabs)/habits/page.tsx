import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import HomeStackToolbars from "@/components/HomeStackToolbars";

export default function HabitsScreen() {
	return (
		<ScrollView>
			<Stack.Header transparent />
			<Stack.Screen.Title asChild>
				<Text className="text-2xl font-bold">Habits</Text>
			</Stack.Screen.Title>
			<HomeStackToolbars />
			<View>
				<Text>HabitsScreen</Text>
			</View>
		</ScrollView>
	);
}
