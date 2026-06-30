import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ease, duration as durationTokens } from "@/lib/motion-tokens";

type RevealImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  start?: string;
};

/**
 * Reveals an image with a clip-path wipe (mask), not an opacity fade —
 * the wrapper unclips top-to-bottom while the image settles in from a
 * slight scale, on scroll-into-view.
 */
export function RevealImage({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
  loading = "lazy",
  fetchPriority = "auto",
  start = "top 88%",
}: RevealImageProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!containerRef.current || !imgRef.current || reducedMotion) return;

      gsap.fromTo(
        containerRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: durationTokens.slow,
          ease: ease.premium,
          scrollTrigger: { trigger: containerRef.current, start, once: true },
        },
      );
      gsap.fromTo(
        imgRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          duration: durationTokens.slow,
          ease: ease.premium,
          scrollTrigger: { trigger: containerRef.current, start, once: true },
        },
      );
    },
    { scope: containerRef as React.RefObject<HTMLElement>, dependencies: [src, reducedMotion] },
  );

  return (
    <div ref={containerRef} className={cn("overflow-hidden", containerClassName)}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        className={cn("h-full w-full object-cover", className)}
      />
    </div>
  );
}
