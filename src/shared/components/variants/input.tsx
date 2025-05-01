import { extendVariants } from "@heroui/system";
import { VariantProps } from "tailwind-variants";
import { Input as HeroInput } from "@heroui/input";

import { title } from "@/shared/components/primitives";

const Input = extendVariants(HeroInput, {
  variants: {
    size: {
      "header-sm": {
        input: title({ size: "sm" }),
        inputWrapper: "p-0",
      },
    },
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
