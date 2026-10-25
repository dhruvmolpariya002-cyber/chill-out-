<?php
/**
 * Database Configuration & Connection
 * Student Login and Management System - BCA Semester 3
 * 
 * Default local XAMPP configuration:
 * Host: localhost
 * User: root
 * Password: (blank by default in XAMPP)
 * Database: student_management
 */

// Database credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'student_management');
define('DB_PORT', '3306');

/**
 * Returns a shared PDO database connection instance.
 *
 * @return PDO
 */
function getDBConnection() {
    static $pdo = null;

    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            // Log full error for developer/system administrator
            error_log("Database connection error: " . $e->getMessage());

            // Display a clean, secure error message to users without exposing sensitive credentials
            die("Database connection failed. Please ensure MySQL is running in XAMPP and the database 'student_management' has been imported.");
        }
    }

    return $pdo;
}
