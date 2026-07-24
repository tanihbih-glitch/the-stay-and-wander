export function canRequestConciergeRevision(options: {
  tier: string | null | undefined;
  conciergeRevisionAvailable: boolean | null | undefined;
  revisionComplete: boolean;
}) {
  return options.tier === "concierge" && Boolean(options.conciergeRevisionAvailable) && !options.revisionComplete;
}
