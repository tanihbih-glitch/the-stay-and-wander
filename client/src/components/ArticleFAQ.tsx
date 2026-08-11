import type { ArticleFaq } from "@shared/articleFaqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ArticleFAQProps {
  faqs: readonly ArticleFaq[];
  title?: string;
}

/** Visible FAQ content that exactly matches the server-rendered FAQPage schema. */
export default function ArticleFAQ({
  faqs,
  title = "Frequently Asked Questions",
}: ArticleFAQProps) {
  return (
    <section className="my-12 border-y border-gray-200 py-10" aria-label={title}>
      <h2 className="font-playfair text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-gray-700">
        Quick answers based on the guidance and recommendations in this article.
      </p>
      <Accordion type="single" collapsible className="mt-6 rounded-xl border border-gray-200 bg-white px-5">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`}>
            <AccordionTrigger className="py-5 text-left text-base font-semibold text-gray-900 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-base leading-relaxed text-gray-700">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
