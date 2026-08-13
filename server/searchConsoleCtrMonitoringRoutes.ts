import type { Express, Request, Response } from "express";
import { sdk } from "./_core/sdk";
import { getSearchConsoleConnectionByTaskUid } from "./db";
import { collectSearchConsoleCtrReport } from "./searchConsoleCtrMonitoring";

export function registerSearchConsoleCtrMonitoringRoutes(app: Express) {
  app.post("/api/scheduled/search-console-ctr", async (req: Request, res: Response) => {
    try {
      const user = await sdk.authenticateRequest(req);
      if (!user.isCron || !user.taskUid) return res.status(403).json({ error: "cron-only" });
      const connection = await getSearchConsoleConnectionByTaskUid(user.taskUid);
      if (!connection) return res.json({ ok: true, skipped: "orphan" });
      const report = await collectSearchConsoleCtrReport();
      return res.json({ ok: true, periodStart: report.periodStart, periodEnd: report.periodEnd, pages: Object.keys(report.metrics).length });
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : String(error),
        context: { url: req.originalUrl },
        timestamp: new Date().toISOString(),
      });
    }
  });
}
