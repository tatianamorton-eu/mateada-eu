const footerNav = [
  { label: "Shop", href: "#shop" },
  { label: "Ritual", href: "#ritual" },
  { label: "Benefits", href: "#benefits" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-primary-foreground/10 bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-2xl uppercase tracking-[0.2em]">Mateada</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-primary-foreground/60">
            Fine-ground yerba mate
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {footerNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-[0.16em] text-primary-foreground/80 transition-opacity hover:text-primary-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="max-w-xs text-sm uppercase tracking-[0.16em] text-primary-foreground/60">
          Made for modern life — from Europe, inspired by nature.
        </p>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1600px] flex-col gap-2 border-t border-primary-foreground/10 pt-6 text-xs uppercase tracking-[0.14em] text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Mateada. All rights reserved.</p>
        <p>Misiones, Argentina — made for Europe.</p>
      </div>
    </footer>
  );
}
