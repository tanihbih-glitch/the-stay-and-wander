/**
 * Search-brief guardrail: do not turn incidental, AI-assistant-style queries into
 * destination-content targets. These topics can still be answered where they are
 * already relevant to a guide, but they are excluded from keyword briefs.
 */
const LOW_INTENT_TOPIC = /(?:hilton|marriott|accor|ihg).{0,90}(?:sustainab|environment|loyalty|rewards|points|accessib|wheelchair)|(?:sustainab|sustentab|استدام|サステナ).{0,90}(?:hotel|hilton|marriott|هيلتون|فنادق|ホテル)|(?:loyalty|fidelidade|الولاء|ロイヤルティ).{0,90}(?:hotel|hilton|marriott|هيلتون|فنادق|ホテル)|(?:accessibility|acessibilidade|إمكانية الوصول|アクセシビリティ|バリアフリー)/i;

export function excludeFromDestinationKeywordTargeting(query: string): boolean {
  const normalized = query.trim();
  const isSentenceLength = normalized.split(/\s+/).length >= 8 || normalized.length >= 32;
  return isSentenceLength && LOW_INTENT_TOPIC.test(normalized);
}

export const EXCLUDED_QUERY_TARGETING_NOTE =
  "Exclude long AI-assistant-style sustainability, loyalty-program, and accessibility prompts from destination keyword targeting and content briefs; do not treat their incidental impressions as prospect demand.";
