import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ProductCard } from "@/components/product/ProductCard";
import productStick from "@/assets/brand/product-stick.webp";
import productBox from "@/assets/brand/product-box.webp";
import productBag from "@/assets/brand/product-bag.webp";

export function ProductShowcase() {
  return (
    <section
      id="shop"
      className="bg-primary px-4 py-14 text-primary-foreground sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-4 border-b border-primary-foreground/20 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="text-primary-foreground/70">Shop</Eyebrow>
            <Heading as="h2" size="lg" className="mt-3 max-w-4xl text-primary-foreground">
              Three simple ways to drink Mateada.
            </Heading>
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
            image={productStick}
            imageWidth={700}
            imageHeight={1052}
            altPrefix="Mateada single sachet, fine-ground yerba mate"
          />
          <ProductCard
            badge="Best value"
            title="Box of 20 Sachets"
            subtitle="Your home ritual"
            description="A full box for slower mornings and steady focus — buy once or subscribe and save 10%."
            price="€17.99"
            subscribePrice="€16.19 / month"
            image={productBox}
            imageWidth={1000}
            imageHeight={1089}
            altPrefix="Mateada box of 20 sachets"
            highlight
            subscribable
          />
          <ProductCard
            badge="Loose powder"
            title="Yerba Mate Bag"
            subtitle="100 grams, refill format"
            description="Fine-ground pure yerba mate in a resealable pouch — flexible scoops, less packaging."
            price="€15.99"
            subscribePrice="€14.39 / month"
            image={productBag}
            imageWidth={760}
            imageHeight={1140}
            altPrefix="Mateada 100 gram yerba mate pouch"
            subscribable
          />
        </div>
      </div>
    </section>
  );
}
