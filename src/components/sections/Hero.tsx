import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { RevealText } from "@/components/motion/RevealText";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { useScrollToHash } from "@/components/motion/SmoothScrollProvider";
import heroLg from "@/assets/brand/hero-lg.webp";
import heroSm from "@/assets/brand/hero-sm.webp";

export function Hero() {
  const scrollTo = useScrollToHash();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-primary"
    >
      <ParallaxLayer range={14} className="absolute inset-0">
        <picture>
          <source media="(max-width: 640px)" srcSet={heroSm} />
          <img
            src={heroLg}
            alt="Fine-ground yerba mate powder on a sunlit cream surface, dappled with leaf shadow."
            className="h-full w-full scale-110 object-cover"
            loading="eager"
            fetchPriority="high"
            width={1672}
            height={540}
          />
        </picture>
      </ParallaxLayer>

      <div
        className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-16 pt-40 sm:px-8 sm:pb-24 lg:px-12">
        <Eyebrow className="text-primary-foreground/70">Fine-Ground Yerba Mate</Eyebrow>
        <Heading as="h1" size="xl" className="mt-4 max-w-3xl text-primary-foreground">
          This is Mateada. Mate made simple.
        </Heading>
        <RevealText
          as="p"
          start="top 95%"
          className="mt-6 max-w-md text-sm uppercase tracking-[0.18em] text-primary-foreground/80 sm:text-base"
        >
          Finely ground. Pure yerba mate. Nothing else.
        </RevealText>
        <div className="mt-10">
          <Button variant="invert" onClick={() => scrollTo("#shop")}>
            Shop the ritual
          </Button>
        </div>
      </div>
    </section>
  );
}
