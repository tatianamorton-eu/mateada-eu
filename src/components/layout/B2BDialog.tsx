import * as React from "react";
import { useGSAP } from "@gsap/react";
import { Drawer } from "vaul";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { recordBuyNow } from "@/lib/buy-now.functions";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { Button } from "@/components/ui/Button";
import { CloseIcon } from "@/components/ui/icons";

function useB2BForm(open: boolean) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "done" | "error">("idle");

  React.useEffect(() => {
    if (!open) return;
    setEmail("");
    setStatus("idle");
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    try {
      await recordBuyNow({ data: { product: "B2B Inquiry", email: email.trim() } });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return { email, setEmail, status, submit };
}

function B2BForm({
  email,
  setEmail,
  status,
  submit,
  onClose,
}: {
  email: string;
  setEmail: (v: string) => void;
  status: "idle" | "submitting" | "done" | "error";
  submit: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  if (status === "done") {
    return (
      <>
        <h4 className="font-display text-2xl uppercase tracking-[0.12em] text-foreground">
          Thank you
        </h4>
        <p className="mt-3 text-sm text-muted-foreground">We'll be in touch soon.</p>
        <Button variant="solid" size="sm" className="mt-6" magnetic={false} onClick={onClose}>
          Close
        </Button>
      </>
    );
  }

  return (
    <>
      <h4 className="font-display text-2xl uppercase tracking-[0.12em] text-foreground">
        Business Inquiries
      </h4>
      <p className="mt-3 text-sm text-muted-foreground">
        If you are a café, studio, distributor or wellness space interested in Mateada, leave your
        email and we'll contact you.
      </p>
      <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          maxLength={254}
          className="border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
          <Button
            type="submit"
            variant="solid"
            size="sm"
            disabled={status === "submitting"}
            magnetic={false}
          >
            {status === "submitting" ? "Sending…" : "Contact us"}
          </Button>
        </div>
        {status === "error" && (
          <p className="text-xs text-destructive">Something went wrong. Please try again.</p>
        )}
      </form>
    </>
  );
}

function B2BDesktopDialog({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useGSAP(
    () => {
      if (!open || !panelRef.current) return;
      gsap.fromTo(
        panelRef.current,
        { clipPath: "inset(8% 8% 92% 8%)", opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.5, ease: "power3.out" },
      );
    },
    { dependencies: [open], scope: panelRef as React.RefObject<HTMLElement> },
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Business Inquiries"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className={cn("relative w-full max-w-md border border-border bg-background p-6 text-foreground sm:p-8")}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function B2BDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const isTouch = useIsTouchDevice();
  const { email, setEmail, status, submit } = useB2BForm(open);

  if (isTouch) {
    return (
      <Drawer.Root open={open} onOpenChange={(v) => !v && onClose()}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-foreground/50" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col bg-background px-6 pb-8 pt-4 outline-none">
            <Drawer.Title className="sr-only">Business Inquiries</Drawer.Title>
            <div className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-border" />
            <B2BForm email={email} setEmail={setEmail} status={status} submit={submit} onClose={onClose} />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <B2BDesktopDialog open={open} onClose={onClose}>
      <B2BForm email={email} setEmail={setEmail} status={status} submit={submit} onClose={onClose} />
    </B2BDesktopDialog>
  );
}
