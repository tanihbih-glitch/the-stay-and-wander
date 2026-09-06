const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

interface LastUpdatedProps {
  date: string;
  className?: string;
}

/** Renders a stable, crawler-visible date from each article's canonical update field. */
export default function LastUpdated({ date, className }: LastUpdatedProps) {
  const [year, month, day] = date.split("-");
  const monthName = MONTH_NAMES[Math.max(0, Math.min(11, Number(month) - 1))] ?? "";
  const label = `${Number(day)} ${monthName} ${year}`;

  return <time dateTime={date} className={className}>Last updated: {label}</time>;
}
