import { Pressable, Text, View } from "react-native";

import { useFieldContext } from "../context";
import { cn } from "@/lib/cn";
import {
	COLORS,
	getBgColorClass,
	getTextColorClass,
} from "@/features/colors";

type ColorPickerFieldProps = {
	label: string;
};

export function ColorPickerField({ label }: ColorPickerFieldProps) {
	const field = useFieldContext<string>();

	return (
		<View className="gap-2">
			<Text className="font-sans text-sm font-medium text-foreground">{label}</Text>
			<View className="flex-row flex-wrap gap-2">
				{COLORS.map((color) => {
					const isSelected = field.state.value === color;
					return (
						<Pressable
							key={color}
							onPress={() => field.handleChange(color)}
							className={cn(
								"min-w-16 rounded-full border px-3 py-2",
								getBgColorClass(color),
								isSelected ? "border-foreground border-2" : "border-transparent",
								!isSelected && "opacity-80"
							)}
						>
							<Text className={cn("text-center text-sm font-semibold capitalize", getTextColorClass(color))}>
								{color}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}
