import { CalendarDate, getDayOfWeek } from "@internationalized/date";

const getDayOfWeekAsString = (date: CalendarDate) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[getDayOfWeek(date, "en-UK")];
};

export const formatDate = (date: CalendarDate) => {
  return `${getDayOfWeekAsString(date)} ${date.day}. ${date.month}.`;
};
