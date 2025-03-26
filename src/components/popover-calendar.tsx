import { useRef, useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Button } from "@heroui/button";
import { Calendar, DateValue } from "@heroui/calendar";

import { IconProps } from "@/types";

type PopoverCalendarProps = {
  icon: React.ElementType<IconProps>;
  onChange?: (value: DateValue) => void;
};

export default function PopoverCalendar({
  icon,
  onChange,
}: PopoverCalendarProps) {
  const Icon = icon;

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
            <Icon size={18} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            firstDayOfWeek="mon"
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
