import type { Express, Request, Response } from "express";

function normalizeIp(value: string | undefined) {
  if (!value) return "";
  return value.replace(/^::ffff:/, "").trim();
}

export function registerAnalyticsConfigRoute(app: Express) {
  app.get("/api/analytics/config", (req: Request, res: Response) => {
    const ownerIp = normalizeIp(process.env.GA4_INTERNAL_TRAFFIC_IP);
    const requestIp = normalizeIp(req.ip || req.socket.remoteAddress);
    const isInternal = Boolean(ownerIp && requestIp && ownerIp === requestIp);
    res.setHeader("Cache-Control", "no-store");
    res.json({ isInternal });
  });
}
