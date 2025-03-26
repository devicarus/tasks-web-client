import { useRef, useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Button } from "@heroui/button";
import { Calendar } from "@heroui/calendar";
import { CalendarDate, today, getLocalTimeZone } from "@internationalized/date";

type PopoverCalendarProps = {
  defaultValue?: CalendarDate;
  trigger: React.ReactElement;
  onChange?: (value: CalendarDate) => void;
};

export default function PopoverCalendar({
  defaultValue,
  trigger,
  onChange,
}: PopoverCalendarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLDivElement>();

  useEffect(() => {
    if (containerRef.current) {
      setContainer(containerRef.current);
    }
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <div ref={containerRef}>
      <Popover
        classNames={{
          content: "shadow-none p-0",
        }}
        isOpen={open}
        offset={10}
        placement="bottom"
        portalContainer={container}
        onOpenChange={setOpen}
      >
        <PopoverTrigger>
          <Button isIconOnly className="bg-transparent">
            {trigger}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            firstDayOfWeek="mon"
            minValue={today(getLocalTimeZone())}
            value={defaultValue}
            onChange={(value) => {
              setOpen(false);
              onChange?.(value);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
