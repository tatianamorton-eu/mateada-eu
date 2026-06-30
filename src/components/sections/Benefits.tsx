import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { RevealText } from "@/components/motion/RevealText";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { LeafIcon, MoleculeIcon, SparkIcon, CircleSlashIcon } from "@/components/ui/icons";

const benefits = [
  { title: "Natural caffeine", body: "Long-lasting energy", icon: LeafIcon },
  { title: "Theobromine and Theophylline", body: "Gentle stimulation", icon: MoleculeIcon },
  { title: "Rich in antioxidants", body: "Pure plant support", icon: SparkIcon },
  { title: "No added sugar", body: "Pure & clean", icon: CircleSlashIcon },
] as const;

export function Benefits() {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || reducedMotion) return;
      const icons = sectionRef.current.querySelectorAll<SVGGeometryElement>(
        "[data-benefit-icon] path, [data-benefit-icon] circle",
      );
      icons.forEach((shape) => {
        const length = shape.getTotalLength();
        gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.to(icons, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    },
    { scope: sectionRef as React.RefObject<HTMLElement>, dependencies: [reducedMotion] },
  );

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="border-b border-border bg-background px-4 py-14 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <Eyebrow className="justify-center">Pure yerba mate.</Eyebrow>
          <Heading as="h2" size="lg" className="mt-3 mx-auto">
            Nothing else.
          </Heading>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className="flex flex-col items-center border-t border-border pt-8 text-center xl:border-l xl:border-t-0 xl:pl-8 xl:first:border-l-0"
              >
                <div data-benefit-icon>
                  <Icon className="h-8 w-8 text-foreground" />
                </div>
                <RevealText
                  as="h3"
                  splitBy="words"
                  className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-foreground"
                >
                  {benefit.title}
                </RevealText>
                <RevealText
                  as="p"
                  splitBy="words"
                  className="mt-3 text-sm uppercase tracking-[0.16em] text-muted-foreground"
                >
                  {benefit.body}
                </RevealText>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-center text-center">
          <div className="mb-6 h-12 w-px bg-border" aria-hidden="true" />
          <RevealText
            as="p"
            splitBy="words"
            className="max-w-3xl font-sans text-lg font-medium uppercase tracking-[0.2em] text-foreground sm:text-2xl"
          >
            Smooth taste. Clean energy. All day long.
          </RevealText>
        </div>
      </div>
    </section>
  );
}
