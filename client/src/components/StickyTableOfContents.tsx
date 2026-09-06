import { ListTree } from "lucide-react";

interface TableOfContentsItem {
  id: string;
  label: string;
}

interface StickyTableOfContentsProps {
  items: readonly TableOfContentsItem[];
  title?: string;
}

/** A compact in-flow mobile menu that becomes a sticky desktop orientation aid. */
export default function StickyTableOfContents({ items, title = "In this guide" }: StickyTableOfContentsProps) {
  return (
    <nav aria-label="Table of contents" className="mb-10 rounded-2xl border border-[#cfe4ee] bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:mb-0">
      <div className="flex items-center gap-2 text-[#0D1B2A]"><ListTree className="h-5 w-5 text-[#0077B6]" aria-hidden="true" /><h2 className="font-playfair text-xl font-bold">{title}</h2></div>
      <ol className="mt-4 space-y-2 border-l border-[#b9dce9] pl-4 text-sm">
        {items.map((item) => <li key={item.id}><a href={`#${item.id}`} className="block py-1 text-slate-700 transition-colors hover:text-[#0077B6] focus-visible:outline-none focus-visible:text-[#0077B6] focus-visible:underline">{item.label}</a></li>)}
      </ol>
    </nav>
  );
}
