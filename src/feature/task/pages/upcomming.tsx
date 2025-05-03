import { today, getLocalTimeZone } from "@internationalized/date";

import SmartTaskView from "../components/SmartTaskView";

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
