import { useFieldContext } from "../context";
import { TextField } from "@/components/ui/text-field";

type TextFieldFieldProps = {
	label: string;
	placeholder?: string;
};

export function TextFieldField({ label, placeholder }: TextFieldFieldProps) {
	const field = useFieldContext<string>();
	const error = typeof field.state.meta.errors[0] === "string" ? field.state.meta.errors[0] : undefined;

	return (
		<TextField
			label={label}
			value={field.state.value}
			onChangeText={field.handleChange}
			placeholder={placeholder}
			error={error}
		/>
	);
}
