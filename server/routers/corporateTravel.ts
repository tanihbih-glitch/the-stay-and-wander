import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { sendCorporateTravelEmails } from "../corporateTravelEmail";
import { publicProcedure, router } from "../_core/trpc";

const corporateTravelInput = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name.").max(120),
    companyName: z.string().trim().min(2, "Enter your company name.").max(160),
    email: z.string().trim().email("Enter a valid email address.").max(255),
    phone: z.string().trim().min(7, "Enter a valid phone number with country code.").max(64),
    country: z.enum(["USA", "UK", "Canada", "Australia", "India", "Nigeria", "UAE", "Other"]),
    travellerCount: z.enum(["1–4", "5–10", "11–20", "21–50", "50+"]),
    eventName: z.enum([
      "ADIPEC 2026",
      "GITEX 2026",
      "Abu Dhabi Sustainability Week 2027",
      "Other UAE Event",
      "Non-event Business Travel",
      "Corporate Retreat",
      "Incentive Programme",
    ]),
    destination: z.enum([
      "Abu Dhabi UAE",
      "Dubai UAE",
      "Tokyo Japan",
      "Bali Indonesia",
      "Lisbon Portugal",
      "Dubrovnik Croatia",
      "Santorini Greece",
      "São Paulo Brazil",
      "Other",
    ]),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid travel start date."),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid travel end date."),
    budget: z.enum(["Under $500", "$500–1,000", "$1,000–2,000", "$2,000–5,000", "$5,000+"]),
    additionalRequirements: z.string().trim().max(3000).optional(),
  })
  .refine(input => input.endDate >= input.startDate, {
    path: ["endDate"],
    message: "Your return date must be on or after your departure date.",
  });

export const corporateTravelRouter = router({
  submitEnquiry: publicProcedure.input(corporateTravelInput).mutation(async ({ input }) => {
    try {
      const result = await sendCorporateTravelEmails(input);
      if (!result.delivered) {
        throw new Error("Email delivery is not configured.");
      }
      return { success: true as const, autoReplySent: result.autoReplySent };
    } catch (error) {
      console.error("[Corporate Travel] Enquiry submission failed", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "We could not send your travel request. Please try again shortly or email thestayandwander@thestayandwander.com.",
      });
    }
  }),
});
