import * as React from "react";
import { cn } from "@/lib/utils";
import { useScrollToHash } from "@/components/motion/SmoothScrollProvider";
import { Button } from "@/components/ui/Button";
import { MenuIcon } from "@/components/ui/icons";
import { MobileNav } from "./MobileNav";
import logoUrl from "@/assets/brand/logo.webp";

const navItems = [
  { label: "Shop", href: "#shop" },
  { label: "Ritual", href: "#ritual" },
  { label: "Process", href: "#process" },
  { label: "Benefits", href: "#benefits" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
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
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              navigate("#top");
            }}
            className="flex items-center"
            aria-label="Mateada home"
          >
            <img
              src={logoUrl}
              alt="Mateada"
              className="h-10 w-auto sm:h-12"
              width={620}
              height={350}
            />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(item.href);
                }}
                className="group relative text-sm font-medium uppercase tracking-[0.18em] text-foreground"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="solid"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => navigate("#shop")}
            >
              Shop now
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 md:hidden"
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6 text-foreground" />
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
    </>
  );
}
