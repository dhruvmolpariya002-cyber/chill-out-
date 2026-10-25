<?php
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

<?php require_once __DIR__ . '/includes/footer.php'; ?>
