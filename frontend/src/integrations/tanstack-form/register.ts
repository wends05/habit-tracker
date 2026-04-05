import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "./context";
import { ColorPickerField } from "./components/color-picker-field";
import { FormActions } from "./components/form-actions";
import { SelectField } from "./components/select-field";
import { TextFieldField } from "./components/text-field-field";

export const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextFieldField,
		SelectField,
		ColorPickerField,
	},
	formComponents: {
		FormActions,
	},
});
