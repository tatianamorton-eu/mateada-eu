import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";

const buttonVariants = cva(
  "inline-flex w-fit cursor-pointer items-center justify-center gap-2 whitespace-nowrap px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid:
          "border border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary",
        invert:
          "border border-primary-foreground bg-primary-foreground text-primary hover:bg-transparent hover:text-primary-foreground",
        outline: "border border-current bg-transparent hover:bg-foreground hover:text-background",
        ghost:
          "border-none bg-transparent px-0 py-0 tracking-[0.18em] text-current hover:opacity-70",
      },
      size: {
        default: "",
        sm: "px-5 py-2.5 text-[0.65rem]",
      },
    },
    defaultVariants: { variant: "solid", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Pointer-follow micro-interaction; disabled automatically on touch/reduced-motion. */
  magnetic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, magnetic = true, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const element = (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );

    if (!magnetic) return element;
    return <Magnetic>{element}</Magnetic>;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
