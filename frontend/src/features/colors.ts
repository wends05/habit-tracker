export const COLORS = [
	"blue",
	"orange",
	"yellow",
	"red",
	"green",
	"pink",
	"violet",
	"white",
	"gray",
] as const;

export type HabitColor = (typeof COLORS)[number];

export const getColorClasses = (colorName: string, isCompleted: boolean) => {
	if (!isCompleted) {
		return "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500";
	}

	const map: Record<string, string> = {
		blue: "bg-blue-500 dark:bg-blue-600 border-blue-600 dark:border-blue-500 text-white",
		orange: "bg-orange-500 dark:bg-orange-600 border-orange-600 dark:border-orange-500 text-white",
		yellow: "bg-yellow-400 dark:bg-yellow-500 border-yellow-500 dark:border-yellow-400 text-neutral-900",
		red: "bg-red-500 dark:bg-red-600 border-red-600 dark:border-red-500 text-white",
		green: "bg-green-500 dark:bg-green-600 border-green-600 dark:border-green-500 text-white",
		pink: "bg-pink-500 dark:bg-pink-600 border-pink-600 dark:border-pink-500 text-white",
		violet: "bg-violet-500 dark:bg-violet-600 border-violet-600 dark:border-violet-500 text-white",
		white: "bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100",
		gray: "bg-neutral-500 dark:bg-neutral-600 border-neutral-600 dark:border-neutral-500 text-white",
	};

	return map[colorName] || map.blue;
};

export const getIconColorClass = (colorName: string) => {
	const map: Record<string, string> = {
		blue: "text-blue-500 dark:text-blue-400",
		orange: "text-orange-500 dark:text-orange-400",
		yellow: "text-yellow-500 dark:text-yellow-400",
		red: "text-red-500 dark:text-red-400",
		green: "text-green-500 dark:text-green-400",
		pink: "text-pink-500 dark:text-pink-400",
		violet: "text-violet-500 dark:text-violet-400",
		white: "text-neutral-900 dark:text-neutral-100",
		gray: "text-neutral-500 dark:text-neutral-400",
	};
	return map[colorName] || map.blue;
};

export const getBgColorClass = (colorName: string) => {
	const map: Record<string, string> = {
		blue: "bg-blue-500 dark:bg-blue-600",
		orange: "bg-orange-500 dark:bg-orange-600",
		yellow: "bg-yellow-400 dark:bg-yellow-500",
		red: "bg-red-500 dark:bg-red-600",
		green: "bg-green-500 dark:bg-green-600",
		pink: "bg-pink-500 dark:bg-pink-600",
		violet: "bg-violet-500 dark:bg-violet-600",
		white: "bg-white dark:bg-neutral-900",
		gray: "bg-neutral-500 dark:bg-neutral-600",
	};
	return map[colorName] || map.blue;
};

export const getTextColorClass = (colorName: string) => {
	if (colorName === "yellow" || colorName === "white") {
		return "text-neutral-900 dark:text-neutral-100";
	}
	return "text-white";
};
