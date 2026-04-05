import { COLORS, type HabitColor } from "@/features/colors";

export type HabitFormValues = {
	name: string;
	category: string;
	effortLevel: "low" | "medium" | "high";
	color: HabitColor;
};

export { COLORS };

export const effortLevelOptions = [
	{ label: "Low", value: "low" },
	{ label: "Medium", value: "medium" },
	{ label: "High", value: "high" },
] as const;
