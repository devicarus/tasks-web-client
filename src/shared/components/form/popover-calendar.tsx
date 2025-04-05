import { CalendarDate } from "@internationalized/date";

import PopoverCalendar from "@/shared/components/popover-calendar";
import { useFieldContext } from "@/shared/hooks/form";

export default function PopoverCalendarField({
  buttonContent,
  classNames,
}: {
  buttonContent: React.ReactElement;
  classNames?: {
    button?: string;
  };
}) {
  const field = useFieldContext<CalendarDate>();

  return (
    <PopoverCalendar
      buttonContent={buttonContent}
      classNames={classNames}
      defaultValue={field.state.value}
      onChange={(value) => field.handleChange(value)}
    />
  );
}
