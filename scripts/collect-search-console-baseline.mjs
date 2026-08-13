import { collectSearchConsoleCtrReport } from "../server/searchConsoleCtrMonitoring.ts";

const report = await collectSearchConsoleCtrReport();
console.log(JSON.stringify({
  property: report.property,
  periodStart: report.periodStart,
  periodEnd: report.periodEnd,
  pages: Object.keys(report.metrics).length,
}, null, 2));
