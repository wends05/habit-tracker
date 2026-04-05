import { Text, View } from "react-native";
import type { Habit } from "../types";
import SelectButton from "./SelectButton";

const MOCK_HABITS: Habit[] = [
	{
		id: "1",
		name: "Drink water",
		category: "Health",
		effortLevel: "low",
		color: "blue",
		isCompleted: false,
	},
	{
		id: "2",
		name: "Read for 20 minutes",
		category: "Learning",
		effortLevel: "medium",
		color: "violet",
		isCompleted: true,
	},
	{
		id: "3",
		name: "Workout",
		category: "Fitness",
		effortLevel: "high",
		color: "green",
		isCompleted: false,
	},
];

export default function HomePage() {
	return (
		<View>
			<Text className="mb-4 font-sans text-lg font-semibold text-foreground">
				Today&apos;s habits
			</Text>

			<View className="gap-3">
				{MOCK_HABITS.map((habit) => (
					<SelectButton
						key={habit.id}
						name={habit.name}
						category={habit.category}
						effortLevel={habit.effortLevel}
						color={habit.color}
						initialIsSelected={habit.isCompleted}
						onPress={() => {
							console.log(`Tapped habit: ${habit.id}`);
						}}
					/>
				))}
			</View>
		</View>
	);
}
