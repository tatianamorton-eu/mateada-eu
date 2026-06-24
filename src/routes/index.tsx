import { createFileRoute } from "@tanstack/react-router";
import { useState, type MouseEvent } from "react";

import { cn } from "../lib/utils";
import heroPowderAsset from "../assets/hero-powder.png.asset.json";
import heroPlantationAsset from "../assets/hero-plantation.png.asset.json";
const heroPowder = heroPowderAsset.url;
const heroPlantation = heroPlantationAsset.url;
import powderBand from "../assets/mate-powder-band.png";
import sachetFront from "../assets/sachet-1.jpg";
import sachetAngle from "../assets/sachet-2.jpg";
import sachetSide from "../assets/sachet-3.jpg";
import boxHero from "../assets/mateada-box.png";
import boxFront from "../assets/box-1.jpg";
import boxAngle from "../assets/box-2.jpg";
import boxSide from "../assets/box-3.jpg";
import ritualLatte from "../assets/ritual-latte.jpg";
import ritualIced from "../assets/ritual-iced.jpg";
import ritualGym from "../assets/ritual-gym.jpg";
import ritualHot from "../assets/ritual-hot.jpg";
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
          <div
            className={cn(
              "absolute inset-0 transition-colors duration-700",
              showSource ? "bg-foreground/25" : "bg-background/10",
            )}
          />

          <div className="relative mx-auto flex min-h-[86svh] max-w-[1600px] flex-col items-center justify-center px-5 py-20 text-center sm:px-8 lg:px-12">
            <BrandMark className={cn("mb-5 h-40 w-40 sm:h-52 sm:w-52 md:h-60 md:w-60", showSource && "text-primary-foreground")} />
            <p
              className={cn(
                "font-display text-[clamp(3.5rem,9vw,8rem)] uppercase leading-none tracking-[0.18em] [text-shadow:0_2px_18px_rgba(250,247,238,0.75)]",
                showSource ? "text-primary-foreground" : "text-foreground",
              )}
            >
              Mateada
            </p>
            <p
              className={cn(
                "mt-4 text-xs uppercase tracking-[0.32em] sm:text-sm [text-shadow:0_1px_10px_rgba(250,247,238,0.85)]",
                showSource ? "text-primary-foreground/90" : "text-foreground/90",
              )}
            >
              Fine-ground yerba mate
            </p>
            <div className="my-7 h-16 w-px bg-current/35" aria-hidden="true" />
            <h1
              className={cn(
                "max-w-5xl font-sans text-2xl font-semibold uppercase tracking-[0.22em] sm:text-4xl md:text-5xl [text-shadow:0_2px_22px_rgba(250,247,238,0.9),0_0_40px_rgba(250,247,238,0.6)]",
                showSource ? "text-primary-foreground" : "text-foreground",
              )}
            >
              {showSource
                ? "Source with care from Misiones, Argentina to you"
                : "Natural energy that lasts"}
            </h1>
            <p
              className={cn(
                "mt-6 max-w-2xl text-sm font-semibold uppercase tracking-[0.16em] sm:text-base [text-shadow:0_1px_14px_rgba(250,247,238,0.85)]",
                showSource ? "text-primary-foreground" : "text-primary",
              )}
            >
              {showSource
                ? "A slower ritual rooted in living green landscapes."
                : "The first pure soluble yerba mate, crafted for wellness, clarity, and everyday ease."}
            </p>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={powderBand}
          alt="Close-up of vibrant green yerba mate powder."
          className="h-[46svh] min-h-[320px] w-full object-cover"
          loading="lazy"
          width={663}
          height={580}
        />
        <div className="absolute inset-0 bg-foreground/20" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-10 text-center sm:px-8 lg:px-12">
          <div className="mb-6 h-16 w-px bg-primary-foreground/55" aria-hidden="true" />
          <p className="font-display text-[clamp(2rem,6vw,4rem)] uppercase tracking-[0.18em] text-primary-foreground">
            From farm to cup
          </p>
        </div>
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

      <section id="shop" className="bg-primary px-5 py-18 text-primary-foreground sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-4 border-b border-primary-foreground/20 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-primary-foreground/70">Shop</p>
              <h2 className="mt-3 max-w-4xl font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase tracking-[0.12em] text-primary-foreground">
                Two simple ways to drink Mateada.
              </h2>
            </div>
            <p className="max-w-xl text-sm uppercase tracking-[0.16em] text-primary-foreground/75">
              Hover across each product to move through its 360-style view.
            </p>
          </div>

          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            <ProductCard
              badge="Single serve"
              title="Daily Sachets"
              subtitle="Fine-ground yerba mate"
              description="Pure soluble mate in an easy everyday format for water, latte, iced, or hot rituals."
              price="From €24"
              images={[sachetFront, sachetAngle, sachetSide]}
              altPrefix="Mateada sachet"
            />
            <ProductCard
              badge="10% less in bulk"
              title="Box of 20 Sachets"
              subtitle="Your home ritual"
              description="A full box for slower mornings and steady focus — with better value when you stock up."
              price="From €43"
              images={[boxHero, boxFront, boxAngle, boxSide]}
              altPrefix="Mateada sachet box"
              highlight
            />
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

      <section id="mateada" className="bg-background px-5 py-18 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Mateada</p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] uppercase tracking-[0.14em] text-foreground">
              Nature-led energy for a slower life.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Mateada is built around purity, simplicity, and the feeling of being close to nature.
              We take the depth of yerba mate and make it easier to live with every day.
            </p>
            <p className="mt-5 text-lg text-muted-foreground">
              As the first pure soluble yerba mate, it keeps the ritual clean: fine-ground leaves,
              careful sourcing from Misiones, and a fresh modern format designed for focus, wellness,
              and clarity.
            </p>
            <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:gap-10">
              <div>
                <p className="font-display text-4xl uppercase tracking-[0.12em] text-foreground">01</p>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                  Pure soluble innovation
                </p>
              </div>
              <div>
                <p className="font-display text-4xl uppercase tracking-[0.12em] text-foreground">02</p>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                  Sourced with care in Argentina
                </p>
              </div>
              <div>
                <p className="font-display text-4xl uppercase tracking-[0.12em] text-foreground">03</p>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                  Designed for modern rituals
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border border-border bg-card">
            <img
              src={heroPlantation}
              alt="Sunlit yerba mate plantation hills in Misiones, Argentina."
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
              width={1536}
              height={1024}
            />
            <div className="border-t border-border px-6 py-6">
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Yerba mate, made simple.
              </p>
            </div>
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
  images,
  altPrefix,
  highlight = false,
}: {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  images: string[];
  altPrefix: string;
  highlight?: boolean;
}) {
  const [frameIndex, setFrameIndex] = useState(0);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - bounds.left) / bounds.width;
    const nextIndex = Math.max(0, Math.min(images.length - 1, Math.floor(ratio * images.length)));
    setFrameIndex(nextIndex);
  };

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
          <div className="flex gap-2" aria-hidden="true">
            {images.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "h-1.5 w-8 rounded-full transition-colors",
                  frameIndex === index ? "bg-primary-foreground" : "bg-primary-foreground/25",
                )}
              />
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm uppercase tracking-[0.18em] text-primary-foreground/70">{subtitle}</p>
        <h3 className="mt-3 max-w-sm font-display text-[clamp(2.4rem,4vw,4.2rem)] uppercase leading-[0.95] tracking-[0.1em] text-primary-foreground">
          {title}
        </h3>

        <div
          className="mt-8 overflow-hidden border border-primary-foreground/16 bg-background/4"
          onMouseMove={handleMove}
          onMouseLeave={() => setFrameIndex(0)}
        >
          <img
            src={images[frameIndex]}
            alt={`${altPrefix} view ${frameIndex + 1}`}
            className="aspect-[4/5] w-full object-cover"
            loading="lazy"
            width={1024}
            height={1280}
          />
        </div>
      </div>

      <div className="mt-8 border-t border-primary-foreground/16 pt-6">
        <p className="max-w-xl text-sm text-primary-foreground/80 sm:text-base">{description}</p>
        <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#top"
            className="inline-flex w-fit items-center justify-center border border-primary-foreground/30 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-80"
          >
            Explore product
          </a>
          <p className="text-sm uppercase tracking-[0.18em] text-primary-foreground/80">{price}</p>
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
