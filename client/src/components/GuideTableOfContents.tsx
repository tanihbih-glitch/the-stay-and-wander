import { ListTree } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useLocation } from "wouter";
import { isLongFormNonPriceDestinationGuidePath } from "@/lib/destinationGuides";

interface ContentsItem {
  id: string;
  label: string;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 64);
}

const PRICE_INDEX_GUIDE_PATHS = new Set([
  "/blog/bali-hotel-price-index-2026",
  "/blog/bangkok-hotel-price-index-2026",
]);

/** Builds in-page navigation from article headings with smooth scrolling and a reading-position indicator. */
export default function GuideTableOfContents() {
  const [location] = useLocation();
  const [items, setItems] = useState<ContentsItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const mobileDetailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const isSupportedGuide = isLongFormNonPriceDestinationGuidePath(location) || PRICE_INDEX_GUIDE_PATHS.has(location);
    if (!isSupportedGuide) {
      setItems([]);
      setActiveId("");
      return;
    }

    const scanHeadings = () => {
      const usedIds = new Set<string>();
      const nextItems = Array.from(document.querySelectorAll("#root h2"))
        .filter((heading) => !heading.closest("header, footer") && heading.id !== "guide-feedback-heading")
        .map((heading, index) => {
          const label = heading.textContent?.replace(/\s+/g, " ").trim() ?? "";
          if (!label || label.length > 96) return null;
          const baseId = heading.id || slugify(label) || `guide-section-${index + 1}`;
          let id = baseId;
          let suffix = 2;
          while (usedIds.has(id)) id = `${baseId}-${suffix++}`;
          usedIds.add(id);
          if (!heading.id) heading.id = id;
          heading.classList.add("scroll-mt-28");
          return { id, label };
        })
        .filter((item): item is ContentsItem => item !== null)
        .slice(0, 8);
      setItems((current) => JSON.stringify(current) === JSON.stringify(nextItems) ? current : nextItems);
      setActiveId((current) => {
        if (current && nextItems.some((item) => item.id === current)) return current;
        const hash = window.location.hash.slice(1);
        return nextItems.some((item) => item.id === hash) ? hash : nextItems[0]?.id ?? "";
      });
    };

    scanHeadings();
    const frame = window.requestAnimationFrame(scanHeadings);
    const mutationObserver = new MutationObserver(scanHeadings);
    mutationObserver.observe(document.getElementById("root") ?? document.body, { childList: true, subtree: true });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-112px 0px -58% 0px", threshold: [0, 0.2, 1] },
    );
    const observeSections = () => {
      document.querySelectorAll<HTMLElement>("#root h2[id]").forEach((heading) => sectionObserver.observe(heading));
    };
    observeSections();
    const observerFrame = window.requestAnimationFrame(observeSections);

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(observerFrame);
      mutationObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [location]);

  if (items.length < 2) return null;

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${id}`);
    setActiveId(id);
    if (mobileDetailsRef.current) mobileDetailsRef.current.open = false;
  };

  const linkClass = (id: string, mobile = false) => [
    mobile ? "flex items-center gap-2 py-1" : "relative whitespace-nowrap py-1",
    "focus-visible:outline-none focus-visible:text-[#0077B6] focus-visible:underline",
    activeId === id
      ? mobile
        ? "font-bold text-[#0077B6]"
        : "font-bold text-[#0077B6] after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-[#F4A261]"
      : "text-slate-600 hover:text-[#0077B6]",
  ].join(" ");

  return <>
    <details ref={mobileDetailsRef} className="border-t border-slate-100 bg-white lg:hidden">
      <summary className="container flex min-h-11 cursor-pointer list-none items-center gap-2 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#0D1B2A] focus-visible:outline-none focus-visible:text-[#0077B6]"><ListTree className="h-4 w-4 text-[#0077B6]" aria-hidden="true" />In this guide</summary>
      <nav aria-label="Guide table of contents" className="container border-t border-slate-100 py-3">
        <ol className="grid gap-2 text-sm font-medium">
          {items.map((item) => <li key={item.id}><a href={`#${item.id}`} onClick={(event) => handleSectionClick(event, item.id)} aria-current={activeId === item.id ? "location" : undefined} className={linkClass(item.id, true)}><span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${activeId === item.id ? "bg-[#F4A261]" : "bg-slate-300"}`} />{item.label}</a></li>)}
        </ol>
      </nav>
    </details>
    <nav aria-label="Guide table of contents" className="hidden border-t border-slate-100 bg-white lg:block">
      <div className="container flex min-h-11 items-center gap-4 overflow-x-auto py-2">
        <span className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0D1B2A]"><ListTree className="h-4 w-4 text-[#0077B6]" aria-hidden="true" />In this guide</span>
        <ol className="flex min-w-max items-center gap-4 text-xs font-medium">
          {items.map((item) => <li key={item.id}><a href={`#${item.id}`} onClick={(event) => handleSectionClick(event, item.id)} aria-current={activeId === item.id ? "location" : undefined} className={linkClass(item.id)}>{item.label}</a></li>)}
        </ol>
      </div>
    </nav>
  </>;
}
