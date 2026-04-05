import type { HabitColor } from '@/features/colors';

export type EffortLevel = 'low' | 'medium' | 'high';

export type Habit = {
  id: string;
  name: string;
  category: string;
  effortLevel: EffortLevel;
  color: HabitColor;
  isCompleted: boolean;
};
