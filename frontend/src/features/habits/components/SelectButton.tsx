import { Pressable, Text, View } from "react-native";

import type { EffortLevel } from "@/features/habits/types";
import { getBgColorClass, getTextColorClass, type HabitColor } from "@/features/colors";
import { useEffect, useState } from "react";
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

type SelectButtonProps = {
	name: string;
	category: string;
	effortLevel: EffortLevel;
	color: HabitColor;
	initialIsSelected?: boolean;
	onPress?: () => void;
};

const EFFORT_LABELS: Record<EffortLevel, string> = {
	low: "Low Effort",
	medium: "Medium Effort",
	high: "High Effort",
};

const EFFORT_STYLES: Record<EffortLevel, { border: string }> = {
	low: {
		border: "bg-emerald-500",
	},
	medium: {
		border: "bg-amber-500",
	},
	high: {
		border: "bg-rose-500",
	},
};

export default function SelectButton({
	name,
	category,
	effortLevel,
	color,
	initialIsSelected = false,
	onPress,
}: SelectButtonProps) {
	const [isSelected, setIsSelected] = useState(initialIsSelected);
	const pressScale = useSharedValue(1);
	const checkProgress = useSharedValue(initialIsSelected ? 1 : 0);
	const effortStyles = EFFORT_STYLES[effortLevel];
	const colorBackgroundClass = getBgColorClass(color);
	const colorTextClass = getTextColorClass(color);

	useEffect(() => {
		checkProgress.value = withTiming(isSelected ? 1 : 0, {
			duration: 180,
			easing: Easing.out(Easing.cubic),
		});
	}, [checkProgress, isSelected]);

	const cardAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: pressScale.value }],
	}));

	const checkAnimatedStyle = useAnimatedStyle(() => {
		const scale = interpolate(checkProgress.value, [0, 1], [0.7, 1]);
		const opacity = interpolate(checkProgress.value, [0, 1], [0, 1]);

		return {
			opacity,
			transform: [{ scale }],
		};
	});

	const handlePress = () => {
		setIsSelected((current) => !current);
		if (onPress) onPress();
	};

	return (
		<AnimatedPressable
			onPress={handlePress}
			onPressIn={() => {
				pressScale.value = withSpring(0.98, { damping: 18, stiffness: 280 });
			}}
			onPressOut={() => {
				pressScale.value = withSpring(1, { damping: 18, stiffness: 280 });
			}}
			className={[
				"w-full flex-row items-center rounded-2xl border p-4 text-left",
				isSelected
					? "border-border bg-muted"
					: "border-border/60 bg-background active:border-border",
			].join(" ")}
			style={cardAnimatedStyle}
		>
			<View
				className={[
					"mr-4 flex h-12 w-12 items-center justify-center rounded-xl",
					colorBackgroundClass,
				].join(" ")}
			>
				<Text
					className={[
						"text-xl font-semibold",
						colorTextClass,
					].join(" ")}
				>
					•
				</Text>
			</View>

			<View className="flex-1">
				<Text
					className={[
						"text-base font-semibold",
						isSelected ? "text-foreground" : "text-foreground/90",
					].join(" ")}
				>
					{name}
				</Text>

				<View className="mt-1 flex-row flex-wrap gap-2">
					<View className="rounded-md bg-muted px-2 py-1">
						<Text className="text-xs font-medium text-muted-foreground">
							{category}
						</Text>
					</View>

					<View className="rounded-md bg-muted px-2 py-1">
						<Text className="text-xs font-medium text-muted-foreground">
							{EFFORT_LABELS[effortLevel]}
						</Text>
					</View>
				</View>
			</View>

			<View
				className={[
					"ml-4 h-8 w-8 items-center justify-center rounded-full border-2",
					isSelected
						? effortStyles.border
						: "border-border bg-transparent",
				].join(" ")}
			>
				<AnimatedText
					className={[
						"text-sm font-bold",
						isSelected ? "text-white" : "text-transparent",
					].join(" ")}
					style={checkAnimatedStyle}
				>
					✓
				</AnimatedText>
			</View>
		</AnimatedPressable>
	);
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = Animated.createAnimatedComponent(Text);
