import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { generateTravelChecklistPDF } from "../generateTravelChecklist";
import { storagePut } from "../storage";

/**
 * Newsletter Router
 * Handles newsletter signups and PDF lead magnet distribution
 */
export const newsletterRouter = router({
  /**
   * Subscribe to newsletter and get the travel checklist PDF
   * Returns a signed URL to download the PDF
   */
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email address"),
        name: z.string().min(1, "Name is required"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Generate the travel checklist PDF
        const pdfBuffer = await generateTravelChecklistPDF();

        // Upload PDF to storage
        const fileName = `travel-checklist-${Date.now()}.pdf`;
        const { url } = await storagePut(
          `lead-magnets/${fileName}`,
          pdfBuffer,
          "application/pdf"
        );

        // In a real app, you would:
        // 1. Save the email to your newsletter service (Mailchimp, ConvertKit, etc.)
        // 2. Send a confirmation email
        // 3. Track the signup in your database

        console.log(`[Newsletter] New signup: ${input.email} (${input.name})`);

        return {
          success: true,
          message: "Thank you for subscribing! Your travel checklist is ready.",
          downloadUrl: url,
          email: input.email,
        };
      } catch (error) {
        console.error("[Newsletter] Subscription error:", error);
        throw new Error("Failed to process subscription. Please try again.");
      }
    }),

  /**
   * Get the travel checklist PDF without subscribing (for testing)
   * In production, this would require a valid subscription
   */
  getChecklist: publicProcedure.query(async () => {
    try {
      const pdfBuffer = await generateTravelChecklistPDF();

      // Upload PDF to storage
      const fileName = `travel-checklist-${Date.now()}.pdf`;
      const { url } = await storagePut(
        `lead-magnets/${fileName}`,
        pdfBuffer,
        "application/pdf"
      );

      return {
        success: true,
        downloadUrl: url,
      };
    } catch (error) {
      console.error("[Newsletter] Checklist generation error:", error);
      throw new Error("Failed to generate checklist. Please try again.");
    }
  }),
});
