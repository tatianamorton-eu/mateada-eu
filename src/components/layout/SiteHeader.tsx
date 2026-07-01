import * as React from "react";
import { cn } from "@/lib/utils";
import { useScrollToHash } from "@/components/motion/SmoothScrollProvider";
import { Button } from "@/components/ui/Button";
import { MenuIcon } from "@/components/ui/icons";
import { MobileNav } from "./MobileNav";
import { B2BDialog } from "./B2BDialog";
import logoUrl from "@/assets/brand/logo-header.webp";

type NavItemDef =
  | { label: string; href: string; onClick?: never }
  | { label: string; href?: never; onClick: () => void };

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [b2bOpen, setB2bOpen] = React.useState(false);
  const scrollTo = useScrollToHash();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = React.useCallback(
    (href: string) => {
      scrollTo(href);
      setMenuOpen(false);
    },
    [scrollTo],
  );

  // Three short items fit cleanly in the desktop header at lg (1024 px+).
  const headerNavItems = [
    { label: "Shop", href: "#shop" },
    { label: "Mateada Ritual", href: "#ritual" },
    { label: "Benefits", href: "#benefits" },
  ] as const;

  // Full list — all four items (including the long B2B label) go into the
  // hamburger menu, which is always reachable at every viewport width.
  const navItems: NavItemDef[] = [
    ...headerNavItems,
    { label: "For Cafés, Studios & Distributors", onClick: () => setB2bOpen(true) },
  ];

  const linkClass = cn(
    "group relative text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-500",
    !scrolled ? "text-white" : "text-foreground",
  );
  const underlineClass = cn(
    "absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full",
    !scrolled ? "bg-white" : "bg-foreground",
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
          scrolled
            ? "border-b border-border bg-background/95 backdrop-blur-sm"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-1.5 sm:px-8 sm:py-2 lg:px-12">

          {/* Logo — shrink-0 prevents flex from distorting proportions */}
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              navigate("#top");
            }}
            className="flex shrink-0 items-center"
            aria-label="Mateada home"
          >
            <img
              src={logoUrl}
              alt="Mateada"
              className={cn(
                "h-14 w-auto transition-[filter] duration-500 sm:h-16 md:h-20 xl:h-24 2xl:h-28",
                !scrolled ? "[filter:brightness(0)_invert(1)]" : "[filter:none]",
              )}
              width={600}
              height={400}
            />
          </a>

          {/*
           * Desktop nav — three short items only, visible at lg (1024 px+).
           * The long B2B label lives in the hamburger menu at all viewport widths.
           */}
          <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex 2xl:gap-8">
            {headerNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(item.href);
                }}
                className={linkClass}
              >
                {item.label}
                <span className={underlineClass} />
              </a>
            ))}
            <button
              type="button"
              onClick={() => setB2bOpen(true)}
              className={linkClass}
            >
              For Cafés, Studios & Distributors
              <span className={underlineClass} />
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {/* Shop Now — desktop only (lg+) */}
            <Button
              variant="solid"
              className="hidden px-8 py-4 text-sm xl:inline-flex"
              onClick={() => navigate("#shop")}
            >
              Shop now
            </Button>

            {/*
             * Hamburger — always visible at every width.
             * On desktop it gives access to the B2B item and the full menu.
             * On mobile/tablet it is the primary navigation trigger.
             */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center p-2"
              aria-label="Open menu"
            >
              <MenuIcon
                className={cn(
                  "h-6 w-6 transition-colors duration-500",
                  !scrolled ? "text-white" : "text-foreground",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navItems}
        onNavigate={navigate}
      />

      <B2BDialog open={b2bOpen} onClose={() => setB2bOpen(false)} />
    </>
  );
}
