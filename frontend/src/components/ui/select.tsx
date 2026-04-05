import { Pressable, Text, View } from "react-native";

import { cn } from "@/lib/cn";

type SelectOption = {
	label: string;
	value: string;
};

type SelectProps = {
	label?: string;
	value: string;
	onChange: (value: string) => void;
	options: SelectOption[];
	error?: string;
	className?: string;
};

export function Select({ label, value, onChange, options, error, className }: SelectProps) {
	return (
		<View className={cn("gap-2", className)}>
			{label ? <Text className="font-sans text-sm font-medium text-foreground">{label}</Text> : null}
			<View className="flex-row flex-wrap gap-2">
				{options.map((option) => {
					const isSelected = option.value === value;

					return (
						<Pressable
							key={option.value}
							onPress={() => onChange(option.value)}
							className={cn(
								"rounded-full border px-3 py-2",
								isSelected ? "border-primary bg-primary" : "border-border bg-background",
							)}
						>
							<Text className={cn("font-sans text-sm", isSelected ? "text-white" : "text-foreground")}>{option.label}</Text>
						</Pressable>
					);
				})}
			</View>
			{error ? <Text className="font-sans text-sm text-red-500">{error}</Text> : null}
		</View>
	);
}
