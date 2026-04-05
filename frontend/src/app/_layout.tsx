import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";
import {
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { Uniwind } from "uniwind";
import "../../global.css";
import { AuthProvider } from "@/context/auth-context";
import { queryClient } from "@/lib/query-client";

SplashScreen.preventAutoHideAsync();
Uniwind.setTheme("system");

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		"DM Sans": DMSans_400Regular,
		"DM Sans Medium": DMSans_500Medium,
		"DM Sans Bold": DMSans_700Bold,
	});

	useEffect(() => {
		if (fontsLoaded || fontError) {
			void SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="login" options={{ headerShown: false }} />
					<Stack.Screen name="signup" options={{ headerShown: false }} />
					<Stack.Screen
						name="(tabs)"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="(modals)/create-habit"
						options={{ presentation: "modal", title: "Create Habit" }}
					/>
					<Stack.Screen
						name="(modals)/profile"
						options={{ presentation: "card", title: "Profile Page" }}
					/>
				</Stack>
				<StatusBar style="auto" />
			</AuthProvider>
		</QueryClientProvider>
	);
}
