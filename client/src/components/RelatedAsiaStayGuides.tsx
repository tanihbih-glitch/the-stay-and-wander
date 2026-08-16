const stayGuides = [
  { key: "bali", href: "/blog/where-to-stay-in-bali-2026", label: "Where to Stay in Bali: Best Areas for First-Timers" },
  { key: "bangkok", href: "/blog/where-to-stay-in-bangkok-2026", label: "Where to Stay in Bangkok: Best Areas for First-Timers" },
  { key: "tokyo", href: "/blog/where-to-stay-in-tokyo-2026", label: "Where to Stay in Tokyo: Best Neighborhoods for First-Timers" },
  { key: "seoul", href: "/blog/where-to-stay-in-seoul-2026", label: "Where to Stay in Seoul: Best Areas for First-Timers" },
] as const;

interface RelatedAsiaStayGuidesProps {
  current: (typeof stayGuides)[number]["key"];
}

export default function RelatedAsiaStayGuides({ current }: RelatedAsiaStayGuidesProps) {
  return (
    <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
      <h2 className="font-playfair text-2xl font-bold text-gray-900">Planning More Asia Stays?</h2>
      <p className="mt-3 text-gray-700">Compare first-timer-friendly areas across our other Asia stay guides.</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {stayGuides.filter((guide) => guide.key !== current).map((guide) => (
          <li key={guide.key}>
            <a href={guide.href} className="font-semibold text-[#0077B6] hover:text-[#005c91] hover:underline">
              {guide.label} →
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
