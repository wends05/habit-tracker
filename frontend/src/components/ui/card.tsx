import { View } from "react-native";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardProps = {
	children: ReactNode;
	className?: string;
};

export function Card({ children, className }: CardProps) {
	return <View className={cn("bg-card p-4", className)}>{children}</View>;
}
