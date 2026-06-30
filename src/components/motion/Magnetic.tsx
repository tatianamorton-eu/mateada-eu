import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

/** Pointer-follow micro-interaction for buttons/links — desktop (fine pointer) only. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const disabled = isTouch || reducedMotion;

  useGSAP(
    () => {
      if (!ref.current || disabled) return;
      const el = ref.current;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);
        xTo(relX * strength);
        yTo(relY * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref as React.RefObject<HTMLElement>, dependencies: [disabled, strength] },
  );

  return (
    <div ref={ref} className={cn("inline-flex will-change-transform", className)}>
      {children}
    </div>
  );
}
