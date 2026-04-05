import { useFieldContext } from "../context";
import { Select } from "@/components/ui/select";

type SelectFieldProps = {
	label: string;
	options: readonly { label: string; value: string }[];
};

export function SelectField({ label, options }: SelectFieldProps) {
	const field = useFieldContext<string>();
	const error = typeof field.state.meta.errors[0] === "string" ? field.state.meta.errors[0] : undefined;

	return (
		<Select
			label={label}
			value={field.state.value}
			onChange={field.handleChange}
			options={[...options]}
			error={error}
		/>
	);
}
