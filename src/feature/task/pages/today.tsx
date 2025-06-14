import { today, getLocalTimeZone } from "@internationalized/date";

import SmartTaskView from "@/feature/task/components/SmartTaskView";
import { SolarCalendarDateLinear as TodayIcon } from "@/shared/components/icons";
import { title } from "@/shared/components/primitives";

export default function AppTodayPage() {
  return (
    <>
      <h1 className="flex items-center gap-3 text-2xl font-bold mb-8 ml-1">
        <TodayIcon
          className="text-foreground"
          date={new Date().getDate()}
          size={40}
        />
        <span className={title({ size: "sm" })}>Today</span>
      </h1>

      <SmartTaskView
        filter={`due<='${today(getLocalTimeZone())}'`}
        filterTemplate={{ dueDate: today(getLocalTimeZone()).toString() }}
      />
    </>
  );
}
