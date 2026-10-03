-- AlterTable
ALTER TABLE `stories` ADD COLUMN `imageFocusX` DOUBLE NULL,
    ADD COLUMN `imageFocusY` DOUBLE NULL;

-- AlterTable
ALTER TABLE `team_members` ADD COLUMN `imageFocusX` DOUBLE NULL,
    ADD COLUMN `imageFocusY` DOUBLE NULL;
