-- ========================================================
-- Database Name: student_management
-- Project: Student Login and Management System (BCA Semester 3)
-- Description: Standard SQL script for MySQL / MariaDB (phpMyAdmin)
-- ========================================================

-- Create the database if it does not already exist
CREATE DATABASE IF NOT EXISTS `student_management`
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Select the database
USE `student_management`;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Note: Passwords are automatically hashed via PHP's password_hash() using BCRYPT.
-- No manual user insert required. New users can register via register.php.
