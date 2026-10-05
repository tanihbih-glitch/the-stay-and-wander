import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.resolve(root, file), "utf8");

describe("canonical booking engagement enhancements", () => {
  it("renders the shared FAQ accordion with truthful status-aware hotel search feedback", () => {
    const page = read("client/src/pages/Booking.tsx");
    expect(page).toContain("ArticleFAQ");
    expect(page).toContain('title="Booking questions, answered"');
    expect(page).toContain('role="status"');
    expect(page).toContain("Preparing search");
    expect(page).toContain("Your preferences are ready");
    expect(page).toContain('type="submit"');
  });
});

describe("UAE extended-stay save-for-later enhancement", () => {
  it("keeps saved listing state browser-local and SSR-safe", () => {
    const selector = read("client/src/components/UaeExtendedStaySelector.tsx");
    expect(selector).toContain("tsw-uae-extended-stay-bookmarks");
    expect(selector).toContain("useEffect");
    expect(selector).toContain("aria-pressed={isSaved}");
    expect(selector).toContain('type="button"');
    expect(selector).not.toMatch(/trpc\.|fetch\(|axios|userId/i);
  });
});
