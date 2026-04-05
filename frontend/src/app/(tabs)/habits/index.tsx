import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import HomeStackToolbars from "@/components/HomeStackToolbars";
import HabitsList from "@/features/habits/components/HabitsList";

export default function HabitsScreen() {

	return (
		<ScrollView className="flex-1 bg-background">
			<Stack.Header transparent />
			<Stack.Screen.Title asChild>
				<Text className="font-sans text-2xl font-bold text-foreground">
					Habits
				</Text>
			</Stack.Screen.Title>
			<HomeStackToolbars />
			<View className="bg-background px-4 py-4">
				<HabitsList/>
			</View>
		</ScrollView>
	);
}
