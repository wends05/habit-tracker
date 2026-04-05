import { Stack } from "expo-router";
import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { COLORS } from "@/features/colors";
import { effortLevelOptions, type HabitFormValues } from "@/integrations/tanstack-form/form-schema";
import { useAppForm } from "@/integrations/tanstack-form/register";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateHabitModal() {
	const form = useAppForm({
		defaultValues: {
			name: "",
			category: "",
			effortLevel: "medium",
			color: COLORS[0],
		} satisfies HabitFormValues,
		onSubmit: async ({ value }) => {
			console.log(value);
		},
	});

	return (
		<View className="flex-1 bg-background">
			<Stack.Header />
			<Stack.Screen.Title>Create Habit</Stack.Screen.Title>

			<SafeAreaView className="px-4 py-4">
				<form.AppForm>
					<Card className="gap-4">
						<Text className="font-sans text-2xl font-bold text-foreground">
							Create Habit
						</Text>

						<form.AppField name="name">
							{(field) => <field.TextFieldField label="Name" placeholder="Drink water" />}
						</form.AppField>

						<form.AppField name="category">
							{(field) => <field.TextFieldField label="Category" placeholder="Health" />}
						</form.AppField>

						<form.AppField name="effortLevel">
							{(field) => <field.SelectField label="Effort level" options={effortLevelOptions} />}
						</form.AppField>

						<form.AppField name="color">
							{(field) => <field.ColorPickerField label="Color" />}
						</form.AppField>

						<form.FormActions label="Save habit" />
					</Card>
				</form.AppForm>
			</SafeAreaView>
		</View>
	);
}
