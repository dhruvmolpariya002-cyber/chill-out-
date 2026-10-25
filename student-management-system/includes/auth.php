<?php
/**
 * Authentication and Session Gatekeeper
 * Student Login and Management System - BCA Semester 3
 */

// Start session with secure standard settings if not already started
if (session_status() === PHP_SESSION_NONE) {
    // Basic session cookie security flags
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
}
