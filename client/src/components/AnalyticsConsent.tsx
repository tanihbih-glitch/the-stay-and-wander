import { useEffect, useState } from "react";
import { enableGaDebugIfRequested, installAnalyticsDelegation, trackAnalyticsEvent } from "@/lib/analytics";

const CONSENT_KEY = "staywander_analytics_consent";
const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

function loadGa4(isInternal: boolean) {
  if (typeof window === "undefined" || !MEASUREMENT_ID || window.gtag) return;
  enableGaDebugIfRequested();
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    traffic_type: isInternal ? "internal" : "external",
    ...(window.__stayWanderGaDebug ? { debug_mode: true } : {}),
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  script.dataset.analytics = "ga4";
  document.head.appendChild(script);
}

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState<"unknown" | "granted" | "denied">("unknown");

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    const initial = stored === "granted" || stored === "denied" ? stored : "unknown";
    setChoice(initial);
    window.__stayWanderAnalyticsConsent = initial === "granted" ? "granted" : "denied";
    const cleanup = installAnalyticsDelegation();

    if (initial === "granted") {
      void fetch("/api/analytics/config", { credentials: "same-origin" })
        .then(response => response.json())
        .then(config => loadGa4(Boolean(config.isInternal)))
        .catch(() => loadGa4(false));
    }
    return cleanup;
  }, []);

  const choose = (next: "granted" | "denied") => {
    window.localStorage.setItem(CONSENT_KEY, next);
    window.__stayWanderAnalyticsConsent = next;
    setChoice(next);
    if (next === "granted") {
      enableGaDebugIfRequested();
      void fetch("/api/analytics/config", { credentials: "same-origin" })
        .then(response => response.json())
        .then(config => loadGa4(Boolean(config.isInternal)))
        .catch(() => loadGa4(false));
      trackAnalyticsEvent("tool_use", { tool_name: "analytics_consent", action: "granted" });
    }
  };

  if (choice !== "unknown") return null;

  return (
    <aside className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-4 shadow-2xl" aria-label="Analytics consent">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm leading-relaxed text-slate-700">
          We use optional Google Analytics to understand aggregate site usage and improve travel guides. Essential site features work without it. See our <a href="/privacy-policy" className="font-semibold text-[#0077B6] underline">Privacy Policy</a>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose("denied")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Decline</button>
          <button type="button" onClick={() => choose("granted")} className="rounded-full bg-[#0077B6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#005c91]">Allow analytics</button>
        </div>
      </div>
    </aside>
  );
}
