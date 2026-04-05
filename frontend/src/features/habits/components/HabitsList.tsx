import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { getUserHabitsQueryOptions } from "../options";

export default function HabitsList() {
	const { token } = useAuth();
	const { data, error } = useQuery(getUserHabitsQueryOptions(token));

	if (error) {
		return <Text>Error: {error.message}</Text>;
	}

	if (data?.habits?.length === 0) {
		return <Text>No habits found.</Text>;
	}

	return (
		<Card>
			<Text></Text>
		</Card>
	);
}
