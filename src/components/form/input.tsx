import { Input, InputProps } from "@/components/variants/input";
import { useFieldContext } from "@/hooks/form";

interface InputFieldProps extends InputProps {
  autoFocusOnEmpty?: boolean;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputField({
  autoFocusOnEmpty,
  variant,
  size,
  placeholder,
  onKeyDown,
}: InputFieldProps) {
  const field = useFieldContext<string>();

  return (
    <Input
      autoFocus={autoFocusOnEmpty && field.state.value == ""}
      defaultValue={field.state.value}
      placeholder={placeholder}
      size={size}
      variant={variant}
      onBlur={field.handleBlur}
      onKeyDown={onKeyDown}
      onValueChange={(value) => field.handleChange(value)}
    />
  );
}
