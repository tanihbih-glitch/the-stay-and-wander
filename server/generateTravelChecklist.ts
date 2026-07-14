import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

/**
 * Generate a travel checklist PDF
 * This is used as a lead magnet for newsletter signups
 */
export async function generateTravelChecklistPDF(): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size
  const { height } = page.getSize();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let yPosition = height - 40;

  // Title
  page.drawText("THE ULTIMATE TRAVEL CHECKLIST", {
    x: 50,
    y: yPosition,
    size: 24,
    font: helveticaBoldFont,
    color: rgb(0.2, 0.4, 0.8), // Blue color
  });

  yPosition -= 35;
  page.drawText("Your Complete Guide to Packing Smart & Traveling Light", {
    x: 50,
    y: yPosition,
    size: 12,
    font: helveticaFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  yPosition -= 30;

  // Section 1: Documents
  page.drawText("DOCUMENTS & ESSENTIALS", {
    x: 50,
    y: yPosition,
    size: 14,
    font: helveticaBoldFont,
    color: rgb(0.2, 0.4, 0.8),
  });

  yPosition -= 20;
  const documents = [
    "☐ Passport (valid for 6+ months)",
    "☐ Travel insurance documents",
    "☐ Flight tickets/confirmations",
    "☐ Hotel reservations",
    "☐ Visa documentation (if required)",
    "☐ Driver's license & international permit",
    "☐ Credit cards & debit cards",
    "☐ Travel itinerary copies",
    "☐ Emergency contact information",
    "☐ Vaccination records",
  ];

  documents.forEach((item) => {
    page.drawText(item, {
      x: 50,
      y: yPosition,
      size: 11,
      font: helveticaFont,
    });
    yPosition -= 15;
  });

  yPosition -= 15;

  // Section 2: Clothing
  page.drawText("CLOTHING ESSENTIALS", {
    x: 50,
    y: yPosition,
    size: 14,
    font: helveticaBoldFont,
    color: rgb(0.2, 0.4, 0.8),
  });

  yPosition -= 20;
  const clothing = [
    "☐ Comfortable walking shoes",
    "☐ Casual shirts/tops (3-4)",
    "☐ Pants/shorts (2-3)",
    "☐ Underwear & socks (5-7 pairs)",
    "☐ Lightweight jacket or sweater",
    "☐ Sleepwear",
    "☐ Swimwear",
    "☐ Formal outfit (if needed)",
    "☐ Hat or cap",
    "☐ Sunglasses",
  ];

  clothing.forEach((item) => {
    page.drawText(item, {
      x: 50,
      y: yPosition,
      size: 11,
      font: helveticaFont,
    });
    yPosition -= 15;
  });

  yPosition -= 15;

  // Section 3: Toiletries
  page.drawText("TOILETRIES & PERSONAL CARE", {
    x: 50,
    y: yPosition,
    size: 14,
    font: helveticaBoldFont,
    color: rgb(0.2, 0.4, 0.8),
  });

  yPosition -= 20;
  const toiletries = [
    "☐ Toothbrush & toothpaste",
    "☐ Deodorant",
    "☐ Sunscreen (SPF 30+)",
    "☐ Medications & supplements",
    "☐ First aid kit",
    "☐ Shampoo & conditioner",
    "☐ Skincare products",
    "☐ Feminine hygiene products",
    "☐ Nail clippers",
    "☐ Hairbrush or comb",
  ];

  toiletries.forEach((item) => {
    page.drawText(item, {
      x: 50,
      y: yPosition,
      size: 11,
      font: helveticaFont,
    });
    yPosition -= 15;
  });

  yPosition -= 15;

  // Section 4: Electronics
  page.drawText("ELECTRONICS & TECH", {
    x: 50,
    y: yPosition,
    size: 14,
    font: helveticaBoldFont,
    color: rgb(0.2, 0.4, 0.8),
  });

  yPosition -= 20;
  const electronics = [
    "☐ Phone & charger",
    "☐ Power bank",
    "☐ Universal power adapter",
    "☐ Camera (optional)",
    "☐ Headphones/earbuds",
    "☐ Travel-size WiFi hotspot",
    "☐ Portable speaker",
    "☐ USB cables",
  ];

  electronics.forEach((item) => {
    page.drawText(item, {
      x: 50,
      y: yPosition,
      size: 11,
      font: helveticaFont,
    });
    yPosition -= 15;
  });

  // Footer
  page.drawText("Happy Travels! 🌍 ✈️ 🏖️", {
    x: 50,
    y: 20,
    size: 12,
    font: helveticaBoldFont,
    color: rgb(0.2, 0.4, 0.8),
  });

  page.drawText("Visit thestayandwander.com for more travel tips and inspiration", {
    x: 50,
    y: 5,
    size: 10,
    font: helveticaFont,
    color: rgb(0.7, 0.7, 0.7),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
