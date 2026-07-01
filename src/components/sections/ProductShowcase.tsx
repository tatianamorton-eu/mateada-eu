import * as React from "react";
import { ProductVisual } from "@/components/product/ProductVisual";
import { WaitlistDialog } from "@/components/product/WaitlistDialog";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import productCaja from "@/assets/brand/product-caja.webp";
import productBag from "@/assets/brand/product-bag.webp";

const products = [
  {
    title: "Box of 20 Sachets",
    description: "Fine-ground yerba mate — ready to dissolve, no prep needed.",
    price: "€17.99",
    subscribePrice: "€16.19 / month",
    src: productCaja,
    imageHeight: "max-h-[340px] sm:max-h-[390px]",
  },
  {
    title: "Yerba Mate Bag",
    description: "100g in a resealable pouch. Flexible scoops, less packaging.",
    price: "€15.99",
    subscribePrice: "€14.39 / month",
    src: productBag,
    imageHeight: "max-h-[390px] sm:max-h-[440px]",
  },
] as const;

export function ProductShowcase() {
  return (
    <section
      id="shop"
      className="bg-primary px-4 py-6 text-primary-foreground sm:px-8 sm:py-8 lg:px-12"
    >
      <div className="mx-auto max-w-[1300px]">
        {/* Heading */}
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] uppercase leading-[0.98] tracking-[0.06em] text-primary-foreground">
            The Mateada collection.
          </h2>
        </div>

        {/* Grid — 1 col mobile, 2 col sm+ */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {products.map((product) => (
            <CollectionCard key={product.title} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ product }: { product: (typeof products)[number] }) {
  const [mode, setMode] = React.useState<"once" | "subscribe">("once");
  const [open, setOpen] = React.useState(false);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-sage text-center">
      {/* Product name — above image */}
      <div className="px-6 pb-1 pt-5 sm:px-8 sm:pt-6">
        <h3 className="font-display text-[clamp(1.55rem,2.3vw,2rem)] font-semibold uppercase leading-tight tracking-[0.07em] text-foreground">
          {product.title}
        </h3>
      </div>

      {/* Product image */}
      <div className="flex flex-1 items-end justify-center px-4 pb-2 sm:px-6">
        <ProductVisual src={product.src} alt={product.title} imageHeight={product.imageHeight} />
      </div>

      {/* Bottom info */}
      <div className="border-t border-foreground/15 px-6 pb-5 pt-4 sm:px-8 sm:pb-6 sm:pt-5">
        <p className="mb-4 text-sm leading-relaxed text-foreground sm:text-[0.9rem]">
          {product.description}
        </p>

        {/* CTA — full width */}
        <Button
          variant="solid"
          magnetic={false}
          onClick={() => setOpen(true)}
          className="w-full py-3.5 text-sm tracking-[0.2em] sm:py-4"
        >
          {mode === "subscribe" ? "Subscribe" : "Buy now"}
        </Button>

        {/* Price + subscribe toggle */}
        <div className="mt-4">
          <p className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            {mode === "subscribe" ? product.subscribePrice.split(" ")[0] : product.price}
          </p>
          <button
            type="button"
            onClick={() => setMode(mode === "once" ? "subscribe" : "once")}
            className={cn(
              "mt-1 text-xs uppercase tracking-[0.15em] transition-opacity",
              mode === "subscribe"
                ? "text-foreground/80 hover:text-foreground"
                : "text-foreground/70 hover:text-foreground",
            )}
          >
            {mode === "subscribe" ? "← one-time" : `Subscribe · ${product.subscribePrice}`}
          </button>
        </div>
      </div>

      <WaitlistDialog open={open} onOpenChange={setOpen} productTitle={product.title} />
    </article>
  );
}
