import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import { useAppForm } from "@/integrations/tanstack-form/register";

import type { AuthFormValues } from "../types";

type AuthFormProps = {
	title: string;
	description: string;
	submitLabel: string;
	footerLabel: string;
	footerActionLabel: string;
	footerActionHref: string;
	onSubmit: (values: AuthFormValues) => Promise<void> | void;
	isPending?: boolean;
	errorMessage?: string | null;
};

export function AuthForm({
	title,
	description,
	submitLabel,
	footerLabel,
	footerActionLabel,
	footerActionHref,
	onSubmit,
	isPending,
	errorMessage,
}: AuthFormProps) {
	const form = useAppForm({
		defaultValues: {
			name: "",
			password: "",
		} satisfies AuthFormValues,
		onSubmit: async ({ value }) => {
			await onSubmit(value);
		},
	});

  return (
		<View className="flex-1 justify-center bg-background px-6">
			<Card className="gap-4">
				<Text className="font-sans text-3xl font-bold text-foreground">{title}</Text>
				<Text className="font-sans text-sm text-muted-foreground">{description}</Text>

				<form.AppForm>
					<form.AppField name="name">
						{(field) => (
							<TextField
								label="Username"
								value={field.state.value}
								onChangeText={field.handleChange}
								placeholder="corey"
								autoCapitalize="none"
								autoCorrect={false}
							/>
						)}
					</form.AppField>

					<form.AppField name="password">
						{(field) => (
							<TextField
								label="Password"
								value={field.state.value}
								onChangeText={field.handleChange}
								placeholder="••••••••"
								secureTextEntry
								autoCapitalize="none"
								autoCorrect={false}
							/>
						)}
					</form.AppField>

					{errorMessage ? (
						<Text className="font-sans text-sm text-red-500">{errorMessage}</Text>
					) : null}

					<Button
						title={isPending ? `${submitLabel}...` : submitLabel}
						onPress={() => {
							void form.handleSubmit();
						}}
						disabled={isPending}
					/>
				</form.AppForm>

				<Pressable className="items-center" onPress={() => router.push(footerActionHref)}>
					<Text className="font-sans text-foreground">
						{footerLabel} {footerActionLabel}
					</Text>
				</Pressable>
			</Card>
		</View>
	);
}
