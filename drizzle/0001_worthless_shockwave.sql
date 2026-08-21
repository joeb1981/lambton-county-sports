CREATE TABLE `ad_slots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(128) NOT NULL,
	`imageUrl` text,
	`imageKey` text,
	`destinationUrl` text NOT NULL,
	`position` enum('banner_top','banner_bottom','sidebar_card','inline_card') NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ad_slots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cron_config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobName` varchar(128) NOT NULL,
	`taskUid` varchar(128),
	`isEnabled` boolean NOT NULL DEFAULT true,
	`lastRunAt` timestamp,
	`lastRunStatus` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cron_config_id` PRIMARY KEY(`id`),
	CONSTRAINT `cron_config_jobName_unique` UNIQUE(`jobName`)
);
--> statement-breakpoint
CREATE TABLE `program_changes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`programId` int NOT NULL,
	`fieldName` varchar(64) NOT NULL,
	`oldValue` text,
	`newValue` text,
	`status` enum('pending','approved','dismissed') NOT NULL DEFAULT 'pending',
	`detectedAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	`reviewedBy` int,
	CONSTRAINT `program_changes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sports_programs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sportName` varchar(128) NOT NULL,
	`organization` varchar(256) NOT NULL,
	`ageGroups` varchar(256) NOT NULL,
	`registrationOpenDate` timestamp,
	`registrationCloseDate` timestamp,
	`programStartDate` timestamp,
	`registrationUrl` text NOT NULL,
	`notes` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`lastCheckedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sports_programs_id` PRIMARY KEY(`id`)
);
