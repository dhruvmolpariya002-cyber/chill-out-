<?php
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

<?php require_once __DIR__ . '/includes/footer.php'; ?>
