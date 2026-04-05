import { Pressable, Text } from "react-native";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

type ButtonProps = {
	title: string;
	onPress?: () => void;
	disabled?: boolean;
	variant?: ButtonVariant;
	className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
	primary: "bg-primary",
	secondary: "bg-muted border border-border",
	ghost: "bg-transparent",
	destructive: "bg-red-500",
};

const textClasses: Record<ButtonVariant, string> = {
	primary: "text-white",
	secondary: "text-foreground",
	ghost: "text-foreground",
	destructive: "text-white",
};

export function Button({
	title,
	onPress,
	disabled,
	variant = "primary",
	className,
}: ButtonProps) {
	return (
		<Pressable
			disabled={disabled}
			onPress={onPress}
			className={cn(
				"items-center justify-center overflow-hidden rounded-xl px-4 py-3 active:opacity-80",
				variantClasses[variant],
				disabled && "opacity-50",
				className,
			)}
		>
			<Text className={cn("text-center font-sans font-semibold", textClasses[variant])}>
				{title}
			</Text>
		</Pressable>
	);
}
