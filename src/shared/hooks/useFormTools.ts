import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import CheckboxField from "@/shared/components/form/checkbox";
import InputField from "@/shared/components/form/input";
import PopoverCalendarField from "@/shared/components/form/popover-calendar";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Checkbox: CheckboxField,
    Input: InputField,
    PopoverCalendar: PopoverCalendarField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, withForm, useFieldContext, useFormContext };
