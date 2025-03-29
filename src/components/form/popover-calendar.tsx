import { CalendarDate } from "@internationalized/date";

import PopoverCalendar from "@/components/popover-calendar";
import { useFieldContext } from "@/hooks/form";

export default function PopoverCalendarField({
  trigger,
}: {
  trigger: React.ReactElement;
}) {
  const field = useFieldContext<CalendarDate>();

  return (
    <PopoverCalendar
      defaultValue={field.state.value}
      trigger={trigger}
      onChange={(value) => field.handleChange(value)}
    />
  );
}
