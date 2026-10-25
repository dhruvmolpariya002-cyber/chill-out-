<?php
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
exit();
