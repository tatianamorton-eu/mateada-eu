import { RevealText } from "@/components/motion/RevealText";
import { cn } from "@/lib/utils";

const sizes = {
  xl: "text-[clamp(2.6rem,6vw,5.5rem)]",
  lg: "text-[clamp(2rem,5vw,4.5rem)]",
  md: "text-[clamp(1.85rem,4vw,3rem)]",
  sm: "text-[clamp(1.4rem,2.6vw,2rem)]",
} as const;

type HeadingProps = {
  children: string;
  as?: "h1" | "h2" | "h3";
  size?: keyof typeof sizes;
  className?: string;
  splitBy?: "lines" | "words";
};

export function Heading({
  children,
  as = "h2",
  size = "lg",
  className,
  splitBy = "lines",
}: HeadingProps) {
  return (
    <RevealText
      as={as}
      splitBy={splitBy}
      className={cn(
        "font-display uppercase leading-[0.98] tracking-[0.08em] text-foreground",
        sizes[size],
        className,
      )}
    >
      {children}
    </RevealText>
  );
}
