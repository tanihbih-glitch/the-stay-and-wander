CREATE TABLE `contentEngagementEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventType` varchar(64) NOT NULL,
	`component` varchar(128) NOT NULL,
	`sourcePath` varchar(255) NOT NULL,
	`destinationPath` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contentEngagementEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `contentEngagementEvents_type_created_index` ON `contentEngagementEvents` (`eventType`,`createdAt`);--> statement-breakpoint
CREATE INDEX `contentEngagementEvents_source_index` ON `contentEngagementEvents` (`sourcePath`);--> statement-breakpoint
CREATE INDEX `contentEngagementEvents_destination_index` ON `contentEngagementEvents` (`destinationPath`);