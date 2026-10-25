<?php
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

<main class="container">
