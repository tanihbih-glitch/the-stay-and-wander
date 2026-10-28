import { useState, type FormEvent } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import { trackAnalyticsEvent, trackMetaPixelEvent } from "@/lib/analytics";

const SOURCE_PAGE = "/blog/ski-in-ski-out-hotels-2026-2027";

type SignupState = "idle" | "submitting" | "success" | "error";

interface SkiAlertsSignupProps {
  compact?: boolean;
}

export default function SkiAlertsSignup({ compact = false }: SkiAlertsSignupProps) {
  const [state, setState] = useState<SignupState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const responseTarget = compact ? "ski-mailchimp-response-top" : "ski-mailchimp-response-full";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("EMAIL") || "").trim();
    const consent = formData.get("CONSENT") === "on";
    const honeypot = String(formData.get("company") || "");

    setState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          consent,
          consentTimestamp: new Date().toISOString(),
          sourcePage: SOURCE_PAGE,
          honeypot,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "We could not start the email confirmation. Please try again shortly.");
      }

      setState("success");
      form.reset();
      trackAnalyticsEvent("email_signup", { signup_name: "ski-2026-27" });
      trackMetaPixelEvent("Lead");
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "We could not start the email confirmation. Please try again shortly.");
    }
  };

  return (
    <section
      className={compact
        ? "rounded-2xl border border-[#cfe4ee] bg-white/95 p-5 shadow-sm"
        : "rounded-3xl border border-[#cfe4ee] bg-[#f5fbfd] p-6 shadow-sm md:p-8"}
      aria-labelledby={compact ? "ski-alerts-signup-top" : "ski-alerts-signup-title"}
    >
      <div className="flex items-start gap-3">
        <span className="mt-1 rounded-full bg-[#edf7fb] p-2 text-[#0077B6]" aria-hidden="true"><Mail className="h-5 w-5" /></span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">Winter alerts</p>
          <h2 id={compact ? "ski-alerts-signup-top" : "ski-alerts-signup-title"} className={compact ? "mt-1 font-playfair text-xl font-bold text-[#0D1B2A]" : "mt-1 font-playfair text-2xl font-bold text-[#0D1B2A]"}>
            Get the 2026/27 opening dates and early-rate alerts
          </h2>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">We'll email confirmed opening dates and any early-booking offers we spot for these hotels. About 1-2 emails a month; unsubscribe any time.</p>
      {state === "success" && (
        <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800" role="status">Check your inbox to confirm.</p>
      )}
      {state === "error" && (
        <p className="mt-5 rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-800" role="alert">{errorMessage}</p>
      )}
      <form method="post" target={responseTarget} onSubmit={handleSubmit} className="mt-5 space-y-4" data-email-signup-form="ski-2026-27">
        <label className="block text-sm font-semibold text-[#0D1B2A]">
          Email address
          <input name="EMAIL" type="email" autoComplete="email" required disabled={state === "submitting"} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 font-normal outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20 disabled:opacity-60" />
        </label>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
          <input name="CONSENT" type="checkbox" required disabled={state === "submitting"} className="mt-1 h-4 w-4 shrink-0 accent-[#0077B6]" />
          <span>I agree to receive these ski-stay alerts. See the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0077B6] underline">Privacy Policy</a>.</span>
        </label>
        <input type="hidden" name="SOURCE_PAGE" value={SOURCE_PAGE} />
        <div aria-hidden="true" className="absolute left-[-5000px] h-px w-px overflow-hidden"><input type="text" name="company" tabIndex={-1} autoComplete="off" /></div>
        <button type="submit" disabled={state === "submitting"} className="inline-flex items-center justify-center rounded-full bg-[#F4A261] px-5 py-3 text-sm font-bold text-[#0D1B2A] transition hover:-translate-y-0.5 hover:bg-[#f7b47c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] disabled:cursor-wait disabled:opacity-60">
          {state === "submitting" ? "Sending…" : state === "success" ? "Sign up another email" : "Get the alerts"}
        </button>
      </form>
      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-500"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0077B6]" aria-hidden="true" /> Your email is sent to Mailchimp for double opt-in confirmation and is not stored in this website's database.</p>
      <iframe title="Mailchimp signup response" name={responseTarget} className="hidden" />
    </section>
  );
}
