export interface MailchimpSignupConfig {
  endpoint: string;
  audienceId: string;
  userId: string;
}

export interface MailchimpResponse {
  result?: "success" | "error";
  msg?: string;
}

export const dealsMailchimpConfig: MailchimpSignupConfig = {
  endpoint: "https://thestayandwander.us10.list-manage.com/subscribe/post-json",
  audienceId: "4512b2fda5",
  userId: "48ee0dc10117e46d5a5e32365",
};

export function isValidEmailAddress(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function buildMailchimpJsonpUrl(
  email: string,
  callbackName: string,
  config: MailchimpSignupConfig = dealsMailchimpConfig
): string {
  const query = new URLSearchParams({
    u: config.userId,
    id: config.audienceId,
    EMAIL: email.trim(),
    c: callbackName,
  });

  return `${config.endpoint}?${query.toString()}`;
}

export function cleanMailchimpMessage(message?: string): string {
  const text = message?.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();
  return text || "We couldn’t complete your subscription. Please try again.";
}
