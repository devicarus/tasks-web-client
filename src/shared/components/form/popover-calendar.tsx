import { CalendarDate } from "@internationalized/date";

import PopoverCalendar from "@/shared/components/popover-calendar";
import { useFieldContext } from "@/shared/hooks/useFormTools";
import { ButtonProps } from "@/shared/components/variants/button";

export default function PopoverCalendarField({
  buttonContent,
  buttonProps,
  classNames,
}: {
  buttonContent: React.ReactElement;
  buttonProps?: ButtonProps;
  classNames?: {
    button?: string;
  };
}) {
  const field = useFieldContext<CalendarDate>();

  return (
    <PopoverCalendar
      buttonContent={buttonContent}
      buttonProps={buttonProps}
      classNames={classNames}
      defaultValue={field.state.value}
      onChange={(value) => field.handleChange(value)}
    />
  );
}
