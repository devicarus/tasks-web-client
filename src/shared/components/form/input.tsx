import { Input, InputProps } from "@/shared/components/variants/input";
import { useFieldContext } from "@/shared/hooks/useFormTools";

interface InputFieldProps extends InputProps {
  autoFocusOnEmpty?: boolean;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputField({
  autoFocusOnEmpty,
  ...rest
}: InputFieldProps) {
  const field = useFieldContext<string>();

  return (
    <Input
      autoFocus={autoFocusOnEmpty && !field.state.value}
      defaultValue={field.state.value}
      onBlur={field.handleBlur}
      onValueChange={field.handleChange}
      {...rest}
    />
  );
}
