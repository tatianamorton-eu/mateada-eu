import * as React from "react";
import { useGSAP } from "@gsap/react";
import { Drawer } from "vaul";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { recordBuyerEmail, recordSubscriberEmail } from "@/lib/buy-now.functions";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { Button } from "@/components/ui/Button";
import { CloseIcon } from "@/components/ui/icons";

type WaitlistDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  mode?: "buy" | "subscribe";
};

function useWaitlistForm(productTitle: string, open: boolean, mode: "buy" | "subscribe") {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "done" | "error">("idle");

  React.useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setEmail("");
  }, [open, productTitle]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    try {
      if (mode === "buy") {
        await recordBuyerEmail(email.trim());
      } else {
        await recordSubscriberEmail(email.trim());
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return { email, setEmail, status, submit };
}

function WaitlistForm({
  productTitle,
  email,
  setEmail,
  status,
  submit,
  onClose,
  mode = "buy",
}: {
  productTitle: string;
  email: string;
  setEmail: (v: string) => void;
  status: "idle" | "submitting" | "done" | "error";
  submit: (e: React.FormEvent) => void;
  onClose: () => void;
  mode?: "buy" | "subscribe";
}) {
  if (status === "done") {
    return (
      <>
        <h4 className="font-display text-2xl uppercase tracking-[0.12em] text-foreground">
          You're on the list
        </h4>
        <p className="mt-3 text-sm text-muted-foreground">
          We'll email you the moment {productTitle} is back in stock.
        </p>
        <Button variant="solid" size="sm" className="mt-6" magnetic={false} onClick={onClose}>
          Close
        </Button>
      </>
    );
  }

  return (
    <>
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{productTitle}</p>
      <h4 className="mt-2 font-display text-2xl uppercase tracking-[0.12em] text-foreground">
        {mode === "subscribe" ? "Join the waitlist" : "Currently out of stock"}
      </h4>
      <p className="mt-3 text-sm text-muted-foreground">
        {mode === "subscribe"
          ? "Leave your email and we'll notify you as soon as subscriptions become available."
          : "Leave your email and we'll notify you the moment it's back."}
      </p>
      <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
            No thanks
          </button>
          <Button
            type="submit"
            variant="solid"
            size="sm"
            disabled={status === "submitting"}
            magnetic={false}
          >
            {status === "submitting" ? "Adding…" : "Notify me"}
          </Button>
        </div>
        {status === "error" ? (
          <p className="text-xs text-destructive">Something went wrong. Please try again.</p>
        ) : null}
      </form>
    </>
  );
}

export function WaitlistDialog({ open, onOpenChange, productTitle, mode = "buy" }: WaitlistDialogProps) {
  const isTouch = useIsTouchDevice();
  const { email, setEmail, status, submit } = useWaitlistForm(productTitle, open, mode);
  const close = () => onOpenChange(false);

  if (isTouch) {
    return (
      <Drawer.Root open={open} onOpenChange={onOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-foreground/50" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col bg-background px-6 pb-8 pt-4 outline-none">
            <Drawer.Title className="sr-only">{`Join the waitlist for ${productTitle}`}</Drawer.Title>
            <div className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-border" />
            <WaitlistForm
              productTitle={productTitle}
              email={email}
              setEmail={setEmail}
              status={status}
              submit={submit}
              onClose={close}
              mode={mode}
            />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <DesktopDialog open={open} onClose={close} title={`Join the waitlist for ${productTitle}`}>
      <WaitlistForm
        productTitle={productTitle}
        email={email}
        setEmail={setEmail}
        status={status}
        submit={submit}
        onClose={close}
        mode={mode}
      />
    </DesktopDialog>
  );
}

function DesktopDialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
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
      aria-label={title}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className={cn(
          "relative w-full max-w-md border border-border bg-background p-6 text-foreground sm:p-8",
        )}
        onClick={(event) => event.stopPropagation()}
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
