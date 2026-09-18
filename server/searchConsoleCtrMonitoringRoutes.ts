import type { Express, Request, Response } from "express";
import { sdk } from "./_core/sdk";
import {
  getSearchConsoleConnectionByTaskUid,
  getSearchConsoleConnectionByUaeExtendedStayTaskUid,
} from "./db";
import {
  collectSearchConsoleCtrReport,
  collectUaeExtendedStayHubReport,
  comparePriorityCtrFollowUp,
  compareUaeExtendedStayHubFollowUp,
  isFirstBusinessDayOfMonth,
  isUaeExtendedStayReviewEligible,
} from "./searchConsoleCtrMonitoring";

function sendUnexpectedError(res: Response, req: Request, error: unknown) {
  return res.status(500).json({
    error: error instanceof Error ? error.message : String(error),
    context: { url: req.originalUrl },
    timestamp: new Date().toISOString(),
  });
}

export function registerSearchConsoleCtrMonitoringRoutes(app: Express) {
  /** Retains the established CTR follow-up task and its existing metrics. */
  app.post("/api/scheduled/search-console-ctr", async (req: Request, res: Response) => {
    try {
      const user = await sdk.authenticateRequest(req);
      if (!user.isCron || !user.taskUid) return res.status(403).json({ error: "cron-only" });
      const connection = await getSearchConsoleConnectionByTaskUid(user.taskUid);
      if (!connection) return res.json({ ok: true, skipped: "orphan" });
      if (!isFirstBusinessDayOfMonth()) return res.json({ ok: true, skipped: "not-first-business-day" });
      const report = await collectSearchConsoleCtrReport();
      return res.json({
        ok: true,
        periodStart: report.periodStart,
        periodEnd: report.periodEnd,
        pages: Object.keys(report.metrics).length,
        priorityCtrFollowUp: comparePriorityCtrFollowUp(report.metrics),
      });
    } catch (error) {
      return sendUnexpectedError(res, req, error);
    }
  });

  /** Independently stores the UAE hub position trend and citation-review prompt. */
  app.post("/api/scheduled/search-console-uae-extended-stay", async (req: Request, res: Response) => {
    try {
      const user = await sdk.authenticateRequest(req);
      if (!user.isCron || !user.taskUid) return res.status(403).json({ error: "cron-only" });
      const connection = await getSearchConsoleConnectionByUaeExtendedStayTaskUid(user.taskUid);
      if (!connection) return res.json({ ok: true, skipped: "orphan" });
      if (!isUaeExtendedStayReviewEligible()) return res.json({ ok: true, skipped: "before-first-complete-month" });
      const report = await collectUaeExtendedStayHubReport();
      return res.json({
        ok: true,
        periodStart: report.periodStart,
        periodEnd: report.periodEnd,
        pages: Object.keys(report.metrics).length,
        uaeExtendedStayHubFollowUp: compareUaeExtendedStayHubFollowUp(report.metrics),
      });
    } catch (error) {
      return sendUnexpectedError(res, req, error);
    }
  });
}
