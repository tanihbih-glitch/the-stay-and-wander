import { ArrowRight, ClipboardCheck } from "lucide-react";

export type GuideDecision = {
  condition: string;
  recommendation: string;
  detail: string;
  href: string;
};

type GuideMethodologyDecisionTreeProps = {
  methodology: string;
  decisions: readonly GuideDecision[];
  destinationLabel: string;
};

/**
 * A transparent editorial note plus a skimmable, section-linked decision aid.
 * It intentionally distinguishes directional planning ranges from live booking data.
 */
export default function GuideMethodologyDecisionTree({
  methodology,
  decisions,
  destinationLabel,
}: GuideMethodologyDecisionTreeProps) {
  return (
    <section className="mt-10 space-y-5" aria-label={`${destinationLabel} methodology and decision guide`}>
      <aside className="rounded-2xl border border-[#ecd9b9] bg-[#F8EFE0] p-5 sm:p-6">
        <div className="flex gap-3">
          <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9a5b20]" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b20]">Methodology note</p>
            <p className="mt-2 leading-relaxed text-slate-700">{methodology}</p>
          </div>
        </div>
      </aside>
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Quick decision tree</p>
        <h2 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">Choose your {destinationLabel} base by priority</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2" aria-label={`Where to stay in ${destinationLabel} decision options`}>
          {decisions.map((decision) => (
            <li key={decision.condition}>
              <a
                href={decision.href}
                className="group block h-full rounded-xl border border-blue-100 bg-white p-4 transition-shadow hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"
              >
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-slate-500">If {decision.condition.toLowerCase()}</p>
                <p className="mt-1 font-playfair text-lg font-bold text-[#0D1B2A]">Head to {decision.recommendation}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{decision.detail}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#0077B6] group-hover:underline">Read the area notes <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
