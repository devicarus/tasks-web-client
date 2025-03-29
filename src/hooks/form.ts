import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import CheckboxField from "@/components/form/checkbox";
import InputField from "@/components/form/input";
import PopoverCalendarField from "@/components/form/popover-calendar";

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
