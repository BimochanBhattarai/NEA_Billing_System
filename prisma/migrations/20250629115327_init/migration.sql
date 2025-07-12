-- CreateTable
CREATE TABLE `User` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userTypeID` INTEGER NOT NULL,
    `status` ENUM('Active', 'Inactive', 'Suspended') NOT NULL DEFAULT 'Active',
    `lastLogin` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `cusID` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `scNo` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `mobileNo` VARCHAR(191) NOT NULL,
    `citizenshipNo` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `demandTypeID` INTEGER NOT NULL,
    `branchID` INTEGER NOT NULL,
    `citizenshipDoc` VARCHAR(191) NULL,
    `propertyDoc` VARCHAR(191) NULL,
    `status` ENUM('Active', 'Inactive', 'Suspended') NOT NULL DEFAULT 'Active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Customer_userID_key`(`userID`),
    UNIQUE INDEX `Customer_scNo_key`(`scNo`),
    UNIQUE INDEX `Customer_citizenshipNo_key`(`citizenshipNo`),
    PRIMARY KEY (`cusID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bill` (
    `billNo` INTEGER NOT NULL AUTO_INCREMENT,
    `cusID` INTEGER NOT NULL,
    `billDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `billMonth` INTEGER NOT NULL,
    `billYear` INTEGER NOT NULL,
    `previousReading` INTEGER NOT NULL,
    `currentReading` INTEGER NOT NULL,
    `consumedUnits` INTEGER NOT NULL,
    `minimumCharge` DOUBLE NOT NULL,
    `rate` DOUBLE NOT NULL,
    `totalAmount` DOUBLE NOT NULL,
    `status` ENUM('Generated', 'Verified', 'Paid', 'Overdue', 'Cancelled') NOT NULL DEFAULT 'Generated',
    `verifiedByID` INTEGER NULL,
    `verifiedAt` DATETIME(3) NULL,
    `dueDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`billNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `paymentID` INTEGER NOT NULL AUTO_INCREMENT,
    `billID` INTEGER NOT NULL,
    `cusID` INTEGER NOT NULL,
    `paymentMethodID` INTEGER NOT NULL,
    `amountPaid` DOUBLE NOT NULL,
    `rebate` DOUBLE NOT NULL DEFAULT 0,
    `penalty` DOUBLE NOT NULL DEFAULT 0,
    `paymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `transactionID` VARCHAR(191) NULL,
    `receiptNumber` VARCHAR(191) NOT NULL,
    `processedByID` INTEGER NULL,

    UNIQUE INDEX `Payment_billID_key`(`billID`),
    UNIQUE INDEX `Payment_receiptNumber_key`(`receiptNumber`),
    PRIMARY KEY (`paymentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Branch` (
    `branchID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `inchargeID` INTEGER NULL,
    `status` ENUM('Active', 'Inactive', 'Suspended') NOT NULL DEFAULT 'Active',

    UNIQUE INDEX `Branch_inchargeID_key`(`inchargeID`),
    PRIMARY KEY (`branchID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentMethod` (
    `paymentMethodID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `logoURL` VARCHAR(191) NULL,
    `status` ENUM('Active', 'Inactive', 'Suspended') NOT NULL DEFAULT 'Active',

    PRIMARY KEY (`paymentMethodID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DemandType` (
    `demandTypeID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `rate` DOUBLE NOT NULL,
    `minimumCharge` DOUBLE NOT NULL,
    `status` ENUM('Active', 'Inactive', 'Suspended') NOT NULL DEFAULT 'Active',

    PRIMARY KEY (`demandTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `empID` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeTypeID` INTEGER NOT NULL,
    `branchID` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `contactNo` VARCHAR(191) NOT NULL,
    `userID` INTEGER NOT NULL,
    `status` ENUM('Active', 'Inactive', 'Suspended') NOT NULL DEFAULT 'Active',

    UNIQUE INDEX `Employee_userID_key`(`userID`),
    PRIMARY KEY (`empID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeType` (
    `employeeTypeID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('Active', 'Inactive', 'Suspended') NOT NULL DEFAULT 'Active',

    PRIMARY KEY (`employeeTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserType` (
    `userTypeID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('Active', 'Inactive', 'Suspended') NOT NULL DEFAULT 'Active',

    PRIMARY KEY (`userTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userTypeID_fkey` FOREIGN KEY (`userTypeID`) REFERENCES `UserType`(`userTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_demandTypeID_fkey` FOREIGN KEY (`demandTypeID`) REFERENCES `DemandType`(`demandTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_branchID_fkey` FOREIGN KEY (`branchID`) REFERENCES `Branch`(`branchID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bill` ADD CONSTRAINT `Bill_cusID_fkey` FOREIGN KEY (`cusID`) REFERENCES `Customer`(`cusID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bill` ADD CONSTRAINT `Bill_verifiedByID_fkey` FOREIGN KEY (`verifiedByID`) REFERENCES `Employee`(`empID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_billID_fkey` FOREIGN KEY (`billID`) REFERENCES `Bill`(`billNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_cusID_fkey` FOREIGN KEY (`cusID`) REFERENCES `Customer`(`cusID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_paymentMethodID_fkey` FOREIGN KEY (`paymentMethodID`) REFERENCES `PaymentMethod`(`paymentMethodID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_processedByID_fkey` FOREIGN KEY (`processedByID`) REFERENCES `Employee`(`empID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Branch` ADD CONSTRAINT `Branch_inchargeID_fkey` FOREIGN KEY (`inchargeID`) REFERENCES `Employee`(`empID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_employeeTypeID_fkey` FOREIGN KEY (`employeeTypeID`) REFERENCES `EmployeeType`(`employeeTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_branchID_fkey` FOREIGN KEY (`branchID`) REFERENCES `Branch`(`branchID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
