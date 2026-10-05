import { useEffect, useRef, useState } from "react";

export const TRIP_COM_HOTEL_WIDGET_URL = "https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1=";

type TripComHotelWidgetProps = {
  className?: string;
  title?: string;
  url?: string;
  timeoutMs?: number;
  onStatusChange?: (status: "loading" | "loaded" | "failed") => void;
};

/** A compact, responsive Trip.com partner widget for hotel search placements. */
export default function TripComHotelWidget({
  className = "",
  title = "Search hotels with Trip.com",
  url = TRIP_COM_HOTEL_WIDGET_URL,
  timeoutMs = 12000,
  onStatusChange,
}: TripComHotelWidgetProps) {
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">("loading");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setStatus("loading");
    timeoutRef.current = window.setTimeout(() => setStatus("failed"), timeoutMs);

    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, [loadAttempt, timeoutMs]);

  useEffect(() => {
    onStatusChange?.(status);
  }, [onStatusChange, status]);

  const markLoaded = () => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    setStatus("loaded");
  };

  const markFailed = () => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    setStatus("failed");
  };

  return (
    <div
      className={`relative flex w-full justify-center ${className}`.trim()}
      aria-busy={status === "loading"}
    >
      <div
        className={`pointer-events-none absolute inset-0 mx-auto flex max-w-[320px] items-center justify-center rounded-md bg-white/80 text-center text-sm text-gray-600 transition-opacity duration-200 ${status === "loading" ? "opacity-100" : "opacity-0"}`}
        aria-hidden={status !== "loading"}
      >
        Loading hotel search...
      </div>
      {status === "failed" && (
        <div
          role="alert"
          className="absolute inset-0 z-10 mx-auto flex max-w-[320px] flex-col items-center justify-center gap-3 rounded-md bg-white px-5 text-center shadow-sm ring-1 ring-[#F4A261]/50"
        >
          <p className="text-sm font-semibold text-gray-900">Booking temporarily unavailable</p>
          <p className="text-xs leading-5 text-gray-600">
            Please try again shortly or contact us directly if the problem continues.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              className="rounded-full bg-[#0077B6] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#005c91] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"
              onClick={() => setLoadAttempt((attempt) => attempt + 1)}
            >
              Try again
            </button>
            <a
              href="mailto:thestayandwander@thestayandwander.com"
              className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"
            >
              Contact us
            </a>
          </div>
        </div>
      )}
      <iframe
        key={loadAttempt}
        title={title}
        src={url}
        style={{ width: "100%", maxWidth: "320px", height: "320px", border: "none" }}
        frameBorder="0"
        scrolling="no"
        id="S18723294"
        onLoad={markLoaded}
        onError={markFailed}
      />
      <div className="mt-3 w-full max-w-[320px] rounded-md border border-gray-200 bg-white px-3 py-2 text-center text-xs text-gray-600">
        <span>If the booking search does not load, </span>
        <button
          type="button"
          className="font-semibold text-[#0077B6] underline underline-offset-2"
          onClick={() => setLoadAttempt((attempt) => attempt + 1)}
        >
          try again
        </button>
        <span> or </span>
        <a
          href="mailto:thestayandwander@thestayandwander.com"
          className="font-semibold text-[#0077B6] underline underline-offset-2"
        >
          contact us
        </a>
        <span>.</span>
      </div>
    </div>
  );
}
