/*
  Warnings:

  - You are about to drop the `activity_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `branches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer_documents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `demand_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `login_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meter_readings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_receipt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments_method` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `penalty_rules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rebate_rules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `system_configuration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `activity_logs` DROP FOREIGN KEY `activity_logs_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `bills` DROP FOREIGN KEY `bills_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `bills` DROP FOREIGN KEY `bills_reading_id_fkey`;

-- DropForeignKey
ALTER TABLE `bills` DROP FOREIGN KEY `bills_verified_by_fkey`;

-- DropForeignKey
ALTER TABLE `customer_documents` DROP FOREIGN KEY `customer_documents_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `customer_documents` DROP FOREIGN KEY `customer_documents_verified_by_fkey`;

-- DropForeignKey
ALTER TABLE `customers` DROP FOREIGN KEY `customers_branch_id_fkey`;

-- DropForeignKey
ALTER TABLE `customers` DROP FOREIGN KEY `customers_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `customers` DROP FOREIGN KEY `customers_demand_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `login_sessions` DROP FOREIGN KEY `login_sessions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `meter_readings` DROP FOREIGN KEY `meter_readings_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `meter_readings` DROP FOREIGN KEY `meter_readings_meter_reader_id_fkey`;

-- DropForeignKey
ALTER TABLE `payment_receipt` DROP FOREIGN KEY `payment_receipt_payment_id_fkey`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_bill_id_fkey`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_payment_method_id_fkey`;

-- DropForeignKey
ALTER TABLE `penalty_rules` DROP FOREIGN KEY `penalty_rules_demand_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `rebate_rules` DROP FOREIGN KEY `rebate_rules_demand_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `system_configuration` DROP FOREIGN KEY `system_configuration_updated_by_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_branch_id_fkey`;

-- DropTable
DROP TABLE `activity_logs`;

-- DropTable
DROP TABLE `bills`;

-- DropTable
DROP TABLE `branches`;

-- DropTable
DROP TABLE `customer_documents`;

-- DropTable
DROP TABLE `customers`;

-- DropTable
DROP TABLE `demand_types`;

-- DropTable
DROP TABLE `login_sessions`;

-- DropTable
DROP TABLE `meter_readings`;

-- DropTable
DROP TABLE `payment_receipt`;

-- DropTable
DROP TABLE `payments`;

-- DropTable
DROP TABLE `payments_method`;

-- DropTable
DROP TABLE `penalty_rules`;

-- DropTable
DROP TABLE `rebate_rules`;

-- DropTable
DROP TABLE `system_configuration`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `User` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userType` ENUM('Admin', 'BranchAdmin', 'MeterReader', 'Customer') NOT NULL DEFAULT 'Customer',
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
    `lastLogin` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Branch` (
    `branchID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `inchargeName` VARCHAR(191) NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',

    PRIMARY KEY (`branchID`)
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
    `demandType` VARCHAR(191) NOT NULL,
    `branchID` INTEGER NOT NULL,
    `citizenshipDoc` VARCHAR(191) NULL,
    `propertyDoc` VARCHAR(191) NULL,

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
    `status` ENUM('Generated', 'Verified', 'Paid', 'Overdue') NOT NULL DEFAULT 'Generated',

    PRIMARY KEY (`billNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `paymentID` INTEGER NOT NULL AUTO_INCREMENT,
    `billID` INTEGER NOT NULL,
    `method` ENUM('Khalti', 'Esewa', 'ConnectIPS', 'MobileBanking', 'Cash') NOT NULL,
    `amountPaid` DOUBLE NOT NULL,
    `rebate` DOUBLE NOT NULL DEFAULT 0,
    `penalty` DOUBLE NOT NULL DEFAULT 0,
    `paymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `transactionID` VARCHAR(191) NULL,

    UNIQUE INDEX `Payment_billID_key`(`billID`),
    PRIMARY KEY (`paymentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `empID` INTEGER NOT NULL AUTO_INCREMENT,
    `empType` ENUM('Admin', 'BranchAdmin', 'MeterReader', 'Accountant') NOT NULL,
    `branchID` INTEGER NOT NULL,
    `employeeName` VARCHAR(191) NOT NULL,
    `contactNo` VARCHAR(191) NOT NULL,
    `userID` INTEGER NOT NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',

    UNIQUE INDEX `Employee_userID_key`(`userID`),
    PRIMARY KEY (`empID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_branchID_fkey` FOREIGN KEY (`branchID`) REFERENCES `Branch`(`branchID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bill` ADD CONSTRAINT `Bill_cusID_fkey` FOREIGN KEY (`cusID`) REFERENCES `Customer`(`cusID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_billID_fkey` FOREIGN KEY (`billID`) REFERENCES `Bill`(`billNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_branchID_fkey` FOREIGN KEY (`branchID`) REFERENCES `Branch`(`branchID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
