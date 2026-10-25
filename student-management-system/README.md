# Student Login and Management System

**Course:** Bachelor of Computer Applications (BCA) — Semester 3  
**Subject:** Web Technology / PHP & MySQL Practical  
**Database Name:** `student_management`  
**Development Environment:** XAMPP (Apache + MySQL / MariaDB)  

---

## 1. Project Overview

The **Student Login and Management System** is a small, practical, and secure web application created using core PHP and MySQL. It enables students to register an account, authenticate with encrypted password verification, access a restricted dashboard, inspect their database profile, and securely log out.

### Key Highlights
- **Prepared Statements (PDO):** Complete immunity against SQL Injection attacks.
- **Bcrypt Password Hashing:** Passwords are encrypted using PHP's native `password_hash()` and verified via `password_verify()`. Plain-text passwords are never stored.
- **Session Security:** Session IDs are regenerated upon authentication (`session_regenerate_id(true)`) to prevent session fixation.
- **CSRF Defense:** State-changing registration and login forms require cryptographic CSRF tokens.
- **Anti-Tampering Architecture:** Profile details are retrieved strictly via the verified session user ID, preventing URL ID tampering (`profile.php?id=...`).
- **Clean Academic Design:** Standards-compliant HTML5 and minimal CSS without third-party frameworks.

---

## 2. Project File Structure

```
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
```

---

## 3. Local Setup Guide (Using XAMPP)

Follow these exact steps to run the application on your computer:

### Step 1: Install and Launch XAMPP
1. Download and install **XAMPP** from [apachefriends.org](https://www.apachefriends.org/).
2. Open the **XAMPP Control Panel**.
3. Click the **Start** button next to **Apache**.
4. Click the **Start** button next to **MySQL**.
   *(Both modules should now have green indicators).*

### Step 2: Copy the Project into `htdocs`
1. Navigate to your XAMPP installation directory:
   - On Windows: `C:\xampp\htdocs\`
   - On macOS: `/Applications/XAMPP/xamppfiles/htdocs/`
   - On Linux: `/opt/lampp/htdocs/`
2. Place this `student-management-system` folder directly inside `htdocs`.
   The path should look like: `C:\xampp\htdocs\student-management-system\`

### Step 3: Import the Database via phpMyAdmin
1. Open your web browser and visit:  
   `http://localhost/phpmyadmin/`
2. Click on the **Import** tab in the top navigation bar.
3. Click **Choose File** (or "Browse") and select `database.sql` located inside `student-management-system/database.sql`.
4. Scroll to the bottom and click **Import** (or **Go**).
5. phpMyAdmin will execute the script, creating the database `student_management` and the `users` table automatically.

### Step 4: Verify Database Connection (`config/database.php`)
The default XAMPP settings in `config/database.php` are:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'student_management');
define('DB_PORT', '3306');
```
If your local MySQL root user has a password, update `DB_PASS` accordingly.

### Step 5: Run and Test the Application
1. In your browser, open:  
   `http://localhost/student-management-system/`
2. Click **Register here** or navigate to `register.php`.
3. Fill in your name, email address, and a password (minimum 6 characters), then submit.
4. You will be redirected to `index.php` with a success message.
5. Log in using your registered credentials.
6. Verify access to `dashboard.php` and `profile.php`.
7. Click **Log Out** and confirm that protected pages can no longer be accessed.

---

## 4. Online Public Hosting Guide (cPanel / Free PHP Hosts)

To host your project on the web (e.g. for college evaluation or Google Form submission):

### Step 1: Choose a Hosting Provider
Free or affordable PHP + MySQL hosting providers suitable for college submissions:
- **InfinityFree** (free PHP 8.2 + MariaDB + cPanel)
- **000webhost** (Hostinger free tier)
- **AwardSpace** or standard **cPanel Shared Hosting**

### Step 2: Create MySQL Database Online
1. In your hosting control panel (cPanel), open **MySQL Databases** or **MySQL Database Wizard**.
2. Create a new database (e.g., `epiz_12345678_student_management`).
3. Create a new MySQL user and set a strong password.
4. Add the user to the database and grant **ALL PRIVILEGES**. Note down:
   - MySQL Host (often `sqlXXX.infinityfree.com` or `localhost`)
   - MySQL Database Name
   - MySQL Username
   - MySQL Password

### Step 3: Import `database.sql` Online
1. In cPanel, click on **phpMyAdmin**.
2. Select your newly created online database from the left sidebar.
3. Click the **Import** tab.
4. Select `database.sql` and click **Go**.

### Step 4: Upload PHP Files
1. In cPanel, open **File Manager**.
2. Navigate to your public root folder: usually `public_html/` or `htdocs/`.
3. Upload all project files (`index.php`, `register.php`, `dashboard.php`, `profile.php`, `logout.php`, along with the `config/`, `includes/`, and `assets/` folders).

### Step 5: Update `config/database.php`
Open `config/database.php` inside File Manager Code Editor and replace with your host's credentials:
```php
define('DB_HOST', 'your_hosting_mysql_hostname');
define('DB_USER', 'your_hosting_db_username');
define('DB_PASS', 'your_hosting_db_password');
define('DB_NAME', 'your_hosting_database_name');
define('DB_PORT', '3306');
```
Save the file.

### Step 6: Test Public URL
1. Open your allocated domain/subdomain: e.g. `https://yourname.epizy.com/`
2. Test user registration, login, dashboard, and logout.
3. Copy your live URL for submission to your college Google Form.

---

## 5. College Viva Questions & Answers

**Q1: Why did you use PDO instead of MySQLi?**  
*Answer:* PDO (PHP Data Objects) provides a unified database abstraction layer with support for named parameters, strong exception handling (`ERRMODE_EXCEPTION`), and easy portability between MySQL, PostgreSQL, and SQLite without rewriting SQL queries.

**Q2: How does the system prevent SQL Injection?**  
*Answer:* All dynamic queries use PDO Prepared Statements (`$db->prepare()` and `$stmt->execute()`). Parameters are sent separately from the SQL command structure, ensuring malicious input is treated purely as data and never executed as code.

**Q3: How are passwords stored in the database?**  
*Answer:* We use PHP's native `password_hash($password, PASSWORD_DEFAULT)` which implements the standard bcrypt hashing algorithm with an automatically generated cryptographic salt. Verification is performed using `password_verify()`.

**Q4: What is CSRF and how is it mitigated here?**  
*Answer:* Cross-Site Request Forgery occurs when an attacker tricks an authenticated user's browser into submitting unauthorized requests. We generate a cryptographically random token (`bin2hex(random_bytes(32))`) stored in `$_SESSION['csrf_token']` and embed it in forms as a hidden field. The server validates this token using `hash_equals()` before processing any POST request.

**Q5: What happens during logout?**  
*Answer:* `logout.php` clears `$_SESSION = []`, expires the session cookie via `setcookie()`, calls `session_destroy()`, and redirects the visitor back to `index.php`.

---

## 6. Testing Verification Checklist

| Test Case | Expected Result | Status |
|-----------|-----------------|:------:|
| Direct access to `dashboard.php` without logging in | Redirected to `index.php` with warning | Passed |
| Registration with empty fields | Error message displayed; no DB record | Passed |
| Registration with invalid email format | Error message displayed; rejected | Passed |
| Registration with mismatched passwords | Error message displayed; rejected | Passed |
| Registration with existing email | "Email already registered" error displayed | Passed |
| Valid registration | User inserted; password stored as bcrypt hash | Passed |
| Login with invalid credentials | "Invalid email or password" displayed | Passed |
| Login with correct credentials | Session created; session ID regenerated; redirected to dashboard | Passed |
| Access `profile.php` as logged-in user | Verified student data loaded via session user ID | Passed |
| Attempting `profile.php?id=999` manipulation | Ignored; profile always loads session user data | Passed |
| Click Logout | Session destroyed; cookie cleared; access to dashboard blocked | Passed |
