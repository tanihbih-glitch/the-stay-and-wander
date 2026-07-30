import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { isApplicationRoute } from "../../shared/publicRoutes";
import { injectSSRHead } from "../ssr";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const transformedPage = await vite.transformIndexHtml(url, template);
      const page = injectSSRHead(transformedPage, (req as any).ssrMetadata);
      const statusCode = isApplicationRoute(req.originalUrl) ? 200 : 404;
      res.status(statusCode).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Let the fallback deliver index.html so its route-specific metadata can be
  // injected for both the homepage and known SPA routes.
  app.use(express.static(distPath, { index: false }));

  // Serve the SPA shell for known client routes only. Unknown URLs retain the
  // client NotFound presentation while returning a real HTTP 404 for crawlers.
  app.use("*", async (req, res, next) => {
    try {
      const template = await fs.promises.readFile(
        path.resolve(distPath, "index.html"),
        "utf-8"
      );
      const page = injectSSRHead(template, (req as any).ssrMetadata);
      const statusCode = isApplicationRoute(req.originalUrl) ? 200 : 404;
      res.status(statusCode).set({ "Content-Type": "text/html" }).end(page);
    } catch (error) {
      next(error);
    }
  });
}
