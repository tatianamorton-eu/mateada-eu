import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import ritualWomen from "@/assets/brand/ritual-women-lg.webp";
import ritualMen from "@/assets/brand/ritual-men-lg.webp";

gsap.registerPlugin(ScrollTrigger);

// ─── data ─────────────────────────────────────────────────────────────────────

const TABS = ["Traditional Mateada", "Mateada Latte", "Join the Movement"] as const;
type Tab = (typeof TABS)[number];

const RECIPES: Record<Extract<Tab, "Traditional Mateada" | "Mateada Latte">, string[]> = {
  "Traditional Mateada": [
    "Hot or cold water",
    "One Mateada Stick or one teaspoon of Mateada",
    "Whisk with an electric whisk or electric shaker",
  ],
  "Mateada Latte": [
    "Hot or cold milk",
    "One Mateada Stick or one teaspoon of Mateada",
    "Whisk with an electric whisk or electric shaker",
    "Creamy, delicious",
  ],
};

// ─── video panel ──────────────────────────────────────────────────────────────

function VideoPanel({ src, label, visible }: { src: string; label: string; visible: boolean }) {
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
  const img1Ref = React.useRef<HTMLDivElement>(null);
  const img2Ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!visible) {
        gsap.set([img1Ref.current, img2Ref.current], { clearProps: "x,opacity" });
        return;
      }
      gsap.fromTo(
        img1Ref.current,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
      );
      gsap.fromTo(
        img2Ref.current,
        { x: 24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, delay: 0.1, ease: "power3.out" },
      );
    },
    { dependencies: [visible] },
  );

  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="flex h-full gap-2">
        <div ref={img1Ref} className="flex-1 overflow-hidden rounded-xl">
          <img
            src={ritualWomen}
            alt="Woman enjoying Mateada in a wellness moment."
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div ref={img2Ref} className="flex-1 overflow-hidden rounded-xl">
          <img
            src={ritualMen}
            alt="Man enjoying Mateada as part of his daily ritual."
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

// ─── main ─────────────────────────────────────────────────────────────────────

export function RitualGuide() {
  const [active, setActive] = React.useState<Tab>("Traditional Mateada");
  const sectionRef = React.useRef<HTMLElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const tabsRef = React.useRef<HTMLDivElement>(null);

  // Entrance — opacity-only on the content to avoid scroll jitter from large video
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
      tl.fromTo(
        headingRef.current,
        { yPercent: 10, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          tabsRef.current,
          { yPercent: 8, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.45",
        )
    },
    { scope: sectionRef as React.RefObject<HTMLElement> },
  );

  const isRecipe = active === "Traditional Mateada" || active === "Mateada Latte";
  const steps = isRecipe ? RECIPES[active as Extract<Tab, "Traditional Mateada" | "Mateada Latte">] : [];

  return (
    <section
      ref={sectionRef}
      id="ritual"
      className="border-b border-border bg-card px-4 py-8 sm:px-8 sm:py-12 lg:px-12"
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
          className="mt-5 flex flex-wrap gap-2"
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
                "border px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
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
        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-8">
          {/* Left — recipe steps */}
          <div
            className={cn(
              "flex flex-col justify-center transition-opacity duration-500",
              isRecipe ? "opacity-100" : "opacity-0 pointer-events-none lg:hidden",
            )}
            aria-hidden={!isRecipe}
          >
            {isRecipe && (
              <ul className="flex flex-col">
                {steps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-4 border-t border-border py-3 text-sm uppercase tracking-[0.15em] text-foreground first:border-t-0"
                  >
                    <span className="font-display text-3xl font-light text-foreground/20 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right — media */}
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] aspect-[3/4] w-full lg:aspect-[4/3]",
              !isRecipe && "lg:col-span-2 lg:justify-self-center lg:max-w-[50%]",
            )}
          >
            <VideoPanel
              src="/videos/classic-mateada.mov"
              label="Traditional Mateada preparation"
              visible={active === "Traditional Mateada"}
            />
            <VideoPanel
              src="/videos/mateada-latte.mov"
              label="Mateada Latte preparation"
              visible={active === "Mateada Latte"}
            />
            <MovementPanel visible={active === "Join the Movement"} />
          </div>
        </div>
      </div>
    </section>
  );
}
