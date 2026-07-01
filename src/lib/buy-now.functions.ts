import { supabase } from "@/integrations/supabase/client";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function validateEmail(raw: string): string {
  const trimmed = raw.trim().toLowerCase();
  if (!isValidEmail(trimmed)) throw new Error("Invalid email");
  return trimmed;
}

/** Insert a confirmed buyer email into buyers_emails. */
export async function recordBuyerEmail(email: string): Promise<{ ok: boolean }> {
  const validated = validateEmail(email);
  const { error } = await supabase
    .from("buyers_emails")
    .insert({ email: validated, source: "buy_now" });
  if (error) {
    console.error("[Supabase] buyers_emails insert failed:", error);
    throw new Error(error.message);
  }
  return { ok: true };
}

/** Insert a subscriber email into subscribers_emails (product waitlist or newsletter). */
export async function recordSubscriberEmail(email: string): Promise<{ ok: boolean }> {
  const validated = validateEmail(email);
  const { error } = await supabase
    .from("subscribers_emails")
    .insert({ email: validated, source: "subscribe" });
  if (error) {
    console.error("[Supabase] subscribers_emails insert failed:", error);
    throw new Error(error.message);
  }
  return { ok: true };
}

/** Insert a B2B inquiry email into b2b_emails. */
export async function recordB2BEmail(email: string): Promise<{ ok: boolean }> {
  const validated = validateEmail(email);
  const { error } = await supabase.from("b2b_emails").insert({ email: validated, source: "b2b" });
  if (error) {
    console.error("[Supabase] b2b_emails insert failed:", error);
    throw new Error(error.message);
  }
  return { ok: true };
}

/** Legacy: records B2B and other misc events in buy_now_events. */
export async function recordBuyNow(input: { data: { product: string; email?: string } }) {
  const product = String(input.data?.product ?? "")
    .slice(0, 120)
    .trim();
  if (!product) throw new Error("Missing product");

  let email: string | undefined;
  if (input.data?.email) {
    email = validateEmail(input.data.email);
  }

  const { error } = await supabase.from("buy_now_events").insert({
    product,
    email: email ?? null,
  });
  if (error) {
    console.error("[Supabase] buy_now_events insert failed:", error);
    throw new Error(error.message);
  }

  return { ok: true };
}
