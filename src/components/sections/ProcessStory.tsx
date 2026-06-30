import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { RevealImage } from "@/components/motion/RevealImage";
import { LeafIcon, MoleculeIcon, CircleSlashIcon } from "@/components/ui/icons";
import heritageFarm from "@/assets/brand/heritage-farm-lg.webp";
import ritualWomen from "@/assets/brand/ritual-women-lg.webp";
import texturePowder from "@/assets/brand/texture-powder.webp";

const steps = [
  {
    number: "01",
    label: "Source",
    title: "From native farms.",
    description: "Sourced with care from the native farms of Misiones, Argentina.",
    image: heritageFarm,
    alt: "Rows of yerba mate plants on a farm in Misiones, Argentina at golden hour.",
  },
  {
    number: "02",
    label: "Leaves",
    title: "Only the finest leaves.",
    description: "Carefully handpicked at their peak.",
    icon: LeafIcon,
  },
  {
    number: "03",
    label: "Grind",
    title: "Crafted to perfection.",
    description: "We finely grind the leaves to a smooth, ultra-fine powder.",
    icon: MoleculeIcon,
  },
  {
    number: "04",
    label: "Pure",
    title: "Pure. Nothing else.",
    description: "100% pure yerba mate. No additives, no fillers — just nature.",
    icon: CircleSlashIcon,
  },
  {
    number: "05",
    label: "Enjoy",
    title: "Just add water.",
    description: "Stir. Sip. And enjoy clean, natural energy that lasts.",
    image: ritualWomen,
    alt: "Stirring a fresh Mateada mate latte in a ceramic cup.",
  },
] as const;

export function ProcessStory() {
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const usePin = isDesktop && !isTouch && !reducedMotion;

  return (
    <section id="process" className="border-b border-border bg-card">
      <div className="mx-auto max-w-[1600px] px-5 pt-14 sm:px-8 sm:pt-20 lg:px-12">
        <Eyebrow>From farm to cup</Eyebrow>
        <Heading as="h2" size="lg" className="mt-3">
          One plant, five steps.
        </Heading>
      </div>

      {usePin ? <PinnedProcess /> : <StackedProcess />}
    </section>
  );
}

function StepPanel({ step, className }: { step: (typeof steps)[number]; className?: string }) {
  const Icon = "icon" in step ? step.icon : undefined;
  return (
    <div
      className={cn("flex flex-col justify-center gap-6 px-5 py-12 sm:px-8 lg:px-12", className)}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-display text-3xl text-muted-foreground">{step.number}</span>
        <Eyebrow>{step.label}</Eyebrow>
      </div>
      <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] uppercase leading-[1.02] tracking-[0.06em] text-foreground">
        {step.title}
      </h3>
      <p className="max-w-sm text-base text-muted-foreground">{step.description}</p>

      {"image" in step && step.image ? (
        <RevealImage
          src={step.image}
          alt={step.alt}
          width={1600}
          height={1000}
          containerClassName="mt-2 aspect-[4/3] w-full max-w-md"
        />
      ) : Icon ? (
        <div
          className="relative mt-2 flex aspect-[4/3] w-full max-w-md items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${texturePowder})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-primary/55" aria-hidden="true" />
          <Icon className="relative h-16 w-16 text-primary-foreground" />
        </div>
      ) : null}
    </div>
  );
}

function StackedProcess() {
  return (
    <div className="mx-auto max-w-[1600px] divide-y divide-border py-10 sm:py-14">
      {steps.map((step) => (
        <StepPanel key={step.number} step={step} className="py-10 first:pt-0" />
      ))}
    </div>
  );
}

function PinnedProcess() {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;
      const track = trackRef.current;
      const panelCount = steps.length;

      // xPercent is relative to the track's own (full) width, so the target
      // is -(n-1)/n * 100, not -100*(n-1) — moving by (n-1) panel-widths
      // out of a track that's n panel-widths wide.
      // ScrollTrigger + tween created here are scoped to this useGSAP context
      // and killed automatically on unmount/dependency change.
      gsap.to(track, {
        xPercent: (-100 * (panelCount - 1)) / panelCount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: () => "+=" + (track.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef as React.RefObject<HTMLElement>, dependencies: [] },
  );

  React.useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div ref={sectionRef} className="relative mt-10 h-screen overflow-hidden">
      <div ref={trackRef} className="flex h-full w-fit">
        {steps.map((step) => (
          <StepPanel
            key={step.number}
            step={step}
            className="h-full w-screen border-l border-border first:border-l-0"
          />
        ))}
      </div>
    </div>
  );
}
