import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import HomeStackToolbars from "@/components/HomeStackToolbars";

export default function HomeScreen() {
	return (
		<ScrollView>
			<Stack.Header transparent />
			<Stack.Screen.Title asChild>
				<Text className="text-2xl font-bold">Home</Text>
			</Stack.Screen.Title>
			<HomeStackToolbars />
			<View>
				<Text>Hello world</Text>
			</View>
		</ScrollView>
	);
}
