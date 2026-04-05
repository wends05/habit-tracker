import { apiRequest, type ApiError } from "@/lib/api";

import { COLORS, type HabitColor } from "@/features/colors";

import type { Habit } from "./types";

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

type GetHabitsResult = {
	habits: Habit[];
};

type ApiResult<TData> =
	| { data: TData; error: null; success: true }
	| { data: null; error: ApiError; success: false };

export async function getHabits(authToken: string): Promise<ApiResult<GetHabitsResult>> {
	const response = await apiRequest<GetHabitsResponse>("/habits", {
		method: "GET",
		authToken,
	});

	if (!response.success) {
		return response as ApiResult<GetHabitsResult>;
	}

	return {
		success: true,
		error: null,
		data: {
			habits: response.data.habits.map((habit) => ({
				id: habit.id,
				name: habit.name,
				category: habit.category,
				effortLevel: habit.effort_level,
				color: habit.color ?? COLORS[0],
				isCompleted: false,
			})),
		},
	};
}
