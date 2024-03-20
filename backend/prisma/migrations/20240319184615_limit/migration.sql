-- AlterTable
ALTER TABLE `formData` MODIFY `stdin` VARCHAR(255) NOT NULL,
    MODIFY `sourcecode` VARCHAR(255) NOT NULL,
    MODIFY `output` VARCHAR(255) NULL;
