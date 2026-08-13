CREATE TABLE `searchConsoleCtrReports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`property` varchar(255) NOT NULL,
	`periodStart` varchar(10) NOT NULL,
	`periodEnd` varchar(10) NOT NULL,
	`metrics` json NOT NULL,
	`generatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `searchConsoleCtrReports_id` PRIMARY KEY(`id`),
	CONSTRAINT `searchConsoleCtrReports_property_period_unique` UNIQUE(`property`,`periodStart`,`periodEnd`)
);
--> statement-breakpoint
ALTER TABLE `searchConsoleConnections` ADD `scheduleCronTaskUid` varchar(65);--> statement-breakpoint
ALTER TABLE `searchConsoleConnections` ADD `lastReportAt` timestamp;