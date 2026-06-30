import * as React from "react";
import { cn } from "@/lib/utils";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { WaitlistDialog } from "./WaitlistDialog";

export type ProductCardProps = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  subscribePrice?: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  altPrefix: string;
  highlight?: boolean;
  subscribable?: boolean;
};

export function ProductCard({
  badge,
  title,
  subtitle,
  description,
  price,
  subscribePrice,
  image,
  imageWidth,
  imageHeight,
  altPrefix,
  highlight = false,
  subscribable = false,
}: ProductCardProps) {
  const [mode, setMode] = React.useState<"once" | "subscribe">("once");
  const [open, setOpen] = React.useState(false);

  return (
    <article
      className={cn(
        "flex flex-col justify-between border border-primary-foreground/16 bg-primary/70 p-5 sm:p-7",
        highlight && "bg-primary/55",
      )}
    >
      <div>
        <span
          className={cn(
            "inline-flex w-fit items-center px-4 py-2 text-xs font-medium uppercase tracking-[0.18em]",
            highlight
              ? "bg-highlight text-foreground"
              : "border border-primary-foreground/25 text-primary-foreground",
          )}
        >
          {badge}
        </span>

        <Eyebrow className="mt-8 text-primary-foreground/70">{subtitle}</Eyebrow>
        <RevealText
          as="h3"
          className="mt-3 max-w-sm font-display text-[clamp(2rem,3vw,3rem)] uppercase leading-[0.95] tracking-[0.1em] text-primary-foreground"
        >
          {title}
        </RevealText>

        <RevealImage
          src={image}
          alt={altPrefix}
          width={imageWidth}
          height={imageHeight}
          containerClassName="mt-8 aspect-[4/5]"
          className="bg-secondary object-contain p-6 transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>

      <div className="mt-8 border-t border-primary-foreground/16 pt-6">
        <p className="max-w-xl text-sm text-primary-foreground/80 sm:text-base">{description}</p>

        {subscribable && subscribePrice ? (
          <div
            className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2"
            role="tablist"
            aria-label="Purchase option"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "once"}
              onClick={() => setMode("once")}
              className={cn(
                "border px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
                mode === "once"
                  ? "border-primary-foreground bg-primary-foreground text-primary"
                  : "border-primary-foreground/30 text-primary-foreground/80 hover:border-primary-foreground/60",
              )}
            >
              One-time · {price}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "subscribe"}
              onClick={() => setMode("subscribe")}
              className={cn(
                "border px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
                mode === "subscribe"
                  ? "border-primary-foreground bg-primary-foreground text-primary"
                  : "border-primary-foreground/30 text-primary-foreground/80 hover:border-primary-foreground/60",
              )}
            >
              Subscribe · {subscribePrice}
            </button>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="invert" size="sm" onClick={() => setOpen(true)}>
            {subscribable && mode === "subscribe" ? "Subscribe" : "Buy now"}
          </Button>
          <p className="text-sm uppercase tracking-[0.18em] text-primary-foreground/80">
            {subscribable && mode === "subscribe" && subscribePrice ? subscribePrice : price}
          </p>
        </div>
      </div>

      <WaitlistDialog open={open} onOpenChange={setOpen} productTitle={title} />
    </article>
  );
}
