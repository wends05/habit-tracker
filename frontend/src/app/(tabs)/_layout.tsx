import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Redirect } from "expo-router";

import { useAuth } from "@/context/auth-context";

export default function TabsLayout() {
	const { isLoading, isSignedIn } = useAuth();

	if (isLoading) {
		return null;
	}

	if (!isSignedIn) {
		return <Redirect href="/login" />;
	}

	return (
		<NativeTabs minimizeBehavior="onScrollDown">
			<NativeTabs.Trigger name="home">
				<NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf={{default: "house", selected: "house.fill"}} md="home" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="habits">
				<NativeTabs.Trigger.Label>Habits</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf={"list.bullet"} md="list" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="logs">
				<NativeTabs.Trigger.Label>Logs
				</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf={"calendar"} md="calendar_view_month" />
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
