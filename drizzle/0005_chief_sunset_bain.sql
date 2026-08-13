CREATE TABLE `searchConsoleOAuthStates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stateHash` varchar(64) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `searchConsoleOAuthStates_id` PRIMARY KEY(`id`),
	CONSTRAINT `searchConsoleOAuthStates_stateHash_unique` UNIQUE(`stateHash`)
);
