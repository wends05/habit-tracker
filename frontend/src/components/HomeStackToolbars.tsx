import { router, Stack } from "expo-router";

export default function HomeStackToolbars() {
	const goToProfile = () => {
		router.push("/profile");
	};

	const goToCreateHabit = () => {
		router.push("/create-habit");
	};
	return (
		<Stack.Toolbar placement="right">
			<Stack.Toolbar.Button icon={"plus"} onPress={goToCreateHabit} />
			<Stack.Toolbar.Button icon={"person"} onPress={goToProfile} />
		</Stack.Toolbar>
	);
}
