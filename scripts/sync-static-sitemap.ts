import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateCompleteSitemap } from "../server/generateSitemap";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemapPath = path.join(projectRoot, "client", "public", "sitemap.xml");

fs.writeFileSync(sitemapPath, `${generateCompleteSitemap()}\n`, "utf8");
console.log(`[sitemap] synchronized ${sitemapPath}`);
