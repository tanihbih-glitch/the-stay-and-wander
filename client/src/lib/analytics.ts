export type AnalyticsEventName =
  | "property_link_click"
  | "enquiry_submit"
  | "tool_use"
  | "flight_widget_click"
  | "outbound_affiliate_click";

type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __stayWanderAnalyticsConsent?: "granted" | "denied";
    __stayWanderGaDebug?: boolean;
    __stayWanderTrack?: (name: AnalyticsEventName, params?: AnalyticsEventParams) => void;
  }
}

export function pageSlug(pathname = typeof window !== "undefined" ? window.location.pathname : "/") {
  return pathname.replace(/^\/+|\/+$/g, "") || "home";
}

export function isGaDebugRequested() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("ga_debug") === "1";
}

export function enableGaDebugIfRequested() {
  if (typeof window !== "undefined" && isGaDebugRequested()) {
    window.__stayWanderGaDebug = true;
  }
}

export function trackAnalyticsEvent(name: AnalyticsEventName, params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined" || window.__stayWanderAnalyticsConsent !== "granted" || !window.gtag) return;
  window.gtag("event", name, {
    ...params,
    page_slug: params.page_slug ?? pageSlug(),
    ...(window.__stayWanderGaDebug ? { debug_mode: true } : {}),
  });
}

export function installAnalyticsDelegation() {
  if (typeof window === "undefined" || document.documentElement.dataset.analyticsDelegated === "true") return () => undefined;
  document.documentElement.dataset.analyticsDelegated = "true";

  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest<HTMLAnchorElement>("a[href]");
    const toolRoot = target?.closest<HTMLElement>("[data-tool-name]");
    const flightRoot = target?.closest<HTMLElement>("[data-flight-widget]");
    const propertyLink = target?.closest<HTMLElement>("[data-property-link]");
    const affiliate = target?.closest<HTMLElement>("[data-affiliate-partner]");

    if (propertyLink) {
      trackAnalyticsEvent("property_link_click", {
        property_name: propertyLink.getAttribute("data-property-name") || undefined,
        partner: propertyLink.getAttribute("data-affiliate-partner") || undefined,
      });
    }

    if (toolRoot && target?.closest("button, [role='button'], input, select")) {
      trackAnalyticsEvent("tool_use", {
        tool_name: toolRoot.getAttribute("data-tool-name") || "interactive_tool",
        action: target.closest("button, [role='button'], input, select")?.getAttribute("aria-label") || "interaction",
      });
    }

    if (flightRoot || link?.closest("[data-flight-widget]")) {
      trackAnalyticsEvent("flight_widget_click", {
        destination: link?.getAttribute("href") || undefined,
      });
    }

    const affiliateDestination = link && /trip\.com|stay22\.com|aviasales|gyg\.me|getyourguide|klook|discovercars|safetywing|cruisedirect/i.test(link.href);
    if (link && (affiliate || affiliateDestination) && /^https?:/i.test(link.href)) {
      trackAnalyticsEvent("outbound_affiliate_click", {
        partner: affiliate?.getAttribute("data-affiliate-partner") || new URL(link.href).hostname,
        category: affiliate?.getAttribute("data-affiliate-category") || "affiliate",
        destination: link.href,
      });
    }
  };

  const onSubmit = (event: SubmitEvent) => {
    const form = event.target as HTMLFormElement | null;
    if (!form?.matches("[data-enquiry-form]")) return;
    trackAnalyticsEvent("enquiry_submit", {
      form_name: form.getAttribute("data-enquiry-form") || "enquiry",
    });
  };

  document.addEventListener("click", onClick, true);
  document.addEventListener("submit", onSubmit, true);
  return () => {
    document.removeEventListener("click", onClick, true);
    document.removeEventListener("submit", onSubmit, true);
    delete document.documentElement.dataset.analyticsDelegated;
  };
}
