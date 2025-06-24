-- CreateTable
CREATE TABLE `branches` (
    `branch_id` INTEGER NOT NULL AUTO_INCREMENT,
    `branch_name` VARCHAR(191) NOT NULL,
    `branch_address` VARCHAR(191) NOT NULL,
    `branch_contact` VARCHAR(191) NOT NULL,
    `branch_email` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`branch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `demand_types` (
    `demand_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `demand_type_code` VARCHAR(191) NOT NULL,
    `demand_description` VARCHAR(191) NOT NULL,
    `base_charge` DECIMAL(65, 30) NOT NULL,
    `rate_per_unit` DECIMAL(65, 30) NOT NULL,
    `minimum_service_charge` DECIMAL(65, 30) NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`demand_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `customer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_no` VARCHAR(191) NOT NULL,
    `sc_number` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `mobile_no` VARCHAR(191) NOT NULL,
    `citizenship_no` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `branch_id` INTEGER NOT NULL,
    `demand_type_id` INTEGER NOT NULL,
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `created_by` INTEGER NOT NULL,

    UNIQUE INDEX `customers_customer_no_key`(`customer_no`),
    UNIQUE INDEX `customers_sc_number_key`(`sc_number`),
    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penalty_rules` (
    `rule_id` INTEGER NOT NULL AUTO_INCREMENT,
    `demand_type_id` INTEGER NOT NULL,
    `overdue_days_from` INTEGER NOT NULL,
    `overdue_days_to` INTEGER NOT NULL,
    `penalty_percentage` DECIMAL(65, 30) NOT NULL,
    `penalty_fixed_amount` DECIMAL(65, 30) NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`rule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rebate_rules` (
    `rule_id` INTEGER NOT NULL AUTO_INCREMENT,
    `demand_type_id` INTEGER NOT NULL,
    `early_payment_days` INTEGER NOT NULL,
    `rebate_percentage` DECIMAL(65, 30) NOT NULL,
    `rebate_fixed_amount` DECIMAL(65, 30) NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`rule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_documents` (
    `document_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `document_type` VARCHAR(191) NOT NULL,
    `document_path` VARCHAR(191) NOT NULL,
    `uploaded_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `verified_status` VARCHAR(191) NOT NULL,
    `verification_date` DATETIME(3) NULL,
    `verified_by` INTEGER NOT NULL,

    PRIMARY KEY (`document_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile_no` VARCHAR(191) NOT NULL,
    `user_type` VARCHAR(191) NOT NULL,
    `branch_id` INTEGER NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_login` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_receipt` (
    `receipt_id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_id` INTEGER NOT NULL,
    `receipt_number` VARCHAR(191) NOT NULL,
    `receipt_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `generated_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `payment_receipt_receipt_number_key`(`receipt_number`),
    PRIMARY KEY (`receipt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meter_readings` (
    `reading_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `meter_reader_id` INTEGER NOT NULL,
    `reading_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `current_reading` DECIMAL(65, 30) NOT NULL,
    `previous_reading` DECIMAL(65, 30) NOT NULL,
    `unit_consumed` DECIMAL(65, 30) NOT NULL,
    `bill_month` DATETIME(3) NOT NULL,
    `bill_year` INTEGER NOT NULL,
    `reading_status` VARCHAR(191) NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`reading_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_logs` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `activity_type` VARCHAR(191) NOT NULL,
    `table_affected` VARCHAR(191) NOT NULL,
    `record_id` INTEGER NOT NULL,
    `old_value` VARCHAR(191) NULL,
    `new_value` VARCHAR(191) NULL,
    `ip_address` VARCHAR(191) NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `login_sessions` (
    `session_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `login_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `logout_time` DATETIME(3) NULL,
    `ip_address` VARCHAR(191) NOT NULL,
    `user_agent` VARCHAR(191) NOT NULL,
    `session_status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_configuration` (
    `config_id` INTEGER NOT NULL AUTO_INCREMENT,
    `config_key` VARCHAR(191) NOT NULL,
    `config_value` VARCHAR(191) NOT NULL,
    `config_description` VARCHAR(191) NULL,
    `updated_by_id` INTEGER NULL,
    `updated_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `system_configuration_config_key_key`(`config_key`),
    PRIMARY KEY (`config_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bills` (
    `bill_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `reading_id` INTEGER NULL,
    `bill_number` VARCHAR(191) NOT NULL,
    `bill_month` DATETIME(3) NOT NULL,
    `bill_year` INTEGER NOT NULL,
    `current_reading` DECIMAL(65, 30) NOT NULL,
    `previous_reading` DECIMAL(65, 30) NOT NULL,
    `unit_consumed` DECIMAL(65, 30) NOT NULL,
    `minimum_service_charge` DECIMAL(65, 30) NOT NULL,
    `unit_charge` DECIMAL(65, 30) NOT NULL,
    `total_amount` DECIMAL(65, 30) NOT NULL,
    `due_date` DATETIME(3) NOT NULL,
    `penalty_amount` DECIMAL(65, 30) NOT NULL,
    `rebate_amount` DECIMAL(65, 30) NOT NULL,
    `bill_status` VARCHAR(191) NOT NULL,
    `generated_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `verified_by` INTEGER NULL,
    `verified_date` DATETIME(3) NULL,

    UNIQUE INDEX `bills_bill_number_key`(`bill_number`),
    PRIMARY KEY (`bill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments_method` (
    `payment_method_id` INTEGER NOT NULL AUTO_INCREMENT,
    `method_name` VARCHAR(191) NOT NULL,
    `method_code` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `service_charge_percentage` DECIMAL(65, 30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `payments_method_method_name_key`(`method_name`),
    UNIQUE INDEX `payments_method_method_code_key`(`method_code`),
    PRIMARY KEY (`payment_method_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bill_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `payment_method_id` INTEGER NOT NULL,
    `payment_amount` DECIMAL(65, 30) NOT NULL,
    `payment_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `transaction_id` VARCHAR(191) NOT NULL,
    `payment_status` VARCHAR(191) NOT NULL,
    `receipt_number` VARCHAR(191) NOT NULL,
    `service_charge` DECIMAL(65, 30) NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `payments_transaction_id_key`(`transaction_id`),
    UNIQUE INDEX `payments_receipt_number_key`(`receipt_number`),
    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branches`(`branch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_demand_type_id_fkey` FOREIGN KEY (`demand_type_id`) REFERENCES `demand_types`(`demand_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penalty_rules` ADD CONSTRAINT `penalty_rules_demand_type_id_fkey` FOREIGN KEY (`demand_type_id`) REFERENCES `demand_types`(`demand_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rebate_rules` ADD CONSTRAINT `rebate_rules_demand_type_id_fkey` FOREIGN KEY (`demand_type_id`) REFERENCES `demand_types`(`demand_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_documents` ADD CONSTRAINT `customer_documents_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_documents` ADD CONSTRAINT `customer_documents_verified_by_fkey` FOREIGN KEY (`verified_by`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branches`(`branch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_receipt` ADD CONSTRAINT `payment_receipt_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `payments`(`payment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meter_readings` ADD CONSTRAINT `meter_readings_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meter_readings` ADD CONSTRAINT `meter_readings_meter_reader_id_fkey` FOREIGN KEY (`meter_reader_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity_logs` ADD CONSTRAINT `activity_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `login_sessions` ADD CONSTRAINT `login_sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_configuration` ADD CONSTRAINT `system_configuration_updated_by_id_fkey` FOREIGN KEY (`updated_by_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bills` ADD CONSTRAINT `bills_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bills` ADD CONSTRAINT `bills_reading_id_fkey` FOREIGN KEY (`reading_id`) REFERENCES `meter_readings`(`reading_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bills` ADD CONSTRAINT `bills_verified_by_fkey` FOREIGN KEY (`verified_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_bill_id_fkey` FOREIGN KEY (`bill_id`) REFERENCES `bills`(`bill_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_payment_method_id_fkey` FOREIGN KEY (`payment_method_id`) REFERENCES `payments_method`(`payment_method_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
