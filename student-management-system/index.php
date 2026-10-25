<?php
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

<?php require_once __DIR__ . '/includes/footer.php'; ?>
