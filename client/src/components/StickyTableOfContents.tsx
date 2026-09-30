import { useEffect, useId, useState } from "react";
import { ChevronDown, ListTree } from "lucide-react";

interface TableOfContentsItem {
  id: string;
  label: string;
}

interface StickyTableOfContentsProps {
  items: readonly TableOfContentsItem[];
  title?: string;
}

/**
 * Responsive article navigation: compact and collapsed on phones, expanded by
 * default on larger screens, with an internal scroll guard for sticky layouts.
 */
export default function StickyTableOfContents({ items, title = "In this guide" }: StickyTableOfContentsProps) {
  const listId = useId();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncWithViewport = () => setIsOpen(mediaQuery.matches);

    syncWithViewport();
    mediaQuery.addEventListener?.("change", syncWithViewport);
    return () => mediaQuery.removeEventListener?.("change", syncWithViewport);
  }, []);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId || !items.some((item) => item.id === targetId)) return;

    const frame = window.requestAnimationFrame(() => {
      setIsOpen(true);
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [items]);

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-2xl border border-[#cfe4ee] bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:mb-0"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-3 rounded-lg text-left text-[#0D1B2A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2"
      >
        <span className="flex min-w-0 items-center gap-2">
          <ListTree className="h-5 w-5 shrink-0 text-[#0077B6]" aria-hidden="true" />
          <span className="font-playfair text-xl font-bold">{title}</span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#0077B6] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={listId}
        hidden={!isOpen}
        className="max-h-[50vh] overflow-y-auto overscroll-contain"
      >
        <ol className="mt-4 space-y-2 border-l border-[#b9dce9] pl-4 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block rounded py-1 text-slate-700 transition-colors hover:text-[#0077B6] focus-visible:outline-none focus-visible:text-[#0077B6] focus-visible:underline"
                onClick={() => {
                  if (window.matchMedia("(max-width: 1023px)").matches) setIsOpen(false);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
