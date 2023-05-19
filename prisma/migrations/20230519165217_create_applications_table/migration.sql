-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seekerId` INTEGER NOT NULL,
    `jobListingId` INTEGER NOT NULL,
    `resume` VARCHAR(191) NOT NULL,
    `coverLetter` VARCHAR(191) NOT NULL,
    `submittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_seekerId_fkey` FOREIGN KEY (`seekerId`) REFERENCES `seekers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobListingId_fkey` FOREIGN KEY (`jobListingId`) REFERENCES `joblistings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
