import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Cookie, Mail, ShieldCheck } from "lucide-react";

export const privacyPolicyMetadata = {
  title: "Privacy Policy | The Stay & Wander",
  description:
    "Learn how The Stay & Wander handles cookies, analytics, affiliate links, newsletter sign-ups, and personal information.",
  url: "/privacy-policy",
  image: "https://thestayandwander.com/og-image.png",
  keywords:
    "The Stay & Wander privacy policy, travel blog cookies, Google Analytics, Mailchimp, affiliate disclosure",
};

interface PolicySectionProps {
  title: string;
  children: React.ReactNode;
}

function PolicySection({ title, children }: PolicySectionProps) {
  return (
    <section className="border-b border-slate-200 py-9 last:border-b-0 sm:py-11">
      <h2 className="font-playfair text-2xl font-bold text-[#17364a] sm:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {
  const canonicalUrl = `https://thestayandwander.com${privacyPolicyMetadata.url}`;

  return (
    <div className="min-h-screen bg-[#fdfcf9] pb-20 md:pb-0">
      <Head
        title={privacyPolicyMetadata.title}
        description={privacyPolicyMetadata.description}
        canonical={canonicalUrl}
        ogTitle={privacyPolicyMetadata.title}
        ogDescription={privacyPolicyMetadata.description}
        ogImage={privacyPolicyMetadata.image}
        ogUrl={canonicalUrl}
        keywords={privacyPolicyMetadata.keywords}
      />
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#17364a] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.24),_transparent_40%)]" />
          <ShieldCheck className="absolute -right-10 -top-10 h-64 w-64 text-white/[0.06] sm:right-8" aria-hidden="true" />
          <div className="container relative px-4 py-18 sm:py-22">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#e5c66b]">Your privacy</p>
            <h1 className="max-w-3xl font-playfair text-4xl font-bold leading-tight text-white sm:text-5xl">Privacy Policy</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">
              A clear explanation of the information we collect, why we use it, and the choices available to you.
            </p>
          </div>
        </section>

        <section className="container px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_48px_rgba(23,54,74,0.08)]">
            <div className="flex flex-col gap-5 border-b border-[#e4dcc7] bg-[#f8f4e9] px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b3842d]">The Stay &amp; Wander</p>
                <p className="mt-2 text-sm text-slate-600">Last updated: July 28, 2026</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#17364a] shadow-sm ring-1 ring-[#d9cfae]">
                <Cookie className="h-4 w-4 text-[#b3842d]" aria-hidden="true" />
                Cookies &amp; data choices
              </span>
            </div>

            <article className="px-6 py-2 sm:px-9">
              <PolicySection title="Overview">
                <p>
                  The Stay &amp; Wander respects your privacy. This Privacy Policy explains how we collect, use, share and protect information when you visit thestayandwander.com, sign up for our newsletter, contact us or use links and tools on our website.
                </p>
                <p>
                  By using our website, you agree to the practices described in this policy. If you do not agree, please avoid using the site or providing personal information.
                </p>
              </PolicySection>

              <PolicySection title="Information we collect">
                <p>We may collect information you choose to provide, such as your name, email address and the contents of a message you send us.</p>
                <p>
                  We may also receive limited technical and usage information when you browse the site, including device and browser details, pages viewed, referral sources, approximate location derived from an IP address, and interactions with links or site features.
                </p>
              </PolicySection>

              <PolicySection title="Cookies and similar technologies">
                <p>
                  We use cookies and similar technologies to help the website function, remember preferences, understand how visitors use the site, and measure the performance of content and affiliate links. Cookies are small text files stored by your browser.
                </p>
                <p>
                  You can manage or delete cookies through your browser settings. Blocking some cookies may affect features or the way parts of the site work. Third-party providers may also set cookies according to their own policies.
                </p>
              </PolicySection>

              <PolicySection title="Google Analytics">
                <p>
                  We use Google Analytics to understand aggregate website traffic and engagement, such as which pages are visited, how visitors arrive at the site, and how the site performs. Google Analytics may collect identifiers, browser and device information, IP-derived location and usage data through cookies or similar technologies.
                </p>
                <p>
                  Google processes this information under its own privacy practices. You can control analytics cookies through your browser settings and may use Google&apos;s available opt-out tools where applicable.
                </p>
              </PolicySection>

              <PolicySection title="Mailchimp newsletter sign-ups">
                <p>
                  If you choose to subscribe to our newsletter, your email address and any other information you submit are collected through Mailchimp. We use this information to send travel tips, updates and offers that you requested, and to understand newsletter engagement such as opens and link clicks.
                </p>
                <p>
                  You can unsubscribe at any time using the unsubscribe link in any marketing email. Mailchimp processes newsletter information under its own privacy policy and may use cookies or similar technologies in its services.
                </p>
              </PolicySection>

              <PolicySection title="Affiliate disclosure and external links">
                <p>
                  Some links on The Stay &amp; Wander are affiliate links. If you click an affiliate link and make a booking or purchase, we may earn a commission at no additional cost to you. These relationships help support our travel content, but do not change our commitment to honest recommendations.
                </p>
                <p>
                  When you follow an external link, the destination website&apos;s privacy policy and terms apply. We are not responsible for the privacy practices or content of third-party websites.
                </p>
              </PolicySection>

              <PolicySection title="How we use and share information">
                <p>
                  We use information to operate and improve the site, respond to messages, send requested newsletters, understand content performance, protect against misuse, and comply with legal obligations. We may share information with service providers that help us run the site, such as analytics, email and affiliate partners, only as needed for these purposes.
                </p>
                <p>
                  We do not sell personal information in the ordinary course of operating this travel blog. We may disclose information if required by law or to protect our rights, users or the public.
                </p>
              </PolicySection>

              <PolicySection title="Retention, security and your choices">
                <p>
                  We keep personal information only for as long as reasonably necessary for the purposes described in this policy, unless a longer retention period is required by law. We use reasonable safeguards to protect information, but no online service can guarantee absolute security.
                </p>
                <p>
                  Depending on where you live, you may have rights to access, correct, delete or restrict certain uses of your personal information. To make a privacy request or ask a question, contact us at the email address below.
                </p>
              </PolicySection>

              <PolicySection title="Changes to this policy">
                <p>
                  We may update this Privacy Policy from time to time. We will post the updated version on this page and revise the “Last updated” date. Your continued use of the site after a change means you accept the updated policy.
                </p>
              </PolicySection>

              <PolicySection title="Contact us">
                <p>If you have questions about this Privacy Policy or the way we handle information, please contact:</p>
                <a
                  href="mailto:thestayandwander@thestayandwander.com"
                  className="inline-flex items-center gap-2 font-semibold text-[#0077b6] no-underline transition-colors hover:text-[#005c91]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  thestayandwander@thestayandwander.com
                </a>
              </PolicySection>
            </article>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
