import SmartTaskView from "../components/SmartTaskView";

export default function AppAnytimePage() {
  return <SmartTaskView filter={`due=NULL`} />;
}
