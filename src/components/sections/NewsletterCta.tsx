import * as React from "react";
import { recordBuyNow } from "@/lib/buy-now.functions";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export function NewsletterCta() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "done" | "error">("idle");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    try {
      await recordBuyNow({ data: { product: "Newsletter", email: email.trim() } });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-background px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
        <Heading as="h2" size="md" className="mx-auto">
          Join the ritual.
        </Heading>
        <p className="mt-4 max-w-md text-sm uppercase tracking-[0.16em] text-muted-foreground">
          New rituals, slow mornings, and first access to limited drops — straight to your inbox.
        </p>

        {status === "done" ? (
          <p className="mt-8 text-sm uppercase tracking-[0.18em] text-foreground">
            You're on the list — welcome.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              maxLength={254}
              className="flex-1 border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <Button type="submit" variant="solid" disabled={status === "submitting"}>
              {status === "submitting" ? "Joining…" : "Subscribe"}
            </Button>
          </form>
        )}
        {status === "error" ? (
          <p className="mt-3 text-xs text-destructive">Something went wrong. Please try again.</p>
        ) : null}
      </div>
    </section>
  );
}
