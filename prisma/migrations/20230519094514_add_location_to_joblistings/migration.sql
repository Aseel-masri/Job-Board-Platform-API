/*
  Warnings:

  - You are about to drop the `joblisting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `joblisting`;

-- CreateTable
CREATE TABLE `joblistings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `requirements` VARCHAR(191) NULL,
    `salary` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
