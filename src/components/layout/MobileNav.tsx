import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { CloseIcon } from "@/components/ui/icons";

type NavItem = { label: string; href: string };

export function MobileNav({
  open,
  onClose,
  items,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  onNavigate: (href: string) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const linksRef = React.useRef<HTMLAnchorElement[]>([]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useGSAP(
    () => {
      if (!open || !containerRef.current) return;
      gsap.fromTo(
        containerRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power3.out" },
      );
      gsap.fromTo(
        linksRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.15, ease: "power3.out" },
      );
    },
    { dependencies: [open], scope: containerRef as React.RefObject<HTMLElement> },
  );

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-background px-6 py-5"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="flex items-center justify-end">
        <button type="button" onClick={onClose} aria-label="Close menu" className="p-2">
          <CloseIcon className="h-6 w-6 text-foreground" />
        </button>
      </div>
      <nav className="mt-12 flex flex-1 flex-col justify-center gap-2">
        {items.map((item, index) => (
          <div key={item.href} className="overflow-hidden">
            <a
              ref={(el) => {
                if (el) linksRef.current[index] = el;
              }}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.href);
              }}
              className="block py-3 font-display text-4xl uppercase tracking-[0.08em] text-foreground"
            >
              {item.label}
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
}
