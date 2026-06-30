import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

const NOTIFY_EMAIL = "tatianamorton1810@gmail.com";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export const recordBuyNow = createServerFn({ method: "POST" })
  .inputValidator((input: { product: string; email?: string }) => {
    const product = String(input?.product ?? "")
      .slice(0, 120)
      .trim();
    if (!product) throw new Error("Missing product");
    let email: string | undefined;
    if (input?.email) {
      const trimmed = String(input.email).trim().toLowerCase();
      if (!isValidEmail(trimmed)) throw new Error("Invalid email");
      email = trimmed;
    }
    return { product, email };
  })
  .handler(async ({ data }) => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const publishable = process.env.SUPABASE_PUBLISHABLE_KEY;

    // Insert with publishable key (RLS allows anon insert)
    if (supabaseUrl && (serviceKey || publishable)) {
      const supabase = createClient(supabaseUrl, serviceKey ?? publishable!, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      await supabase.from("buy_now_events").insert({
        product: data.product,
        email: data.email ?? null,
      });
    }

    // Send notification email via Resend gateway
    const lovableKey = process.env.LOVABLE_API_KEY;
    const resendKey = process.env.RESEND_API_KEY;
    if (lovableKey && resendKey) {
      const subject = data.email
        ? `New Mateada waitlist signup — ${data.product}`
        : `Mateada Buy Now click — ${data.product}`;
      const html = `
        <h2>Mateada — Buy Now event</h2>
        <p><strong>Product:</strong> ${escapeHtml(data.product)}</p>
        <p><strong>Email:</strong> ${data.email ? escapeHtml(data.email) : "(not provided)"}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `;
      try {
        await fetch("https://connector-gateway.lovable.dev/resend/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": resendKey,
          },
          body: JSON.stringify({
            from: "Mateada <onboarding@resend.dev>",
            to: [NOTIFY_EMAIL],
            subject,
            html,
          }),
        });
      } catch (err) {
        console.error("Resend send failed", err);
      }
    }

    return { ok: true };
  });

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
