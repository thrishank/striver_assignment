-- CreateTable
CREATE TABLE `formData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `stdin` VARCHAR(191) NOT NULL,
    `sourcecode` VARCHAR(191) NOT NULL,
    `output` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `formData_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
