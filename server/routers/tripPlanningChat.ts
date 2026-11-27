import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { sendTripPlanningChatEmail } from "../tripPlanningChatEmail";

const tripPlanningChatInput = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  destination: z.string().trim().min(2, "Tell us where you would like to go.").max(160),
  approximateDates: z.string().trim().min(2, "Add approximate travel dates.").max(120),
  budgetBand: z.enum(["Under $1,000", "$1,000–2,500", "$2,500–5,000", "$5,000+", "Not sure"]),
  message: z.string().trim().max(1200).optional(),
  consent: z.literal(true, { error: "Please agree to the privacy policy before sending." }),
  source: z.string().trim().max(120).optional(),
});

export const tripPlanningChatRouter = router({
  submitEnquiry: publicProcedure.input(tripPlanningChatInput).mutation(async ({ input }) => {
    try {
      const result = await sendTripPlanningChatEmail(input);
      if (!result.delivered) throw new Error("Email delivery is not configured.");
      return { success: true as const };
    } catch (error) {
      console.error("[Trip Planning Chat] Enquiry submission failed", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "We could not send your request. Please try again shortly or email thestayandwander@thestayandwander.com.",
      });
    }
  }),
});
