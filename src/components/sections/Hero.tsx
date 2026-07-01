import * as React from "react";
import { gsap } from "@/lib/gsap";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { RevealText } from "@/components/motion/RevealText";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { useScrollToHash } from "@/components/motion/SmoothScrollProvider";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import heroPathLg from "@/assets/brand/hero-path-lg.webp";
import heroPathSm from "@/assets/brand/hero-path-sm.webp";
import heroStickLg from "@/assets/brand/hero-stick-lg.webp";
import heroStickSm from "@/assets/brand/hero-stick-sm.webp";

export function Hero() {
  const scrollTo = useScrollToHash();
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const stickRef = React.useRef<HTMLDivElement | null>(null);
  const textRef = React.useRef<HTMLDivElement | null>(null);
  const isHoveredRef = React.useRef(false);

  const handleHoverIn = React.useCallback(() => {
    if (isTouch || reducedMotion || isHoveredRef.current) return;
    isHoveredRef.current = true;
    gsap.to(stickRef.current, {
      autoAlpha: 1,
      duration: 0.75,
      ease: "power2.inOut",
      overwrite: true,
    });
    gsap.to(textRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.in", overwrite: true });
  }, [isTouch, reducedMotion]);

  const handleHoverOut = React.useCallback(() => {
    if (isTouch || reducedMotion || !isHoveredRef.current) return;
    isHoveredRef.current = false;
    gsap.to(stickRef.current, {
      autoAlpha: 0,
      duration: 0.75,
      ease: "power2.inOut",
      overwrite: true,
    });
    gsap.to(textRef.current, { autoAlpha: 1, duration: 0.55, ease: "power2.out", overwrite: true });
  }, [isTouch, reducedMotion]);

  // Touch toggle: first tap shows stick, second tap (or corner tap) returns to default.
  const handleTouchEnd = React.useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (reducedMotion) return;
      const touch = e.changedTouches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (touch.clientX - rect.left) / rect.width;
      const ny = (touch.clientY - rect.top) / rect.height;
      const inNeutralZone = ny > 0.65 && (nx < 0.2 || nx > 0.8);

      if (isHoveredRef.current || inNeutralZone) {
        // showing stick, or tap in corner → return to default
        if (!isHoveredRef.current) return;
        isHoveredRef.current = false;
        gsap.to(stickRef.current, { autoAlpha: 0, duration: 0.75, ease: "power2.inOut", overwrite: true });
        gsap.to(textRef.current, { autoAlpha: 1, duration: 0.55, ease: "power2.out", overwrite: true });
      } else {
        // showing default, non-corner tap → show stick
        isHoveredRef.current = true;
        gsap.to(stickRef.current, { autoAlpha: 1, duration: 0.75, ease: "power2.inOut", overwrite: true });
        gsap.to(textRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.in", overwrite: true });
      }
    },
    [reducedMotion],
  );

  // Track mouse position: return to default image in lower corners
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isTouch || reducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      // Lower corners (bottom 35% + within 20% of left/right edge) = neutral zone
      if (ny > 0.65 && (nx < 0.2 || nx > 0.8)) {
        handleHoverOut();
      } else {
        handleHoverIn();
      }
    },
    [isTouch, reducedMotion, handleHoverIn, handleHoverOut],
  );

  return (
    <section
      id="top"
      className="relative isolate bg-[#3a4a1c] sm:flex sm:min-h-[100svh] sm:items-end sm:overflow-hidden"
      onMouseMove={!isTouch && !reducedMotion ? handleMouseMove : undefined}
      onMouseLeave={!isTouch ? handleHoverOut : undefined}
    >
      {/* Image block — on mobile: natural 2:1 aspect ratio; on desktop: absolute full-bleed */}
      <div
        className="relative aspect-[2/1] min-h-[50svh] w-full overflow-hidden sm:absolute sm:inset-0 sm:aspect-auto sm:min-h-0"
        onTouchEnd={isTouch && !reducedMotion ? handleTouchEnd : undefined}
      >
        <ParallaxLayer range={10} className="absolute inset-0">
          {/* Base image: PATH.png macro powder */}
          <div className="absolute inset-0">
            <picture>
              <source media="(max-width: 640px)" srcSet={heroPathSm} />
              <img
                src={heroPathLg}
                alt="Fine-ground yerba mate powder arranged in flowing curves, vibrant olive green."
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
                width={1774}
                height={887}
              />
            </picture>
          </div>

          {/* Hover image: stick_banner — starts invisible, GSAP fades it in */}
          <div
            ref={stickRef}
            className="absolute inset-0"
            style={{ opacity: 0, visibility: "hidden" }}
            aria-hidden="true"
          >
            <picture>
              <source media="(max-width: 640px)" srcSet={heroStickSm} />
              <img
                src={heroStickLg}
                alt=""
                className="h-full w-full object-cover object-center"
                loading="lazy"
                width={1717}
                height={916}
              />
            </picture>
          </div>
        </ParallaxLayer>
      </div>

      {/* Bottom gradient scrim for text legibility — desktop overlay only */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#2a3510]/80 via-[#2a3510]/10 to-transparent sm:block"
        aria-hidden="true"
      />

      {/* Content — on mobile: below image with brand-dark bg; on desktop: overlay at bottom */}
      <div className="relative w-full bg-[#2a3510] px-5 pb-10 pt-8 sm:mx-auto sm:max-w-[1600px] sm:bg-transparent sm:px-8 sm:pb-20 sm:pt-40 lg:px-12">
        {/* Text block — fades out on hover/tap */}
        <div ref={textRef}>
          <Heading as="h1" size="xl" className="max-w-3xl text-white">
            This is Mateada. Mate made simple.
          </Heading>
          <RevealText
            as="p"
            start="top 95%"
            className="mt-5 max-w-md text-sm uppercase tracking-[0.2em] text-white/85 sm:text-base"
          >
            Finely-ground pure yerba mate. Nothing else.
          </RevealText>
        </div>

        {/* CTA button — always visible */}
        <div className="mt-10">
          <Button
            variant="invert"
            className="border-white bg-white text-[#2a3510] hover:bg-transparent hover:text-white px-10 py-5 text-sm"
            onClick={() => scrollTo("#shop")}
            magnetic={false}
          >
            Shop the ritual
          </Button>
        </div>
      </div>
    </section>
  );
}
