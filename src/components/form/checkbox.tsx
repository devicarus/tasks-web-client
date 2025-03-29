import { Checkbox } from "@heroui/checkbox";

import { useFieldContext } from "@/hooks/form";

export default function CheckboxField({ className }: { className: string }) {
  const field = useFieldContext<boolean>();

  return (
    <Checkbox
      className={className}
      isSelected={field.state.value}
      onBlur={field.handleBlur}
      onValueChange={(checked) => field.handleChange(checked)}
    />
  );
}
