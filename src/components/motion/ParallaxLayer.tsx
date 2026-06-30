import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";

type ParallaxLayerProps = {
  children: React.ReactNode;
  className?: string;
  /** max px of travel in any direction */
  range?: number;
};

/** Subtle cursor-driven parallax for hero/decorative imagery — desktop only, capped range. */
export function ParallaxLayer({ children, className, range = 12 }: ParallaxLayerProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const disabled = isTouch || reducedMotion;

  useGSAP(
    () => {
      if (!ref.current || disabled) return;
      const el = ref.current;
      const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        xTo(nx * range * 2);
        yTo(ny * range * 2);
      };

      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: ref as React.RefObject<HTMLElement>, dependencies: [disabled, range] },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
