import { Text, View } from 'react-native';

import { Card } from '@/components/ui/card';

import SelectButton from './SelectButton';
import type { Habit } from '../types';

type HabitsPageProps = {
  habits: Habit[];
  errorMessage?: string;
};

export default function HabitsPage({ habits, errorMessage }: HabitsPageProps) {
  if (errorMessage) {
    return (
      <Card>
        <Text className="font-sans text-sm text-destructive">{errorMessage}</Text>
      </Card>
    );
  }

  if (habits.length === 0) {
    return (
      <Card>
        <Text className="font-sans text-foreground">You have not created any habits yet.</Text>
      </Card>
    );
  }

  return (
    <View>
      <Text className="mb-4 font-sans text-lg font-semibold text-foreground">Your habits</Text>

      <View className="gap-3">
        {habits.map((habit) => (
          <SelectButton
            key={habit.id}
            name={habit.name}
            category={habit.category}
            effortLevel={habit.effortLevel}
            color={habit.color}
            initialIsSelected={habit.isCompleted}
            onPress={() => {
              console.log(`Tapped habit: ${habit.id}`);
            }}
          />
        ))}
      </View>
    </View>
  );
}
