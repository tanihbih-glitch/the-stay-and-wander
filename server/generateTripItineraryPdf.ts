import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import type { TripPlannerInput, TripPlannerTier } from "./tripPlannerPrompts";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 48;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const OCEAN = rgb(0.035, 0.192, 0.286);
const DEEP_OCEAN = rgb(0.02, 0.125, 0.19);
const GOLD = rgb(0.79, 0.61, 0.25);
const SAND = rgb(0.96, 0.945, 0.9);
const INK = rgb(0.11, 0.16, 0.18);
const MUTED = rgb(0.36, 0.42, 0.43);

type PdfLine = { text: string; size: number; font: PDFFont; color: ReturnType<typeof rgb>; gapAfter?: number };

function toPdfText(value: string) {
  return value
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[\u2022\u00B7]/g, "-")
    .replace(/\u00A0/g, " ")
    .replace(/[^\u0000-\u00FF]/g, "");
}

function cleanInlineMarkdown(value: string) {
  return toPdfText(value)
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .trim();
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && font.widthOfTextAtSize(candidate, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function drawCompassMark(page: PDFPage, x: number, y: number) {
  page.drawCircle({ x, y, size: 14, borderColor: GOLD, borderWidth: 1.2 });
  page.drawLine({ start: { x, y: y - 19 }, end: { x, y: y + 19 }, color: GOLD, thickness: 1 });
  page.drawLine({ start: { x: x - 19, y }, end: { x: x + 19, y }, color: GOLD, thickness: 1 });
  page.drawLine({ start: { x, y: y + 13 }, end: { x: x + 5, y: y - 4 }, color: GOLD, thickness: 2.2 });
  page.drawLine({ start: { x, y: y + 13 }, end: { x: x - 5, y: y - 4 }, color: GOLD, thickness: 2.2 });
  page.drawLine({ start: { x, y: y - 13 }, end: { x: x + 5, y: y + 4 }, color: OCEAN, thickness: 2.2 });
  page.drawLine({ start: { x, y: y - 13 }, end: { x: x - 5, y: y + 4 }, color: OCEAN, thickness: 2.2 });
}

function itineraryLine(line: string, fonts: { regular: PDFFont; bold: PDFFont; serifBold: PDFFont }): PdfLine | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("## ")) {
    return { text: cleanInlineMarkdown(trimmed.slice(3)), size: 17, font: fonts.serifBold, color: OCEAN, gapAfter: 7 };
  }
  if (trimmed.startsWith("### ")) {
    return { text: cleanInlineMarkdown(trimmed.slice(4)), size: 12.5, font: fonts.bold, color: GOLD, gapAfter: 4 };
  }
  if (trimmed.startsWith("- ")) {
    return { text: `- ${cleanInlineMarkdown(trimmed.slice(2))}`, size: 10.2, font: fonts.regular, color: INK, gapAfter: 2 };
  }
  if (/^(Morning|Afternoon|Evening|Practical tip|Why this day|Restaurants?|Meal suggestion|Personal Touches):/i.test(trimmed)) {
    return { text: cleanInlineMarkdown(trimmed), size: 10.7, font: fonts.bold, color: DEEP_OCEAN, gapAfter: 3 };
  }
  return { text: cleanInlineMarkdown(trimmed), size: 10.4, font: fonts.regular, color: INK, gapAfter: 4 };
}

export async function generateTripItineraryPdf(options: {
  itinerary: string;
  input: TripPlannerInput;
  tier: TripPlannerTier;
}) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`The Stay & Wander — ${options.input.destination} itinerary`);
  pdf.setAuthor("The Stay & Wander");
  pdf.setSubject("Personalized travel itinerary");
  pdf.setKeywords(["travel", "itinerary", options.input.destination]);

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const serifBold = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const fonts = { regular, bold, serifBold };

  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  const drawPageChrome = (target: PDFPage, pageNumber: number) => {
    target.drawRectangle({ x: 0, y: PAGE_HEIGHT - 10, width: PAGE_WIDTH, height: 10, color: GOLD });
    target.drawText("THE STAY & WANDER", { x: MARGIN, y: PAGE_HEIGHT - 33, size: 8.5, font: bold, color: OCEAN });
    drawCompassMark(target, PAGE_WIDTH - MARGIN - 6, PAGE_HEIGHT - 28);
    target.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_WIDTH - MARGIN, y: 36 }, color: GOLD, thickness: 0.7 });
    target.drawText("Plan more at thestayandwander.com/booking", { x: MARGIN, y: 21, size: 7.7, font: regular, color: MUTED });
    target.drawText(String(pageNumber), { x: PAGE_WIDTH - MARGIN - 4, y: 21, size: 7.7, font: regular, color: MUTED });
  };

  const newPage = () => {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - 62;
    return page;
  };

  const ensureSpace = (height: number) => {
    if (y - height < 55) newPage();
  };

  const drawWrapped = (line: PdfLine) => {
    const wrapped = wrapText(line.text, line.font, line.size, CONTENT_WIDTH);
    const lineHeight = line.size * 1.42;
    ensureSpace(wrapped.length * lineHeight + (line.gapAfter ?? 0));
    for (const segment of wrapped) {
      page.drawText(segment, { x: MARGIN, y, size: line.size, font: line.font, color: line.color });
      y -= lineHeight;
    }
    y -= line.gapAfter ?? 0;
  };

  // Cover section.
  y = PAGE_HEIGHT - 105;
  page.drawText("YOUR PERSONAL", { x: MARGIN, y, size: 12, font: bold, color: GOLD });
  y -= 37;
  const titleLines = wrapText(toPdfText(options.input.destination.toUpperCase()), serifBold, 31, CONTENT_WIDTH);
  for (const titleLine of titleLines) {
    page.drawText(titleLine, { x: MARGIN, y, size: 31, font: serifBold, color: OCEAN });
    y -= 37;
  }
  page.drawText("A considered itinerary, tailored for how you travel.", { x: MARGIN, y: y - 4, size: 11.5, font: regular, color: MUTED });
  y -= 65;

  const details = [
    ["Trip", `${options.input.tripLength} days`],
    ["Dates", options.input.travelDates || "Dates to be decided"],
    ["Style", `${options.input.travelStyle} · ${options.input.pace}`],
    ["Interests", options.input.interests.join(", ")],
    ["Edition", `${options.tier.charAt(0).toUpperCase()}${options.tier.slice(1)} itinerary`],
  ];
  details.forEach(([label, value]) => {
    page.drawText(label.toUpperCase(), { x: MARGIN, y, size: 7.8, font: bold, color: GOLD });
    page.drawText(toPdfText(value), { x: MARGIN + 92, y: y - 1, size: 10.3, font: regular, color: INK });
    y -= 22;
  });

  y -= 24;
  page.drawRectangle({ x: MARGIN, y: y - 2, width: CONTENT_WIDTH, height: 1, color: GOLD });
  y -= 40;

  for (const rawLine of options.itinerary.split(/\r?\n/)) {
    const line = itineraryLine(rawLine, fonts);
    if (line) drawWrapped(line);
    else y -= 5;
  }

  const pages = pdf.getPages();
  pages.forEach((target, index) => drawPageChrome(target, index + 1));
  return Buffer.from(await pdf.save());
}
