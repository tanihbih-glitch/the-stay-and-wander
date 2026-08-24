export type AirportCode = "BKK" | "DMK";

export const bangkokTransferBenchmarks = [
  {
    id: "rail",
    mode: "Airport Rail Link (ARL) / SRT Red Line",
    bkk: "₩1,800 – ₩3,200 (~$1.35 – $2.40 USD / ฿45)",
    dmk: "₩1,200 – ₩2,500 (~$0.90 – $1.85 USD / ฿33–฿42)",
    bkkEstimate: 1.88,
    dmkEstimate: 1.38,
    bestFor: "Solo travelers, budget backpackers, peak-hour rush",
    tip: "Cash token purchase at airport station",
  },
  {
    id: "taxi",
    mode: "Metered Public Taxi",
    bkk: "₩12,000 – ₩18,000 (~$9.00 – $13.50 USD / ฿300–฿450)",
    dmk: "₩10,000 – ₩16,000 (~$7.50 – $12.00 USD / ฿250–฿400)",
    bkkEstimate: 11.25,
    dmkEstimate: 9.75,
    bestFor: "Couples, pairs with standard luggage",
    tip: "Mandatory ฿50 airport queue surcharge + toll fees (฿75) extra",
  },
  {
    id: "ridehail",
    mode: "Ride-Hailing (Grab / Bolt / InDrive)",
    bkk: "₩14,000 – ₩22,000 (~$10.50 – $16.50 USD / ฿350–฿550)",
    dmk: "₩12,000 – ₩20,000 (~$9.00 – $15.00 USD / ฿300–฿500)",
    bkkEstimate: 13.5,
    dmkEstimate: 12,
    bestFor: "Travelers seeking upfront pricing",
    tip: "Pick up at designated ride-share gates",
  },
  {
    id: "private",
    mode: "Private Airport Transfer (Pre-booked)",
    bkk: "₩22,000 – ₩35,000 (~$16.50 – $26.00 USD / ฿550–฿880)",
    dmk: "₩20,000 – ₩32,000 (~$15.00 – $24.00 USD / ฿500–฿800)",
    bkkEstimate: 21.25,
    dmkEstimate: 19.5,
    bestFor: "Families, large groups, late-night arrivals",
    tip: "Pre-book before landing for a quoted door-to-door handoff",
  },
] as const;

export type BangkokTransferMode = (typeof bangkokTransferBenchmarks)[number]["id"];

export const getRoundtripTransferAllowance = (airport: AirportCode, mode: BangkokTransferMode) => {
  const benchmark = bangkokTransferBenchmarks.find((item) => item.id === mode) ?? bangkokTransferBenchmarks[1];
  return (airport === "BKK" ? benchmark.bkkEstimate : benchmark.dmkEstimate) * 2;
};
