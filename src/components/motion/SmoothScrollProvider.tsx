import * as React from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";

const LenisContext = React.createContext<Lenis | null>(null);

/**
 * Mounts Lenis once on the client. Touch devices and prefers-reduced-motion
 * keep native scrolling — Lenis smoothing is a desktop-only enhancement and
 * ScrollTrigger-driven reveals work identically either way.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();

  React.useEffect(() => {
    if (reducedMotion || isTouch === undefined || isTouch) return;

    const instance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion, isTouch]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return React.useContext(LenisContext);
}

/** Smooth-scrolls to a hash target, falling back to native scrollIntoView when Lenis is off. */
export function useScrollToHash() {
  const lenis = useLenis();

  return React.useCallback(
    (hash: string) => {
      const target = document.querySelector(hash);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -88 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis],
  );
}
