import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { recordBuyNow } from "@/lib/buy-now.functions";

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
    title: "Slow morning ritual",
    description: "A warm mate latte to begin the day calm, centred and ready.",
    image: momentLatte,
    alt: "Woman in soft green activewear stirring a warm mate latte beside a Mateada pouch.",
  },
  {
    title: "Mateada at the gym",
    description: "Cold-shaken mate in your bottle for clean, lasting energy through every session.",
    image: momentGym,
    alt: "Athlete drinking iced Mateada from a glass bottle after a workout.",
  },
] as const;

function Index() {
  const [showSource, setShowSource] = useState(false);

  return (
    <main className="bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-8 sm:py-4 lg:px-12">
          <a href="#top" className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label="Mateada home">
            <BrandMark className="h-12 w-12 shrink-0 sm:h-20 sm:w-20 lg:h-28 lg:w-28" />
            <span className="truncate font-display text-lg uppercase tracking-[0.18em] text-foreground sm:text-2xl sm:tracking-[0.24em] lg:text-3xl">
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
          <div className="relative mx-auto min-h-[60svh] w-full max-w-[1600px] sm:min-h-[86svh]" aria-hidden="true" />
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={yerbaFresh}
          alt="Fresh vibrant green yerba mate powder, close-up."
          className="h-[40svh] min-h-[260px] w-full object-cover sm:h-[60svh] sm:min-h-[360px]"
          loading="lazy"
          width={1672}
          height={940}
        />
        <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
          <p className="font-display text-[clamp(1.5rem,7vw,4.5rem)] uppercase tracking-[0.14em] text-primary-foreground [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:tracking-[0.22em]">
            From farm to cup
          </p>
        </div>
      </section>


      <section id="shop" className="bg-primary px-4 py-14 text-primary-foreground sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-4 border-b border-primary-foreground/20 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-primary-foreground/70">Shop</p>
              <h2 className="mt-3 max-w-4xl font-display text-[clamp(1.85rem,5vw,4.5rem)] uppercase tracking-[0.08em] text-primary-foreground sm:tracking-[0.12em]">
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
          className="h-[32svh] min-h-[220px] w-full object-cover sm:h-[50svh] sm:min-h-[320px]"
          loading="lazy"
          width={1672}
          height={940}
        />
      </section>

      <section id="benefits" className="border-b border-border bg-background px-4 py-14 sm:px-8 sm:py-24 lg:px-12">
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


      <section id="mate-guide" className="border-b border-border bg-card px-4 py-14 sm:px-8 sm:py-24 lg:px-12">
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

          <div className="mt-12 grid gap-6 md:grid-cols-2">
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
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const record = useServerFn(recordBuyNow);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openDialog = () => {
    setStatus("idle");
    setEmail("");
    setOpen(true);
    // Fire-and-forget: log the click even if they never enter an email
    record({ data: { product: title } }).catch(() => {});
  };

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    try {
      await record({ data: { product: title, email: email.trim() } });
      setStatus("done");
    } catch {
      setStatus("error");
    }
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
        </div>

        <p className="mt-8 text-sm uppercase tracking-[0.18em] text-primary-foreground/70">{subtitle}</p>
        <h3 className="mt-3 max-w-sm font-display text-[clamp(2rem,3vw,3rem)] uppercase leading-[0.95] tracking-[0.1em] text-primary-foreground">
          {title}
        </h3>

        <div className="mt-6 -mx-5 sm:-mx-7 overflow-hidden bg-gradient-to-b from-background/60 to-background/30 sm:mt-8">
          <img
            src={image}
            alt={altPrefix}
            className="mx-auto aspect-[1/1] w-full object-contain p-3 mix-blend-multiply sm:p-4"
            loading="lazy"
            width={1024}
            height={1280}
          />
        </div>
      </div>

      <div className="mt-8 border-t border-primary-foreground/16 pt-6">
        <p className="max-w-xl text-sm text-primary-foreground/80 sm:text-base">{description}</p>

        {subscribable && subscribePrice ? (
          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2" role="tablist" aria-label="Purchase option">
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
            onClick={openDialog}
            className="inline-flex w-fit items-center justify-center border border-primary-foreground bg-primary-foreground px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-primary transition-opacity hover:opacity-90"
          >
            {subscribable && mode === "subscribe" ? "Subscribe" : "Buy now"}
          </button>
          <p className="text-sm uppercase tracking-[0.18em] text-primary-foreground/80">
            {subscribable && mode === "subscribe" && subscribePrice ? subscribePrice : price}
          </p>
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Join the waitlist for ${title}`}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md border border-border bg-background p-6 text-foreground sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {status === "done" ? (
              <>
                <h4 className="font-display text-2xl uppercase tracking-[0.12em]">You're on the list</h4>
                <p className="mt-3 text-sm text-muted-foreground">
                  We'll email you the moment {title} is back in stock.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex items-center justify-center border border-primary bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
                <h4 className="mt-2 font-display text-2xl uppercase tracking-[0.12em]">
                  Currently out of stock
                </h4>
                <p className="mt-3 text-sm text-muted-foreground">
                  Leave your email and we'll notify you the moment it's back.
                </p>
                <form onSubmit={submitEmail} className="mt-5 flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    maxLength={254}
                    className="border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
                    >
                      No thanks
                    </button>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center justify-center border border-primary bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-60"
                    >
                      {status === "submitting" ? "Adding…" : "Notify me"}
                    </button>
                  </div>
                  {status === "error" ? (
                    <p className="text-xs text-destructive">Something went wrong. Please try again.</p>
                  ) : null}
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
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
