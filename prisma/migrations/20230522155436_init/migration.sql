-- AlterTable
ALTER TABLE `employer` ADD COLUMN `password` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `seekers` ADD COLUMN `password` VARCHAR(191) NOT NULL DEFAULT '';
