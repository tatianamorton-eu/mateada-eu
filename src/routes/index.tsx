import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { cn } from "../lib/utils";
import heroPowderAsset from "../assets/hero-powder.png.asset.json";
import heroPlantationAsset from "../assets/hero-plantation.png.asset.json";
const heroPowder = heroPowderAsset.url;
const heroPlantation = heroPlantationAsset.url;
import powderBand from "../assets/mate-powder-band.png";
import yerbaFreshAsset from "../assets/yerba-fresh.png.asset.json";
const yerbaFresh = yerbaFreshAsset.url;
import sachetSingleAsset from "../assets/sachet-single.png.asset.json";
import yerbaBagAsset from "../assets/yerba-bag.png.asset.json";
import boxHeroAsset from "../assets/mateada-box-v2.png.asset.json";
const sachetSingle = sachetSingleAsset.url;
const yerbaBag = yerbaBagAsset.url;
const boxHero = boxHeroAsset.url;
import momentLatteAsset from "../assets/moment-latte.png.asset.json";
import momentGymAsset from "../assets/moment-gym.png.asset.json";
const momentLatte = momentLatteAsset.url;
const momentGym = momentGymAsset.url;
import mateadaLogo from "../assets/mateada-logo.png.asset.json";

const SITE_URL = "https://id-preview--2cf516a2-25e9-4ed8-86a2-71ef3a13b65d.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mateada | Fine-Ground Yerba Mate" },
      {
        name: "description",
        content:
          "Mateada is fine-ground yerba mate made simple — pure soluble energy, sourced with care from Misiones, Argentina.",
      },
      { property: "og:title", content: "Mateada | Fine-Ground Yerba Mate" },
      {
        property: "og:description",
        content:
          "Pure soluble yerba mate with a slow-living, nature-led ritual. Discover benefits, products, and simple ways to prepare it.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroPowder },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mateada | Fine-Ground Yerba Mate" },
      {
        name: "twitter:description",
        content:
          "Yerba mate, made simple — pure soluble energy with a fresh, minimalist ritual.",
      },
      { name: "twitter:image", content: heroPowder },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Index,
});

const navItems = [
  { label: "SHOP", href: "#shop" },
  { label: "BENEFITS", href: "#benefits" },
  { label: "MATEADA", href: "#mateada" },
  { label: "MATE GUIDE", href: "#mate-guide" },
];

const benefits = [
  {
    title: "Natural caffeine",
    body: "Long-lasting energy",
    icon: LeafIcon,
  },
  {
    title: "Theobromine and Theophylline",
    body: "Gentle stimulation",
    icon: MoleculeIcon,
  },
  {
    title: "Rich in antioxidants",
    body: "Pure plant support",
    icon: SparkIcon,
  },
  {
    title: "No added sugar",
    body: "Pure & clean",
    icon: CircleSlashIcon,
  },
] as const;

const guideCards = [
  {
    title: "Mate latte",
    description: "Smooth, creamy, slow mornings.",
    image: ritualLatte,
    alt: "Mate latte in a ceramic cup on soft fabric.",
  },
  {
    title: "Iced mate",
    description: "Bright, chilled, and refreshing.",
    image: ritualIced,
    alt: "Iced green yerba mate in a clear glass.",
  },
  {
    title: "Hot and simple",
    description: "Warm water, clean focus, no extras.",
    image: ritualHot,
    alt: "Steaming cup of hot yerba mate beside an open book.",
  },
  {
    title: "Just with water",
    description: "Your on-the-go daily ritual.",
    image: ritualGym,
    alt: "Mate sachet and water bottle on a gym bench.",
  },
] as const;

function Index() {
  const [showSource, setShowSource] = useState(false);

  return (
    <main className="bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-3" aria-label="Mateada home">
            <BrandMark className="h-24 w-24 sm:h-28 sm:w-28" />
            <span className="font-display text-2xl uppercase tracking-[0.24em] text-foreground sm:text-3xl">
              Mateada
            </span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-70"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
        <nav aria-label="Mobile" className="flex overflow-x-auto border-t border-border/60 px-5 py-3 md:hidden">
          <div className="flex min-w-max gap-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.18em] text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section id="top" className="border-b border-border">
        <div
          className="relative isolate overflow-hidden"
          onMouseEnter={() => setShowSource(true)}
          onMouseLeave={() => setShowSource(false)}
          onFocus={() => setShowSource(true)}
          onBlur={() => setShowSource(false)}
        >
          <img
            src={heroPowder}
            alt="Fresh fine-ground yerba mate powder on a cream surface."
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-700",
              showSource ? "scale-105 opacity-0" : "scale-100 opacity-100",
            )}
            width={1536}
            height={1024}
          />
          <img
            src={heroPlantation}
            alt="Yerba mate plantation in Misiones, Argentina."
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-700",
              showSource ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
            width={1536}
            height={1024}
          />
          <div className="relative mx-auto min-h-[86svh] w-full max-w-[1600px]" aria-hidden="true" />
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={yerbaFresh}
          alt="Fresh vibrant green yerba mate powder, close-up."
          className="h-[60svh] min-h-[360px] w-full object-cover"
          loading="lazy"
          width={1672}
          height={940}
        />
        <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
          <p className="font-display text-[clamp(2rem,6vw,4.5rem)] uppercase tracking-[0.22em] text-primary-foreground [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
            From farm to cup
          </p>
        </div>
      </section>

      <section id="shop" className="bg-primary px-5 py-18 text-primary-foreground sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-4 border-b border-primary-foreground/20 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-primary-foreground/70">Shop</p>
              <h2 className="mt-3 max-w-4xl font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase tracking-[0.12em] text-primary-foreground">
                Three simple ways to drink Mateada.
              </h2>
            </div>
            <p className="max-w-xl text-sm uppercase tracking-[0.16em] text-primary-foreground/75">
              Buy once or subscribe and save on every refill.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <ProductCard
              badge="Single serve"
              title="Single Sachet"
              subtitle="Fine-ground yerba mate"
              description="One pure stick to try the ritual — perfect for water, latte, iced, or hot."
              price="€1"
              image={sachetSingle}
              altPrefix="Mateada single sachet"
            />
            <ProductCard
              badge="Best value"
              title="Box of 20 Sachets"
              subtitle="Your home ritual"
              description="A full box for slower mornings and steady focus — buy once or subscribe and save 10%."
              price="€17.99"
              subscribePrice="€16.19 / month"
              image={boxHero}
              altPrefix="Mateada sachet box"
              highlight
              subscribable
            />
            <ProductCard
              badge="Loose powder"
              title="Yerba Mate Bag"
              subtitle="20 servings, refill format"
              description="Fine-ground pure yerba mate in a resealable pouch — flexible scoops, less packaging."
              price="€15.99"
              subscribePrice="€14.39 / month"
              image={yerbaBag}
              altPrefix="Mateada yerba mate pouch"
              subscribable
            />

          </div>

        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-border" aria-hidden="true">
        <img
          src={yerbaFresh}
          alt=""
          className="h-[50svh] min-h-[320px] w-full object-cover"
          loading="lazy"
          width={1672}
          height={940}
        />
      </section>

      <section id="benefits" className="border-b border-border bg-background px-5 py-18 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Pure yerba mate.</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] uppercase tracking-[0.14em] text-foreground">
              Nothing else.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  className="flex flex-col items-center border-t border-border pt-8 text-center xl:border-l xl:border-t-0 xl:pl-8 xl:first:border-l-0"
                >
                  <Icon className="h-8 w-8 text-foreground" />
                  <h3 className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                    {benefit.body}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-16 flex flex-col items-center text-center">
            <div className="mb-6 h-12 w-px bg-border" aria-hidden="true" />
            <p className="max-w-3xl font-sans text-lg font-medium uppercase tracking-[0.2em] text-foreground sm:text-2xl">
              Smooth taste. Clean energy. All day long.
            </p>
          </div>
        </div>
      </section>


      <section id="mate-guide" className="border-b border-border bg-card px-5 py-18 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Mate guide</p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] uppercase tracking-[0.14em] text-foreground">
              One plant, many rituals.
            </h2>
            <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Mix it with water, pour it over ice, make a quiet latte, or keep it simple on the move.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {guideCards.map((card) => (
              <article key={card.title} className="overflow-hidden border border-border bg-background">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                  width={800}
                  height={1000}
                />
                <div className="border-t border-border px-5 py-5">
                  <h3 className="text-lg font-medium uppercase tracking-[0.14em] text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.14em] text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

function ProductCard({
  badge,
  title,
  subtitle,
  description,
  price,
  subscribePrice,
  image,
  altPrefix,
  highlight = false,
  subscribable = false,
}: {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  subscribePrice?: string;
  image: string;
  altPrefix: string;
  highlight?: boolean;
  subscribable?: boolean;
}) {
  const [mode, setMode] = useState<"once" | "subscribe">("once");

  return (
    <article
      className={cn(
        "flex flex-col justify-between border border-primary-foreground/16 bg-primary/70 p-5 sm:p-7",
        highlight && "bg-primary/55",
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "inline-flex w-fit items-center rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.18em]",
              highlight ? "bg-highlight text-foreground" : "border border-primary-foreground/25 text-primary-foreground",
            )}
          >
            {badge}
          </span>
        </div>

        <p className="mt-8 text-sm uppercase tracking-[0.18em] text-primary-foreground/70">{subtitle}</p>
        <h3 className="mt-3 max-w-sm font-display text-[clamp(2rem,3vw,3rem)] uppercase leading-[0.95] tracking-[0.1em] text-primary-foreground">
          {title}
        </h3>

        <div className="mt-8 overflow-hidden border border-primary-foreground/16 bg-gradient-to-b from-background to-background/90 p-6 sm:p-10">
          <img
            src={image}
            alt={altPrefix}
            className="mx-auto aspect-[4/5] w-full object-contain mix-blend-multiply"
            loading="lazy"
            width={1024}
            height={1280}
          />
        </div>
      </div>

      <div className="mt-8 border-t border-primary-foreground/16 pt-6">
        <p className="max-w-xl text-sm text-primary-foreground/80 sm:text-base">{description}</p>

        {subscribable && subscribePrice ? (
          <div className="mt-6 grid grid-cols-2 gap-2" role="tablist" aria-label="Purchase option">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "once"}
              onClick={() => setMode("once")}
              className={cn(
                "border px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
                mode === "once"
                  ? "border-primary-foreground bg-primary-foreground text-primary"
                  : "border-primary-foreground/30 text-primary-foreground/80 hover:border-primary-foreground/60",
              )}
            >
              One-time · {price}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "subscribe"}
              onClick={() => setMode("subscribe")}
              className={cn(
                "border px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
                mode === "subscribe"
                  ? "border-primary-foreground bg-primary-foreground text-primary"
                  : "border-primary-foreground/30 text-primary-foreground/80 hover:border-primary-foreground/60",
              )}
            >
              Subscribe · {subscribePrice}
            </button>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="inline-flex w-fit items-center justify-center border border-primary-foreground bg-primary-foreground px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-primary transition-opacity hover:opacity-90"
          >
            {subscribable && mode === "subscribe" ? "Subscribe" : "Buy now"}
          </button>
          <p className="text-sm uppercase tracking-[0.18em] text-primary-foreground/80">
            {subscribable && mode === "subscribe" && subscribePrice ? subscribePrice : price}
          </p>
        </div>
      </div>
    </article>
  );
}


function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src={mateadaLogo.url}
      alt="Mateada"
      className={cn("object-contain", className)}
      loading="eager"
      decoding="async"
    />
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 14c0-5 4-9 9-9 3 0 5 1 7 3-1 7-5 11-11 11-2 0-4-1-5-2Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 15C9 13 7 12 4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MoleculeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="19" cy="7" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="19" cy="17" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 12h8M15.8 10.7l1.8-2.1M15.8 13.3l1.8 2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3c2 4 5 7 9 9-4 2-7 5-9 9-2-4-5-7-9-9 4-2 7-5 9-9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CircleSlashIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8 16 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
