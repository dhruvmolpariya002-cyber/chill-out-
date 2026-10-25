<?php
/**
 * Student Profile Page (Protected)
 * Student Login and Management System - BCA Semester 3
 */

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';

// Enforce login
requireLogin();

// Fetch fresh details directly from MySQL for the authenticated session user
// (Notice: we use $_SESSION['user_id'] rather than a URL $_GET parameter to prevent unauthorized access)
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

<?php require_once __DIR__ . '/includes/footer.php'; ?>
