import { GourdIcon, LeafIcon, TargetIcon, StomachIcon, GlobeIcon } from "@/components/ui/icons";
import { RevealText } from "@/components/motion/RevealText";

const items = [
  { icon: GourdIcon, label: "The first European mate brand" },
  { icon: LeafIcon, label: "Sustained energy without the crash" },
  { icon: TargetIcon, label: "Focus & clarity for body & mind" },
  { icon: StomachIcon, label: "Gentle on your system, no jitters" },
  { icon: GlobeIcon, label: "Made for modern life. Inspired by nature" },
] as const;

export function TrustStrip() {
  return (
    <section className="border-b border-primary-foreground/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-[1600px] snap-x snap-mandatory gap-8 overflow-x-auto px-5 py-8 sm:px-8 sm:py-10 md:grid md:grid-cols-2 md:snap-none md:overflow-visible md:gap-6 lg:grid-cols-5 lg:px-12">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex w-[78vw] shrink-0 snap-start flex-col items-start gap-3 sm:w-[40vw] md:w-auto md:items-center md:text-center lg:col-span-1 lg:items-center lg:text-center lg:justify-self-auto${index === items.length - 1 ? " md:col-span-2 md:justify-self-center md:max-w-[50%] lg:col-span-1 lg:max-w-full lg:justify-self-auto" : ""}`}
            >
              <Icon className="h-7 w-7 text-primary-foreground/85" />
              <RevealText
                as="p"
                splitBy="words"
                delay={index * 0.04}
                className="text-xs uppercase leading-snug tracking-[0.14em] text-primary-foreground/85"
              >
                {item.label}
              </RevealText>
            </div>
          );
        })}
      </div>
    </section>
  );
}
