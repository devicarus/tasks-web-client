import { today, getLocalTimeZone } from "@internationalized/date";

import SmartTaskView from "../smart-task-view";

export default function AppTodayPage() {
  return (
    <SmartTaskView
      filter={`due<='${today(getLocalTimeZone())}'`}
      filterTemplate={{ dueDate: today(getLocalTimeZone()).toString() }}
    />
  );
}
