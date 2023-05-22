-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_jobListingId_fkey`;

-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_seekerId_fkey`;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_seekerId_fkey` FOREIGN KEY (`seekerId`) REFERENCES `seekers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobListingId_fkey` FOREIGN KEY (`jobListingId`) REFERENCES `joblistings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
