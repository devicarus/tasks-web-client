import { extendVariants } from "@heroui/system";
import { VariantProps } from "tailwind-variants";
import { Input as HeroInput } from "@heroui/input";

const Input = extendVariants(HeroInput, {
  variants: {
    variant: {
      plain: {
        inputWrapper:
          "bg-transparent shadow-none data-[hover=true]:bg-transparent",
        input: "text-base",
      },
    },
  },
});

type InputProps = VariantProps<typeof Input>;

export { Input, type InputProps };
