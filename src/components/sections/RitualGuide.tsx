import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import ritualWomen from "@/assets/brand/ritual-women-lg.webp";
import ritualMen from "@/assets/brand/ritual-men-lg.webp";

gsap.registerPlugin(ScrollTrigger);

// ─── data ─────────────────────────────────────────────────────────────────────

const TABS = ["Traditional Mateada", "Mate Latte", "Join the Movement"] as const;
type Tab = (typeof TABS)[number];

const RECIPES: Record<Extract<Tab, "Traditional Mateada" | "Mate Latte">, string[]> = {
  "Traditional Mateada": [
    "Hot or cold water",
    "Mateada",
    "Whisk with an electric whisk or electric shaker",
  ],
  "Mate Latte": [
    "Hot or cold milk",
    "Mateada",
    "Whisk with an electric whisk or electric shaker",
    "Creamy, delicious",
  ],
};

// ─── media panel ──────────────────────────────────────────────────────────────

function VideoPanel({
  src,
  label,
  visible,
}: {
  src: string;
  label: string;
  visible: boolean;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (visible) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [visible]);

  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-700",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
        aria-label={label}
      />
    </div>
  );
}

// ─── movement panel ────────────────────────────────────────────────────────────

function MovementPanel({ visible }: { visible: boolean }) {
  const isTouch = useIsTouchDevice();
  const [scrollX, setScrollX] = React.useState(0);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const images = [
    { src: ritualWomen, alt: "Woman enjoying Mateada in a wellness moment." },
    { src: ritualMen, alt: "Man enjoying Mateada as part of his daily ritual." },
  ];

  const scrollTo = (idx: number) => {
    if (!trackRef.current) return;
    const child = trackRef.current.children[idx] as HTMLElement;
    trackRef.current.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setScrollX(scrollLeft / (scrollWidth - clientWidth));
  };

  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-700 flex flex-col",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      {/* scrollable track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex flex-1 snap-x snap-mandatory overflow-x-auto scrollbar-none"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((img) => (
          <div
            key={img.src}
            className="relative h-full w-full shrink-0 snap-center"
            style={{ scrollSnapAlign: "center" }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* dot indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`View image ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              scrollX < 0.5 ? (i === 0 ? "w-5 bg-white" : "w-1.5 bg-white/50") : (i === 1 ? "w-5 bg-white" : "w-1.5 bg-white/50"),
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── main component ────────────────────────────────────────────────────────────

export function RitualGuide() {
  const [active, setActive] = React.useState<Tab>("Traditional Mateada");
  const sectionRef = React.useRef<HTMLElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Entrance animations
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
      tl.fromTo(
        headingRef.current,
        { yPercent: 18, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      ).fromTo(
        tabsRef.current,
        { yPercent: 14, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5",
      ).fromTo(
        contentRef.current,
        { yPercent: 10, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      );
    },
    { scope: sectionRef as React.RefObject<HTMLElement> },
  );

  const isRecipe = active === "Traditional Mateada" || active === "Mate Latte";
  const steps = isRecipe ? RECIPES[active] : [];

  return (
    <section
      ref={sectionRef}
      id="ritual"
      className="border-b border-border bg-card px-4 py-14 sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-display text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[0.96] tracking-[0.05em] text-foreground"
        >
          Mateada, many rituals.
        </h2>

        {/* Tab bar */}
        <div
          ref={tabsRef}
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Preparation method"
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active === tab}
              onClick={() => setActive(tab)}
              className={cn(
                "border px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
                active === tab
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content grid */}
        <div
          ref={contentRef}
          className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-14"
        >
          {/* Left — steps (hidden on "Join the Movement") */}
          <div
            className={cn(
              "flex flex-col justify-center transition-opacity duration-500",
              isRecipe ? "opacity-100" : "opacity-0 pointer-events-none lg:block",
            )}
            aria-hidden={!isRecipe}
          >
            {isRecipe && (
              <ul className="flex flex-col">
                {steps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-5 border-t border-border py-4 text-sm uppercase tracking-[0.15em] text-foreground first:border-t-0"
                  >
                    <span className="font-display text-4xl font-light text-foreground/20 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right — media */}
          <div className="relative overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.14)] aspect-[3/4] w-full lg:aspect-[4/5]">
            <VideoPanel
              src="/videos/classic-mateada.mov"
              label="Traditional Mateada preparation"
              visible={active === "Traditional Mateada"}
            />
            <VideoPanel
              src="/videos/mateada-latte.mov"
              label="Mate Latte preparation"
              visible={active === "Mate Latte"}
            />
            <MovementPanel visible={active === "Join the Movement"} />
          </div>
        </div>
      </div>
    </section>
  );
}
