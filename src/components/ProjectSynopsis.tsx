import React, { useState } from 'react';
import { Copy, Check, Printer } from 'lucide-react';

export const ProjectSynopsis: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const synopsisText = `COLLEGE PRACTICAL PROJECT REPORT / SYNOPSIS
Course: Bachelor of Computer Applications (BCA)
Semester: Semester 3
Subject: Web Technology Lab (PHP & MySQL)
Project Title: Student Login and Management System

1. INTRODUCTION:
The "Student Login and Management System" is a dynamic web application engineered using PHP 8.2 and MySQL / MariaDB. The primary objective is to demonstrate fundamental and secure web application development concepts, including relational database modeling, server-side form validation, cryptographic password hashing, user session lifecycle control, and protection against common web vulnerabilities (SQL Injection, CSRF, and Session Fixation).

2. OBJECTIVES OF THE SYSTEM:
- Provide an intuitive student self-registration module with server-side validation.
- Store sensitive student authentication credentials securely using Bcrypt one-way hashing.
- Verify user credentials and initialize stateful authenticated sessions upon login.
- Provide a restricted dashboard and profile page accessible strictly by verified users.
- Provide a clean and secure session teardown (logout) mechanism.

3. HARDWARE & SOFTWARE REQUIREMENTS:
- Operating System: Windows 10/11, macOS, or Linux
- Web Server: Apache 2.4 (via XAMPP)
- Database Server: MySQL 8.0 / MariaDB 10.4
- Server-Side Language: PHP 7.4 / 8.0 / 8.2
- Client-Side Technologies: HTML5, CSS3, Minimal JavaScript
- Database Administration Tool: phpMyAdmin

4. DATABASE DESIGN:
- Database Name: student_management
- Table Name: users
- Fields:
  * id (INT, AUTO_INCREMENT, PRIMARY KEY)
  * name (VARCHAR(100), NOT NULL)
  * email (VARCHAR(150), UNIQUE, NOT NULL)
  * password (VARCHAR(255), NOT NULL - BCRYPT HASH)
  * created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

5. SECURITY MEASURES IMPLEMENTED:
- Prepared Statements (PDO) for all dynamic SQL operations.
- password_hash() and password_verify() to eliminate plaintext credentials.
- session_regenerate_id(true) on login to thwart session fixation.
- Cryptographic CSRF tokens embedded in all forms.
- htmlspecialchars() output encoding to prevent XSS.

6. CONCLUSION:
The system satisfies all syllabus criteria for BCA Semester 3 practicals, presenting clean, maintainable, and standards-compliant code suitable for academic viva voce and public web deployment.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(synopsisText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            College Academic Synopsis & Project Report
          </h3>
          <p className="text-xs text-slate-500">
            Standard format ready for your BCA Semester 3 practical record book and laboratory file submission.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Text</span>
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-900 rounded transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Synopsis</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto">
        {synopsisText}
      </div>
    </div>
  );
};
