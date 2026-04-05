import { apiRequest } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

import { COLORS, type HabitColor } from "@/features/colors";
import type { Habit } from "@/features/habits/types";

export const queryKeys = {
	all: ["habits"] as const,
	userHabits: (token: string | null) => ["habits", "user", token] as const,
};

type BackendHabit = {
	id: string;
	name: string;
	category: string;
	effort_level: Habit["effortLevel"];
	color?: HabitColor;
};

type GetHabitsResponse = {
	habits: BackendHabit[];
};

type QueryOptionsResult = {
	habits: Habit[];
};

export const getUserHabitsQueryOptions = (token: string | null) =>
	queryOptions({
		queryKey: queryKeys.userHabits(token),
		enabled: Boolean(token),
		queryFn: async () => {
			const response = await apiRequest<GetHabitsResponse>("/habits", {
				method: "GET",
				authToken: token,
			});

			if (!response.success) {
				throw response.error;
			}

			if (!response.data.habits) {
				return { habits: [] } satisfies QueryOptionsResult;
			}

			return {
				habits: response.data.habits.map((habit) => ({
					id: habit.id,
					name: habit.name,
					category: habit.category,
					effortLevel: habit.effort_level,
					color: habit.color ?? COLORS[0],
					isCompleted: false,
				})),
			} satisfies QueryOptionsResult;
		},
	});
