import { today, getLocalTimeZone } from "@internationalized/date";

import SmartTaskView from "../components/SmartTaskView";

export default function AppTodayPage() {
  return (
    <SmartTaskView
      filter={`due<='${today(getLocalTimeZone())}'`}
      filterTemplate={{ dueDate: today(getLocalTimeZone()).toString() }}
    />
  );
}
