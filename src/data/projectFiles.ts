export interface ProjectFile {
  name: string;
  path: string;
  type: 'php' | 'sql' | 'css' | 'markdown';
  description: string;
  content: string;
}

export const PROJECT_FILES: ProjectFile[] = [
  {
    name: 'database.sql',
    path: 'database.sql',
    type: 'sql',
    description: 'MySQL database and table structure importable in phpMyAdmin',
    content: `-- ========================================================
-- Database Name: student_management
-- Project: Student Login and Management System (BCA Semester 3)
-- Description: Standard SQL script for MySQL / MariaDB (phpMyAdmin)
-- ========================================================

-- Create the database if it does not already exist
CREATE DATABASE IF NOT EXISTS \`student_management\`
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Select the database
USE \`student_management\`;

-- --------------------------------------------------------
-- Table structure for table \`users\`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL UNIQUE,
  \`password\` VARCHAR(255) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Note: Passwords are automatically hashed via PHP's password_hash() using BCRYPT.
-- No manual user insert required. New users can register via register.php.`
  },
  {
    name: 'database.php',
    path: 'config/database.php',
    type: 'php',
    description: 'Reusable PDO database connection with secure error handling',
    content: `<?php
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
}`
  },
  {
    name: 'csrf.php',
    path: 'includes/csrf.php',
    type: 'php',
    description: 'Session-based CSRF protection helper and token validator',
    content: `<?php
/**
 * CSRF Protection Utility
 * Student Login and Management System - BCA Semester 3
 */

// Ensure session is started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Generate or retrieve the current session's CSRF token.
 *
 * @return string
 */
function generateCsrfToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify if the submitted token matches the session token.
 *
 * @param string|null $token
 * @return bool
 */
function verifyCsrfToken($token) {
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Output a hidden HTML input field containing the CSRF token.
 */
function csrfField() {
    $token = generateCsrfToken();
    echo '<input type="hidden" name="csrf_token" value="' . htmlspecialchars($token, ENT_QUOTES, 'UTF-8') . '">';
}`
  },
  {
    name: 'auth.php',
    path: 'includes/auth.php',
    type: 'php',
    description: 'Session authentication verification and page access control',
    content: `<?php
/**
 * Authentication and Session Gatekeeper
 * Student Login and Management System - BCA Semester 3
 */

// Start session with secure standard settings if not already started
if (session_status() === PHP_SESSION_NONE) {
    $cookieParams = [
        'lifetime' => 0,
        'path'     => '/',
        'domain'   => '',
        'secure'   => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on',
        'httponly' => true,
        'samesite' => 'Lax'
    ];
    session_set_cookie_params($cookieParams);
    session_start();
}

/**
 * Check if a user is currently logged in.
 *
 * @return bool
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

/**
 * Enforce that the user must be logged in.
 * If not authenticated, redirects to the login page (index.php).
 */
function requireLogin() {
    if (!isLoggedIn()) {
        $_SESSION['flash_error'] = "Please log in to access this page.";
        header("Location: index.php");
        exit();
    }
}

/**
 * Enforce that the visitor is a guest (not logged in).
 * If already logged in, redirects to dashboard.php.
 */
function requireGuest() {
    if (isLoggedIn()) {
        header("Location: dashboard.php");
        exit();
    }
}

/**
 * Get current logged in user basic data from session.
 *
 * @return array|null
 */
function getCurrentUser() {
    if (!isLoggedIn()) {
        return null;
    }
    return [
        'id'    => $_SESSION['user_id'],
        'name'  => $_SESSION['user_name'] ?? '',
        'email' => $_SESSION['user_email'] ?? ''
    ];
}`
  },
  {
    name: 'header.php',
    path: 'includes/header.php',
    type: 'php',
    description: 'Semantic HTML5 header and navigation bar',
    content: `<?php
/**
 * Header Template
 * Student Login and Management System - BCA Semester 3
 */

if (!isset($pageTitle)) {
    $pageTitle = "Student Management System";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?> - Student System</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<header>
  <div class="header-inner">
    <h1><a href="<?php echo isLoggedIn() ? 'dashboard.php' : 'index.php'; ?>">Student Management System</a></h1>
    <nav>
      <?php if (isLoggedIn()): ?>
        <a href="dashboard.php">Dashboard</a>
        <a href="profile.php">Profile</a>
        <a href="logout.php">Logout</a>
      <?php else: ?>
        <a href="index.php">Login</a>
        <a href="register.php">Register</a>
      <?php endif; ?>
    </nav>
  </div>
</header>

<main class="container">`
  },
  {
    name: 'footer.php',
    path: 'includes/footer.php',
    type: 'php',
    description: 'HTML5 closing structure and academic copyright footer',
    content: `<?php
/**
 * Footer Template
 * Student Login and Management System - BCA Semester 3
 */
?>
</main>

<footer>
  <div class="container">
    <p>&copy; <?php echo date('Y'); ?> Student Login and Management System | BCA Practical Project</p>
  </div>
</footer>

</body>
</html>`
  },
  {
    name: 'style.css',
    path: 'assets/css/style.css',
    type: 'css',
    description: 'Standard college project CSS styling (white background, blue buttons, minimal)',
    content: `/*
 * Student Login and Management System
 * BCA Semester 3 Practical Project
 * Clean, minimal, standard college styling
 */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: #333333;
  background-color: #ffffff;
}

/* Container */
.container {
  width: 90%;
  max-width: 960px;
  margin: 0 auto;
  padding: 20px 0;
}

/* Header & Navigation */
header {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 15px 0;
}

header .header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 960px;
  margin: 0 auto;
}

header h1 {
  font-size: 20px;
  color: #222222;
  font-weight: bold;
}

header h1 a {
  color: inherit;
  text-decoration: none;
}

nav a {
  color: #0056b3;
  text-decoration: none;
  margin-left: 15px;
  font-size: 14px;
}

nav a:hover {
  text-decoration: underline;
}

/* Auth Card / Form Container */
.card {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 24px;
  margin: 30px auto;
  max-width: 450px;
}

.card-wide {
  max-width: 800px;
}

.card h2 {
  font-size: 18px;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eeeeee;
  color: #222222;
}

/* Form Styles */
.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 14px;
  color: #444444;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  font-family: inherit;
  border: 1px solid #cccccc;
  border-radius: 3px;
  background-color: #ffffff;
}

.form-control:focus {
  border-color: #0056b3;
  outline: none;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 9px 18px;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  text-decoration: none;
  border: 1px solid #0056b3;
  border-radius: 3px;
  background-color: #0056b3;
  color: #ffffff;
  cursor: pointer;
  font-family: inherit;
}

.btn:hover {
  background-color: #004494;
  border-color: #004494;
}

.btn-block {
  display: block;
  width: 100%;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: #ffffff;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.btn-danger {
  background-color: #c82333;
  border-color: #bd2130;
}

.btn-danger:hover {
  background-color: #bd2130;
  border-color: #b21f2d;
}

/* Alerts */
.alert {
  padding: 12px 15px;
  margin-bottom: 18px;
  border-radius: 3px;
  font-size: 14px;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

/* Details Table for Profile & Dashboard */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid #dddddd;
  font-size: 14px;
}

.table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333333;
  width: 35%;
}

/* Links & Help text */
.form-footer-link {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
}

.form-footer-link a {
  color: #0056b3;
  text-decoration: none;
}

.form-footer-link a:hover {
  text-decoration: underline;
}

/* Footer */
footer {
  margin-top: 50px;
  border-top: 1px solid #e0e0e0;
  padding: 20px 0;
  text-align: center;
  font-size: 13px;
  color: #666666;
}

/* Responsive */
@media (max-width: 600px) {
  header .header-inner {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  nav a {
    margin: 0 8px;
  }
  .card {
    width: 95%;
    padding: 16px;
  }
}`
  },
  {
    name: 'index.php',
    path: 'index.php',
    type: 'php',
    description: 'Student login portal with password_verify and session regeneration',
    content: `<?php
/**
 * Student Login Page (Index / Entry Point)
 * Student Login and Management System - BCA Semester 3
 */

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/csrf.php';

// Redirect to dashboard if student is already logged in
requireGuest();

$errorMessage = "";
$successMessage = "";
$email = "";

// Check for flash messages in session
if (!empty($_SESSION['flash_success'])) {
    $successMessage = $_SESSION['flash_success'];
    unset($_SESSION['flash_success']);
}

if (!empty($_SESSION['flash_error'])) {
    $errorMessage = $_SESSION['flash_error'];
    unset($_SESSION['flash_error']);
}

// Handle Login Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submittedToken = $_POST['csrf_token'] ?? '';

    // Verify CSRF Token
    if (!verifyCsrfToken($submittedToken)) {
        $errorMessage = "Security verification failed (Invalid CSRF token). Please try again.";
    } else {
        $email    = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';

        if (empty($email) || empty($password)) {
            $errorMessage = "Please enter both your email address and password.";
        } else {
            // Find student in MySQL using prepared statement
            $db = getDBConnection();
            $stmt = $db->prepare("SELECT id, name, email, password FROM users WHERE email = :email LIMIT 1");
            $stmt->execute([':email' => $email]);
            $user = $stmt->fetch();

            // Verify credentials (generic message to avoid email enumeration)
            if ($user && password_verify($password, $user['password'])) {
                // Regenerate session ID to prevent session fixation attacks
                session_regenerate_id(true);

                // Store user details in session
                $_SESSION['user_id']    = $user['id'];
                $_SESSION['user_name']  = $user['name'];
                $_SESSION['user_email'] = $user['email'];

                // Redirect to protected student dashboard
                header("Location: dashboard.php");
                exit();
            } else {
                $errorMessage = "Invalid email or password.";
            }
        }
    }
}

$pageTitle = "Student Login";
require_once __DIR__ . '/includes/header.php';
?>

<div class="card">
  <h2>Student Login</h2>

  <?php if (!empty($successMessage)): ?>
    <div class="alert alert-success">
      <?php echo htmlspecialchars($successMessage, ENT_QUOTES, 'UTF-8'); ?>
    </div>
  <?php endif; ?>

  <?php if (!empty($errorMessage)): ?>
    <div class="alert alert-danger">
      <?php echo htmlspecialchars($errorMessage, ENT_QUOTES, 'UTF-8'); ?>
    </div>
  <?php endif; ?>

  <form action="index.php" method="POST" autocomplete="off">
    <?php csrfField(); ?>

    <div class="form-group">
      <label for="email">Email Address</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        class="form-control" 
        placeholder="Enter registered email" 
        value="<?php echo htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); ?>" 
        required
      >
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        class="form-control" 
        placeholder="Enter password" 
        required
      >
    </div>

    <button type="submit" class="btn btn-block">Log In</button>
  </form>

  <div class="form-footer-link">
    Don't have an account yet? <a href="register.php">Register here</a>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>`
  },
  {
    name: 'register.php',
    path: 'register.php',
    type: 'php',
    description: 'Registration form with input validation, duplicate check, and password hashing',
    content: `<?php
/**
 * Student Registration Page
 * Student Login and Management System - BCA Semester 3
 */

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/csrf.php';

// Redirect to dashboard if student is already logged in
requireGuest();

$errorMessage = "";
$name = "";
$email = "";

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submittedToken = $_POST['csrf_token'] ?? '';

    // Validate CSRF token
    if (!verifyCsrfToken($submittedToken)) {
        $errorMessage = "Security verification failed (Invalid CSRF token). Please try again.";
    } else {
        // Collect and sanitize inputs
        $name            = trim($_POST['name'] ?? '');
        $email           = trim($_POST['email'] ?? '');
        $password        = $_POST['password'] ?? '';
        $confirmPassword = $_POST['confirm_password'] ?? '';

        // Validation checks
        if (empty($name) || empty($email) || empty($password) || empty($confirmPassword)) {
            $errorMessage = "All fields are required. Please fill in all inputs.";
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errorMessage = "Invalid email format. Please enter a valid email address.";
        } elseif (strlen($password) < 6) {
            $errorMessage = "Password must be at least 6 characters long.";
        } elseif ($password !== $confirmPassword) {
            $errorMessage = "Passwords do not match. Please verify your password.";
        } else {
            // Check if email already exists in database
            $db = getDBConnection();
            $checkStmt = $db->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
            $checkStmt->execute([':email' => $email]);

            if ($checkStmt->fetch()) {
                $errorMessage = "This email is already registered. Please log in or use another email.";
            } else {
                // Hash password securely using standard bcrypt
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                // Insert student into users table using prepared statements
                $insertStmt = $db->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");
                $inserted = $insertStmt->execute([
                    ':name'     => $name,
                    ':email'    => $email,
                    ':password' => $hashedPassword
                ]);

                if ($inserted) {
                    $_SESSION['flash_success'] = "Registration successful! You can now log in.";
                    header("Location: index.php");
                    exit();
                } else {
                    $errorMessage = "Something went wrong while creating your account. Please try again.";
                }
            }
        }
    }
}

$pageTitle = "Student Registration";
require_once __DIR__ . '/includes/header.php';
?>

<div class="card">
  <h2>Student Registration</h2>

  <?php if (!empty($errorMessage)): ?>
    <div class="alert alert-danger">
      <?php echo htmlspecialchars($errorMessage, ENT_QUOTES, 'UTF-8'); ?>
    </div>
  <?php endif; ?>

  <form action="register.php" method="POST" autocomplete="off">
    <?php csrfField(); ?>

    <div class="form-group">
      <label for="name">Full Name</label>
      <input 
        type="text" 
        id="name" 
        name="name" 
        class="form-control" 
        placeholder="Enter your full name" 
        value="<?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); ?>" 
        required
      >
    </div>

    <div class="form-group">
      <label for="email">Email Address</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        class="form-control" 
        placeholder="e.g. student@college.edu" 
        value="<?php echo htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); ?>" 
        required
      >
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        class="form-control" 
        placeholder="Minimum 6 characters" 
        required
      >
    </div>

    <div class="form-group">
      <label for="confirm_password">Confirm Password</label>
      <input 
        type="password" 
        id="confirm_password" 
        name="confirm_password" 
        class="form-control" 
        placeholder="Re-enter password" 
        required
      >
    </div>

    <button type="submit" class="btn btn-block">Register</button>
  </form>

  <div class="form-footer-link">
    Already have an account? <a href="index.php">Log In here</a>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>`
  },
  {
    name: 'dashboard.php',
    path: 'dashboard.php',
    type: 'php',
    description: 'Protected student portal welcome screen with active session info',
    content: `<?php
/**
 * Student Dashboard (Protected Portal)
 * Student Login and Management System - BCA Semester 3
 */

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';

// Protect this page: unauthenticated visitors are redirected to index.php
requireLogin();

$currentUser = getCurrentUser();

$pageTitle = "Student Dashboard";
require_once __DIR__ . '/includes/header.php';
?>

<div class="card card-wide">
  <h2>Welcome to Your Student Portal</h2>

  <p style="margin-bottom: 20px;">
    Hello, <strong><?php echo htmlspecialchars($currentUser['name'], ENT_QUOTES, 'UTF-8'); ?></strong>! You are securely logged in to the Student Management System.
  </p>

  <table class="table">
    <tbody>
      <tr>
        <th>Account ID</th>
        <td>#<?php echo htmlspecialchars((string)$currentUser['id'], ENT_QUOTES, 'UTF-8'); ?></td>
      </tr>
      <tr>
        <th>Student Name</th>
        <td><?php echo htmlspecialchars($currentUser['name'], ENT_QUOTES, 'UTF-8'); ?></td>
      </tr>
      <tr>
        <th>Registered Email</th>
        <td><?php echo htmlspecialchars($currentUser['email'], ENT_QUOTES, 'UTF-8'); ?></td>
      </tr>
      <tr>
        <th>Account Status</th>
        <td><span style="color: #28a745; font-weight: bold;">Active</span></td>
      </tr>
    </tbody>
  </table>

  <div style="margin-top: 25px; display: flex; gap: 10px; flex-wrap: wrap;">
    <a href="profile.php" class="btn">View Full Profile</a>
    <a href="logout.php" class="btn btn-secondary">Log Out</a>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>`
  },
  {
    name: 'profile.php',
    path: 'profile.php',
    type: 'php',
    description: 'Protected profile view pulling student records from MySQL via session ID',
    content: `<?php
/**
 * Student Profile Page (Protected)
 * Student Login and Management System - BCA Semester 3
 */

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';

// Enforce login
requireLogin();

// Fetch fresh details directly from MySQL for the authenticated session user
$db = getDBConnection();
$stmt = $db->prepare("SELECT id, name, email, created_at FROM users WHERE id = :id LIMIT 1");
$stmt->execute([':id' => $_SESSION['user_id']]);
$student = $stmt->fetch();

// In case the user record was removed
if (!$student) {
    session_destroy();
    header("Location: index.php");
    exit();
}

$pageTitle = "Student Profile";
require_once __DIR__ . '/includes/header.php';
?>

<div class="card card-wide">
  <h2>Student Profile Details</h2>

  <p style="margin-bottom: 20px; color: #555555;">
    Below are your official student registration records retrieved from the MySQL database.
  </p>

  <table class="table">
    <tbody>
      <tr>
        <th>Student Database ID</th>
        <td>#<?php echo htmlspecialchars((string)$student['id'], ENT_QUOTES, 'UTF-8'); ?></td>
      </tr>
      <tr>
        <th>Full Name</th>
        <td><?php echo htmlspecialchars($student['name'], ENT_QUOTES, 'UTF-8'); ?></td>
      </tr>
      <tr>
        <th>Email Address</th>
        <td><?php echo htmlspecialchars($student['email'], ENT_QUOTES, 'UTF-8'); ?></td>
      </tr>
      <tr>
        <th>Registration Date</th>
        <td><?php echo htmlspecialchars($student['created_at'], ENT_QUOTES, 'UTF-8'); ?></td>
      </tr>
    </tbody>
  </table>

  <div style="margin-top: 25px; display: flex; gap: 10px; flex-wrap: wrap;">
    <a href="dashboard.php" class="btn">Back to Dashboard</a>
    <a href="logout.php" class="btn btn-secondary">Log Out</a>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>`
  },
  {
    name: 'logout.php',
    path: 'logout.php',
    type: 'php',
    description: 'Secure session destruction, cookie expiration, and redirect',
    content: `<?php
/**
 * Logout Handler
 * Student Login and Management System - BCA Semester 3
 */

// Initialize the session
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// 1. Unset all session variables
$_SESSION = [];

// 2. Clear the session cookie from the browser
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// 3. Destroy the server-side session
session_destroy();

// 4. Start a fresh temporary session to send a friendly feedback flash message
session_start();
$_SESSION['flash_success'] = "You have been successfully logged out.";

// 5. Redirect back to login page
header("Location: index.php");
exit();`
  },
  {
    name: 'README.md',
    path: 'README.md',
    type: 'markdown',
    description: 'Complete project documentation, XAMPP setup, and viva prep',
    content: `# Student Login and Management System

**Course:** Bachelor of Computer Applications (BCA) — Semester 3  
**Subject:** Web Technology / PHP & MySQL Practical  
**Database Name:** \`student_management\`  
**Development Environment:** XAMPP (Apache + MySQL / MariaDB)  

---

## 1. Project Overview

The **Student Login and Management System** is a practical and secure web application created using core PHP and MySQL. It enables students to register an account, authenticate with encrypted password verification, access a restricted dashboard, inspect their database profile, and securely log out.

### Key Highlights
- **Prepared Statements (PDO):** Complete immunity against SQL Injection attacks.
- **Bcrypt Password Hashing:** Passwords are encrypted using PHP's native \`password_hash()\` and verified via \`password_verify()\`. Plain-text passwords are never stored.
- **Session Security:** Session IDs are regenerated upon authentication (\`session_regenerate_id(true)\`) to prevent session fixation.
- **CSRF Defense:** State-changing registration and login forms require cryptographic CSRF tokens.
- **Anti-Tampering Architecture:** Profile details are retrieved strictly via the verified session user ID, preventing URL ID tampering (\`profile.php?id=...\`).
- **Clean Academic Design:** Standards-compliant HTML5 and minimal CSS without third-party frameworks.

---

## 2. Project File Structure

\`\`\`
student-management-system/
│
├── index.php             # Login page (entry point)
├── register.php          # Student registration page
├── dashboard.php         # Protected student dashboard
├── profile.php           # Protected profile view
├── logout.php            # Secure logout and session teardown
├── config/
│   └── database.php      # Reusable PDO database connection
├── includes/
│   ├── auth.php          # Session checking and authentication gate
│   ├── csrf.php          # CSRF token generation and validation
│   ├── header.php        # Common HTML head and navigation bar
│   └── footer.php        # Common HTML closing and copyright footer
├── assets/
│   └── css/
│       └── style.css     # Clean academic CSS styling
├── database.sql          # MySQL database and table creation script
└── README.md             # Complete documentation and setup manual
\`\`\`

---

## 3. Local Setup Guide (Using XAMPP)

Follow these exact steps to run the application on your computer:

### Step 1: Install and Launch XAMPP
1. Download and install **XAMPP** from https://www.apachefriends.org/
2. Open the **XAMPP Control Panel**.
3. Click the **Start** button next to **Apache**.
4. Click the **Start** button next to **MySQL**.

### Step 2: Copy the Project into \`htdocs\`
1. Copy the \`student-management-system\` folder into:
   - Windows: \`C:\\xampp\\htdocs\\student-management-system\\\`
   - Mac: \`/Applications/XAMPP/xamppfiles/htdocs/student-management-system/\`
   - Linux: \`/opt/lampp/htdocs/student-management-system/\`

### Step 3: Import the Database via phpMyAdmin
1. In your browser, open \`http://localhost/phpmyadmin/\`
2. Click the **Import** tab.
3. Select \`database.sql\` and click **Import**.

### Step 4: Run the Application
1. In your browser, visit: \`http://localhost/student-management-system/\`
2. Register a new account and test Login, Dashboard, Profile, and Logout.`
  }
];
