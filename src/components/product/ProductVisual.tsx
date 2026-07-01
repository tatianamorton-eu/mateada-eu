import * as React from "react";
import { gsap } from "@/lib/gsap";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  /** PNG with transparent background. */
  src: string;
  alt: string;
  /**
   * Future swap point: provide a .glb / .gltf path here to replace the PNG
   * with a real Three.js model. The `src` PNG acts as the fallback until then.
   */
  modelSrc?: string;
  /** Tailwind height class applied to the <img>. Controls visual balance between products. */
  imageHeight?: string;
};

/**
 * Product presentation with CSS perspective + GSAP tilt.
 * No color overlays — product renders exactly as photographed.
 *
 * Desktop  — mouse-driven X/Y rotation + scale.
 * Touch    — slow auto-oscillation via RAF.
 * Reduced  — static.
 */
export function ProductVisual({ src, alt, imageHeight = "max-h-[360px] sm:max-h-[420px]" }: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (!isTouch || reducedMotion || !wrapperRef.current) return;
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = Date.now() / 1000;
      gsap.set(wrapperRef.current, {
        rotateX: Math.sin(t * 0.38) * 3.5,
        rotateY: Math.cos(t * 0.28) * 5,
      });
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [isTouch, reducedMotion]);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    gsap.to(wrapperRef.current, {
      rotateX: ny * 10,
      rotateY: nx * 12,
      scale: 1.05,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    gsap.to(wrapperRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-end justify-center"
      style={{ perspective: "1100px" }}
      onMouseMove={!isTouch && !reducedMotion ? handleMouseMove : undefined}
      onMouseLeave={!isTouch && !reducedMotion ? handleMouseLeave : undefined}
    >
      <div
        ref={wrapperRef}
        className="will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={src}
          alt={alt}
          className={`${imageHeight} w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.18)]`}
          loading="lazy"
        />
      </div>
    </div>
  );
}
