CREATE TABLE `searchConsoleConnections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`property` varchar(255) NOT NULL,
	`refreshTokenEncrypted` text NOT NULL,
	`scope` varchar(512) NOT NULL,
	`authorizedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `searchConsoleConnections_id` PRIMARY KEY(`id`),
	CONSTRAINT `searchConsoleConnections_property_unique` UNIQUE(`property`)
);
