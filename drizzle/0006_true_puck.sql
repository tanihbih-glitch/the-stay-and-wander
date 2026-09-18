CREATE TABLE `searchConsoleUaeExtendedStayReports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`property` varchar(255) NOT NULL,
	`periodStart` varchar(10) NOT NULL,
	`periodEnd` varchar(10) NOT NULL,
	`metrics` json NOT NULL,
	`generatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `searchConsoleUaeExtendedStayReports_id` PRIMARY KEY(`id`),
	CONSTRAINT `searchConsoleUaeExtendedStayReports_property_period_unique` UNIQUE(`property`,`periodStart`,`periodEnd`)
);
--> statement-breakpoint
ALTER TABLE `searchConsoleConnections` ADD `uaeExtendedStayScheduleTaskUid` varchar(65);