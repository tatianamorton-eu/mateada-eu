import { createFileRoute } from "@tanstack/react-router";

import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { ProcessStory } from "@/components/sections/ProcessStory";
import { HeritageBanner } from "@/components/sections/HeritageBanner";
import { Benefits } from "@/components/sections/Benefits";
import { RitualGuide } from "@/components/sections/RitualGuide";
import { NewsletterCta } from "@/components/sections/NewsletterCta";
import heroLg from "@/assets/brand/hero-lg.webp";

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
      { property: "og:image", content: heroLg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mateada | Fine-Ground Yerba Mate" },
      {
        name: "twitter:description",
        content: "Yerba mate, made simple — pure soluble energy with a fresh, minimalist ritual.",
      },
      { name: "twitter:image", content: heroLg },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScrollProvider>
      <SiteHeader />
      <main className="bg-background text-foreground">
        <Hero />
        <TrustStrip />
        <ProductShowcase />
        <ProcessStory />
        <HeritageBanner />
        <Benefits />
        <RitualGuide />
        <NewsletterCta />
      </main>
      <SiteFooter />
    </SmoothScrollProvider>
  );
}
