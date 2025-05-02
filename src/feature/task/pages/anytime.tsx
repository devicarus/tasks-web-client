import SmartTaskView from "../smart-task-view";

export default function AppAnytimePage() {
  return <SmartTaskView filter={`due=NULL`} />;
}
