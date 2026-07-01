import { supabase } from "@/integrations/supabase/client";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export async function recordBuyNow(input: { data: { product: string; email?: string } }) {
  const product = String(input.data?.product ?? "")
    .slice(0, 120)
    .trim();
  if (!product) throw new Error("Missing product");

  let email: string | undefined;
  if (input.data?.email) {
    const trimmed = String(input.data.email).trim().toLowerCase();
    if (!isValidEmail(trimmed)) throw new Error("Invalid email");
    email = trimmed;
  }

  await supabase.from("buy_now_events").insert({
    product,
    email: email ?? null,
  });

  return { ok: true };
}
