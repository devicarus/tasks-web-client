import { today, getLocalTimeZone } from "@internationalized/date";

import SmartTaskView from "../smart-task-view";

export default function AppUpcommingPage() {
  return (
    <SmartTaskView
      filter={`due>'${today(getLocalTimeZone())}'`}
      filterTemplate={{
        dueDate: today(getLocalTimeZone()).add({ days: 1 }).toString(),
      }}
    />
  );
}
