import { ListTree } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { isLongFormNonPriceDestinationGuidePath } from "@/lib/destinationGuides";

interface ContentsItem {
  id: string;
  label: string;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 64);
}

/** Builds an in-page navigation from the article's actual H2 headings; no guide copy is duplicated. */
export default function GuideTableOfContents() {
  const [location] = useLocation();
  const [items, setItems] = useState<ContentsItem[]>([]);

  useEffect(() => {
    if (!isLongFormNonPriceDestinationGuidePath(location)) {
      setItems([]);
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
    };

    scanHeadings();
    const frame = window.requestAnimationFrame(scanHeadings);
    const observer = new MutationObserver(scanHeadings);
    observer.observe(document.getElementById("root") ?? document.body, { childList: true, subtree: true });
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [location]);

  if (items.length < 2) return null;

  return <>
    <details className="border-t border-slate-100 bg-white lg:hidden">
      <summary className="container flex min-h-11 cursor-pointer list-none items-center gap-2 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#0D1B2A] focus-visible:outline-none focus-visible:text-[#0077B6]"><ListTree className="h-4 w-4 text-[#0077B6]" aria-hidden="true" />In this guide</summary>
      <nav aria-label="Guide table of contents" className="container border-t border-slate-100 py-3">
        <ol className="grid gap-2 text-sm font-medium text-slate-700">
          {items.map((item) => <li key={item.id}><a href={`#${item.id}`} className="block py-1 hover:text-[#0077B6] focus-visible:outline-none focus-visible:text-[#0077B6] focus-visible:underline">{item.label}</a></li>)}
        </ol>
      </nav>
    </details>
    <nav aria-label="Guide table of contents" className="hidden border-t border-slate-100 bg-white lg:block">
      <div className="container flex min-h-11 items-center gap-4 overflow-x-auto py-2">
        <span className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0D1B2A]"><ListTree className="h-4 w-4 text-[#0077B6]" aria-hidden="true" />In this guide</span>
        <ol className="flex min-w-max items-center gap-4 text-xs font-medium text-slate-600">
          {items.map((item) => <li key={item.id}><a href={`#${item.id}`} className="whitespace-nowrap hover:text-[#0077B6] focus-visible:outline-none focus-visible:text-[#0077B6] focus-visible:underline">{item.label}</a></li>)}
        </ol>
      </div>
    </nav>
  </>;
}
