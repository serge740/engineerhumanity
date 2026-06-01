-- DropForeignKey (removes constraints before dropping tables)
ALTER TABLE `blocks` DROP FOREIGN KEY `blocks_pageId_fkey`;
ALTER TABLE `published_blocks` DROP FOREIGN KEY `published_blocks_pageId_fkey`;
ALTER TABLE `page_versions` DROP FOREIGN KEY `page_versions_pageId_fkey`;

-- DropTable
DROP TABLE `blocks`;
DROP TABLE `published_blocks`;
DROP TABLE `page_versions`;

-- Clear existing pages rows (schema change requires empty table)
DELETE FROM `pages`;

-- DropIndex (old unique slug index, replaced by composite siteId+slug)
ALTER TABLE `pages` DROP INDEX `pages_slug_key`;

-- AlterTable pages: drop old columns
ALTER TABLE `pages`
    DROP COLUMN `hasChanges`,
    DROP COLUMN `isHome`,
    DROP COLUMN `isPublished`,
    DROP COLUMN `ogImage`,
    DROP COLUMN `order`,
    DROP COLUMN `publishedAt`,
    DROP COLUMN `seoDescription`,
    DROP COLUMN `seoTitle`;

-- AlterTable pages: add new columns
ALTER TABLE `pages`
    ADD COLUMN `siteId` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `html` JSON NOT NULL,
    ADD COLUMN `metadata` JSON NOT NULL,
    ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `version` INTEGER NOT NULL DEFAULT 1;

-- CreateTable sites
CREATE TABLE `sites` (
    `id` VARCHAR(191) NOT NULL,
    `adminId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `domain` VARCHAR(191) NULL,
    `metadata` JSON NOT NULL,
    `globalCSS` TEXT NOT NULL,
    `globalJS` TEXT NOT NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sites_domain_key`(`domain`),
    INDEX `sites_adminId_idx`(`adminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable components
CREATE TABLE `components` (
    `id` VARCHAR(191) NOT NULL,
    `siteId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `html` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `components_siteId_idx`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable assets
CREATE TABLE `assets` (
    `id` VARCHAR(191) NOT NULL,
    `siteId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `assets_siteId_idx`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddIndex: composite unique on pages(siteId, slug)
ALTER TABLE `pages` ADD UNIQUE INDEX `pages_siteId_slug_key`(`siteId`, `slug`);

-- AddIndex: pages siteId index
ALTER TABLE `pages` ADD INDEX `pages_siteId_idx`(`siteId`);

-- AddForeignKey
ALTER TABLE `sites` ADD CONSTRAINT `sites_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pages` ADD CONSTRAINT `pages_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `sites`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `components` ADD CONSTRAINT `components_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `sites`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `sites`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
