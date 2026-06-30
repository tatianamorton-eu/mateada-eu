import * as React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { RevealImage } from "@/components/motion/RevealImage";
import ritualWomen from "@/assets/brand/ritual-women-lg.webp";
import ritualMen from "@/assets/brand/ritual-men-lg.webp";

const methods = [
  {
    name: "Traditional Mateada",
    variants: ["Hot water", "Cold water + ice"],
    image: ritualWomen,
    alt: "Preparing a traditional Mateada mate by hand.",
  },
  {
    name: "Mate Latte",
    variants: ["Hot", "Cold + ice"],
    image: ritualWomen,
    alt: "A warm Mateada mate latte in a ceramic cup.",
  },
  {
    name: "Mateada Citrus",
    variants: ["With orange juice", "With lemon juice"],
    image: ritualMen,
    alt: "Mateada served cold after a workout.",
  },
] as const;

export function RitualGuide() {
  const [active, setActive] = React.useState(0);
  const method = methods[active];

  return (
    <section
      id="ritual"
      className="border-b border-border bg-card px-4 py-14 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="max-w-3xl">
          <Eyebrow>Mate guide</Eyebrow>
          <Heading as="h2" size="lg" className="mt-3">
            One plant, many rituals.
          </Heading>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Mix it with water, pour it over ice, make a quiet latte, or brighten it with citrus.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Preparation method">
              {methods.map((m, index) => (
                <button
                  key={m.name}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  onClick={() => setActive(index)}
                  className={cn(
                    "border px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
                    active === index
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  )}
                >
                  {m.name}
                </button>
              ))}
            </div>

            <ul className="mt-8 flex flex-col gap-4">
              {method.variants.map((variant) => (
                <li
                  key={variant}
                  className="flex items-center gap-4 border-t border-border pt-4 text-sm uppercase tracking-[0.16em] text-foreground first:border-t-0 first:pt-0"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground"
                    aria-hidden="true"
                  />
                  {variant}
                </li>
              ))}
            </ul>
          </div>

          <RevealImage
            key={method.name}
            src={method.image}
            alt={method.alt}
            width={1600}
            height={1600}
            containerClassName="aspect-[4/5] w-full border border-border"
          />
        </div>
      </div>
    </section>
  );
}
