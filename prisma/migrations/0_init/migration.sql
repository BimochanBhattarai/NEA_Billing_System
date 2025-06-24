-- CreateTable
CREATE TABLE `User` (
    `UserId` VARCHAR(191) NOT NULL,
    `UserName` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NULL,
    `UserTypeId` VARCHAR(191) NOT NULL,
    `Status` BOOLEAN NOT NULL DEFAULT true,
    `UpdatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_UserName_key`(`UserName`),
    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserType` (
    `UserTypeId` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Status` BOOLEAN NOT NULL,

    UNIQUE INDEX `UserType_Name_key`(`Name`),
    PRIMARY KEY (`UserTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_UserTypeId_fkey` FOREIGN KEY (`UserTypeId`) REFERENCES `UserType`(`UserTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

