import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { useFormContext } from "../context";

type FormActionsProps = {
	label?: string;
};

export function FormActions({ label = "Save habit" }: FormActionsProps) {
	const form = useFormContext();

	return (
		<View>
			<Button title={label} onPress={() => void form.handleSubmit()} />
		</View>
	);
}
