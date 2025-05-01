import { extendVariants } from "@heroui/system";
import { VariantProps } from "tailwind-variants";
import { Button as HeroButton } from "@heroui/button";

const Button = extendVariants(HeroButton, {
  variants: {
    variant: {
      plain: "border-none",
    },
  },
});

type ButtonProps = VariantProps<typeof Button>;

export { Button, type ButtonProps };
