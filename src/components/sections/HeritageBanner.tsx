import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { RevealText } from "@/components/motion/RevealText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import heritageHorsesLg from "@/assets/brand/heritage-horses-lg.webp";
import heritageHorsesSm from "@/assets/brand/heritage-horses-sm.webp";

export function HeritageBanner() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden border-b border-border bg-primary">
      <ParallaxLayer range={10} className="absolute inset-0">
        <picture>
          <source media="(max-width: 640px)" srcSet={heritageHorsesSm} />
          <img
            src={heritageHorsesLg}
            alt="Wild horses running across the Misiones plains at golden hour."
            className="h-full w-full scale-110 object-cover"
            loading="lazy"
            width={1907}
            height={825}
          />
        </picture>
      </ParallaxLayer>

      <div className="absolute inset-0 bg-primary/55" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12">
        <Eyebrow className="text-primary-foreground/70">Misiones, Argentina</Eyebrow>
        <p className="mt-4 max-w-3xl font-sans text-sm uppercase tracking-[0.18em] text-primary-foreground/75">
          Born where yerba mate has been a ritual for generations.
        </p>
        <RevealText
          as="p"
          className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,4vw,3rem)] uppercase leading-[1.05] tracking-[0.06em] text-primary-foreground"
        >
          Bringing heritage to modern life.
        </RevealText>
      </div>
    </section>
  );
}
