import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import "../global.css";

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="(modals)/create-habit"
					options={{ presentation: "modal" }}
				/>
				<Stack.Screen
					name="(modals)/profile"
					options={{ presentation: "card" }}
				/>
			</Stack>
			<StatusBar />
		</ThemeProvider>
	);
}
