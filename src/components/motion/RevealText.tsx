import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ease, stagger as staggerTokens } from "@/lib/motion-tokens";

type RevealTextProps = {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  /** "lines" wipes each line up through a mask (default); "words" staggers per word. */
  splitBy?: "lines" | "words";
  start?: string;
  delay?: number;
};

/**
 * Splits text into lines or words via GSAP SplitText (mask: "lines" wraps
 * each line in an overflow-clipped span) and reveals them with a staggered
 * wipe-up on scroll — never a plain opacity fade.
 */
export function RevealText({
  children,
  as = "p",
  className,
  splitBy = "lines",
  start = "top 85%",
  delay = 0,
}: RevealTextProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reducedMotion) return;

      const split = SplitText.create(ref.current, {
        type: splitBy,
        mask: "lines",
        linesClass: "reveal-line",
        wordsClass: "reveal-word",
      });

      const targets = splitBy === "words" ? split.words : split.lines;

      gsap.from(targets, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        ease: ease.premium,
        stagger: splitBy === "words" ? staggerTokens.words : staggerTokens.lines,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      });

      return () => split.revert();
    },
    {
      scope: ref as React.RefObject<HTMLElement>,
      dependencies: [children, splitBy, reducedMotion],
    },
  );

  return React.createElement(as, { ref, className }, children);
}
