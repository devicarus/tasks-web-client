import SmartTaskView from "@/feature/task/components/SmartTaskView";
import { SolarCalendarMinimalisticLinear as AnytimeIcon } from "@/shared/components/icons";
import { title } from "@/shared/components/primitives";

export default function AppAnytimePage() {
  return (
    <>
      <h1 className="flex items-center gap-3 text-2xl font-bold mb-8 ml-1">
        <AnytimeIcon className="text-foreground" size={40} />
        <span className={title({ size: "sm" })}>Anytime</span>
      </h1>

      <SmartTaskView filter={`due=NULL`} />
    </>
  );
}
