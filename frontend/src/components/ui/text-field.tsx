import { Text, TextInput, View } from "react-native";
import type { TextInputProps } from "react-native";

import { cn } from "@/lib/cn";

type TextFieldProps = {
	label?: string;
	value: string;
	onChangeText: (value: string) => void;
	placeholder?: string;
	error?: string;
	multiline?: boolean;
	secureTextEntry?: boolean;
	autoCapitalize?: TextInputProps["autoCapitalize"];
	autoCorrect?: boolean;
	className?: string;
};

export function TextField({
	label,
	value,
	onChangeText,
	placeholder,
	error,
	multiline,
	secureTextEntry,
	autoCapitalize,
	autoCorrect,
	className,
}: TextFieldProps) {
	return (
		<View className={cn("gap-2", className)}>
			{label ? <Text className="font-sans text-sm font-medium text-foreground">{label}</Text> : null}
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				multiline={multiline}
				secureTextEntry={secureTextEntry}
				autoCapitalize={autoCapitalize}
				autoCorrect={autoCorrect}
				className={cn(
					"rounded-xl border border-border bg-background px-4 py-3 font-sans text-foreground",
					multiline && "min-h-24",
					error && "border-red-500",
				)}
				placeholderTextColor="#7c7c7c"
			/>
			{error ? <Text className="font-sans text-sm text-red-500">{error}</Text> : null}
		</View>
	);
}
