# Student Login and Management System (BCA Semester 3)

A complete, practical, and maintainable PHP and MySQL web application built specifically for a BCA Semester 3 college practical examination. It provides authentication, session security, a protected student dashboard, profile viewing, and database exports matching standard XAMPP and public hosting requirements.

> [!IMPORTANT]
> **Confirmed User Decisions & Practical Blueprint**
> - **Interactive Portal & ZIP Export**: The application provides an interactive, live simulation of the student portal inside the workspace preview while simultaneously bundling and exporting the 100% genuine standalone PHP/MySQL project files into a one-click downloadable ZIP package.
> - **Schema & Field Scope**: Strictly follows the minimal syllabus requirements with `id`, `name`, `email`, `password` (bcrypt hash), and `created_at`.
> - **Database Connection**: Configured for standard local XAMPP (`localhost`, `root`, blank password, database `student_management`) using robust PHP Data Objects (PDO) with prepared statements to guarantee portability to online cPanel/Apache/MySQL hosts.

---

### 1. Overview & Core Concept
- **What It Does**: Provides a functional student portal where students can register with validation, log in securely with hashed credentials, view their protected dashboard and profile, and log out with secure session destruction.
- **Target Audience / Persona**: BCA Semester 3 student facing an external examiner or practical evaluator, needing clean, human-written, easy-to-explain code with no confusing framework bloat.
- **Key Value**: 100% compliant with university practical rubrics: prepared statements against SQL injection, CSRF protection on forms, secure session handling with ID regeneration, and a clean white-and-blue academic styling.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Registration Flow (`register.php`)**:
   - Clean form accepting Full Name, Email, Password, and Confirm Password.
   - Client and server-side validation for email syntax, field completion, and password match.
   - Database check preventing duplicate email registrations.
   - Secure hashing (`PASSWORD_BCRYPT`) followed by prepared insert and redirect to login with a confirmation banner.
2. **Authentication Flow (`index.php`)**:
   - Compact login form with CSRF token.
   - Generic error signaling ("Invalid email or password") to prevent user enumeration.
   - Session initiation, `session_regenerate_id(true)`, and redirection to `dashboard.php`.
3. **Protected Student Dashboard (`dashboard.php`)**:
   - Authentication gate (`includes/auth.php`) redirecting unauthenticated visitors to `index.php`.
   - Welcome banner displaying student's full name, registered email address, and account status.
   - Navigation bar with Dashboard, Profile, and Logout.
4. **Student Profile (`profile.php`)**:
   - Displays student record (`id`, `name`, `email`, `created_at`) queried directly from MySQL via the session user ID, preventing parameter tampering.
5. **Session Destruction (`logout.php`)**:
   - Unsets `$_SESSION`, destroys the cookie, calls `session_destroy()`, and redirects to `index.php`.

#### Visual Identity & College Styling
- **Aesthetic Direction**: Traditional, clean academic website aesthetic. Crisp white background (`#FFFFFF`), neutral light slate surfaces (`#F8FAFC`), 1px light gray borders (`#E2E8F0`), and classic collegiate royal blue buttons (`#1D4ED8` / hover `#1E40AF`).
- **Typography & Hierarchy**: System font stack (`Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`) with readable 15px body copy, standard form labels, and bold 24px headings.
- **Layout Math & Viewport**: Focused, centered card container (`max-w-md` for auth, `max-w-4xl` for portal views) with responsive padding and mobile-friendly touch targets.

---

### 3. Key Product Decisions & Trade-Offs

- **PDO with Prepared Statements over raw MySQLi**:
  - *Chosen Approach*: PDO with parameterized SQL (`prepare()` and `execute()`).
  - *Why*: Unified error handling (`PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION`), cleaner syntax for students to explain in vivas, and effortless migration to remote MySQL hosts.
- **Dual-Layer Delivery (Interactive Preview + Full Standalone PHP Package)**:
  - *Chosen Approach*: Deliver both the complete, pristine PHP codebase (`student-management-system/` with all 11 required files, `.sql`, and `.md` guides) ready for XAMPP `htdocs` or live cPanel, plus a live interactive simulator in the web preview so examiners and users can test the system directly in the browser.
  - *Why*: Solves browser sandbox limitations while providing the student with instant working files and a live demonstration tool.
- **CSRF Tokens on All Forms**:
  - *Chosen Approach*: Reusable session-based CSRF utility in `includes/csrf.php` providing hidden form inputs and verification on all POST actions.
  - *Why*: Meets high academic security standards without requiring third-party libraries.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                 College Project Structure                   │
│                                                             │
│  student-management-system/                                 │
│  ├── index.php             (Login endpoint & view)          │
│  ├── register.php          (Student sign-up & validation)   │
│  ├── dashboard.php         (Protected main student portal)  │
│  ├── profile.php           (Protected profile details view) │
│  ├── logout.php            (Secure session teardown)        │
│  ├── config/                                                │
│  │   └── database.php      (PDO MySQL connection)           │
│  ├── includes/                                              │
│  │   ├── auth.php          (Session check & gatekeeper)     │
│  │   ├── csrf.php          (Token generator & validator)    │
│  │   ├── header.php        (HTML boilerplate & navigation)  │
│  │   └── footer.php        (Closing tags & copyright)       │
│  ├── assets/css/                                            │
│  │   └── style.css         (Minimal clean college CSS)      │
│  ├── database.sql          (Schema & table creation DDL)    │
│  └── README.md             (XAMPP & cPanel setup guide)     │
└─────────────────────────────────────────────────────────────┘
```

#### Database Schema (`database.sql`)
```sql
CREATE DATABASE IF NOT EXISTS `student_management` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `student_management`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Comprehensive Deliverables
1. **Complete Standalone PHP/MySQL File Tree**: Generated in `student-management-system/` ready for `xampp/htdocs/`.
2. **Interactive Student Management Web App**: A live interactive preview reproducing the exact HTML/CSS design, auth session state, validation, and table inspector.
3. **One-Click Download**: Integrated ZIP exporter letting the student download the complete project folder with a single click.
4. **Documentation**: Detailed XAMPP step-by-step instructions, phpMyAdmin import guide, cPanel deployment steps, viva questions and answers, and testing checklist.
