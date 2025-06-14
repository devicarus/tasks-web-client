import { today, getLocalTimeZone } from "@internationalized/date";

import SmartTaskView from "@/feature/task/components/SmartTaskView";
import { SolarCalendarMarkLinear as UpcommingIcon } from "@/shared/components/icons";
import { title } from "@/shared/components/primitives";

export default function AppUpcommingPage() {
  return (
    <>
      <h1 className="flex items-center gap-3 text-2xl font-bold mb-8 ml-1">
        <UpcommingIcon className="text-foreground" size={40} />
        <span className={title({ size: "sm" })}>Upcomming</span>
      </h1>

      <SmartTaskView
        filter={`due>'${today(getLocalTimeZone())}'`}
        filterTemplate={{
          dueDate: today(getLocalTimeZone()).add({ days: 1 }).toString(),
        }}
      />
    </>
  );
}
