const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

interface LastUpdatedProps {
  date: string;
  className?: string;
  badge?: boolean;
}

/** Renders a stable, crawler-visible date from each article's canonical update field. */
export default function LastUpdated({ date, className, badge = false }: LastUpdatedProps) {
  const [year, month, day] = date.split("-");
  const monthName = MONTH_NAMES[Math.max(0, Math.min(11, Number(month) - 1))] ?? "";
  const label = `${Number(day)} ${monthName} ${year}`;

  return (
    <span className={`inline-flex flex-wrap items-center gap-2 ${className ?? ""}`}>
      {badge && <span className="rounded-full border border-[#b9dce9] bg-[#eaf7fc] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#00638f]">Recently updated</span>}
      <time dateTime={date}>Last updated: {label}</time>
    </span>
  );
}
