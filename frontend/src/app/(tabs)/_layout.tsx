import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
	return (
		<NativeTabs minimizeBehavior="onScrollDown">
			<NativeTabs.Trigger name="home">
				<NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf={"house"} md="home" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="habits">
				<NativeTabs.Trigger.Label>Habits</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf={"list.bullet"} md="list" />
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
