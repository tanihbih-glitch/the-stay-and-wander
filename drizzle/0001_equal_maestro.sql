CREATE TABLE `affiliateClicks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`partner` varchar(64) NOT NULL,
	`category` varchar(64) NOT NULL,
	`source` varchar(256) NOT NULL,
	`destination` varchar(512) NOT NULL,
	`userId` int,
	`sessionId` varchar(128),
	`ipAddress` varchar(45),
	`userAgent` text,
	`referrer` varchar(512),
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `affiliateClicks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `affiliateConversions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clickId` int,
	`partner` varchar(64) NOT NULL,
	`category` varchar(64) NOT NULL,
	`conversionType` varchar(64) NOT NULL,
	`conversionValue` varchar(20),
	`status` varchar(64) NOT NULL DEFAULT 'pending',
	`externalId` varchar(256),
	`notes` text,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `affiliateConversions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `affiliateConversions` ADD CONSTRAINT `affiliateConversions_clickId_affiliateClicks_id_fk` FOREIGN KEY (`clickId`) REFERENCES `affiliateClicks`(`id`) ON DELETE no action ON UPDATE no action;