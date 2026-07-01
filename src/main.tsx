import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { HeritageBanner } from "@/components/sections/HeritageBanner";
import { Benefits } from "@/components/sections/Benefits";
import { RitualGuide } from "@/components/sections/RitualGuide";
import { NewsletterCta } from "@/components/sections/NewsletterCta";

function App() {
  return (
    <SmoothScrollProvider>
      <SiteHeader />
      <main className="bg-background text-foreground">
        <Hero />
        <TrustStrip />
        <ProductShowcase />
        <HeritageBanner />
        <Benefits />
        <RitualGuide />
        <NewsletterCta />
      </main>
      <SiteFooter />
    </SmoothScrollProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
