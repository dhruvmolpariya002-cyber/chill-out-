import React, { useState } from 'react';
import { Server, Globe, HelpCircle, CheckSquare, Terminal, ExternalLink, ArrowRight } from 'lucide-react';

export const SetupGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'xampp' | 'hosting' | 'viva' | 'checklist'>('xampp');

  return (
    <div className="space-y-4">
      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSection('xampp')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeSection === 'xampp'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>Local XAMPP Setup</span>
        </button>

        <button
          onClick={() => setActiveSection('hosting')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeSection === 'hosting'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Public Online Hosting (cPanel / InfinityFree)</span>
        </button>

        <button
          onClick={() => setActiveSection('viva')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeSection === 'viva'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>BCA Viva Questions & Answers</span>
        </button>

        <button
          onClick={() => setActiveSection('checklist')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeSection === 'checklist'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Testing & Evaluation Checklist</span>
        </button>
      </div>

      {/* SECTION 1: LOCAL XAMPP */}
      {activeSection === 'xampp' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5 text-sm text-slate-700 leading-relaxed">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Step-by-Step Local Setup on XAMPP
            </h3>
            <p className="text-xs text-slate-500">
              Run this website locally on Windows, macOS, or Linux using Apache and MySQL.
            </p>
          </div>

          <ol className="space-y-4 list-decimal list-inside">
            <li className="pl-1">
              <strong className="text-slate-900">Download and Install XAMPP:</strong>
              <p className="text-xs text-slate-600 mt-1 pl-4">
                If you haven't installed XAMPP yet, get the standard PHP 8 package from{' '}
                <a href="https://www.apachefriends.org/" target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  apachefriends.org
                </a>.
              </p>
            </li>

            <li className="pl-1">
              <strong className="text-slate-900">Start Apache and MySQL Modules:</strong>
              <p className="text-xs text-slate-600 mt-1 pl-4">
                Open <strong>XAMPP Control Panel</strong> and click the <strong>Start</strong> button next to both <strong>Apache</strong> and <strong>MySQL</strong>.
              </p>
            </li>

            <li className="pl-1">
              <strong className="text-slate-900">Copy Project Folder into <code>htdocs</code>:</strong>
              <div className="mt-1 pl-4 space-y-2">
                <p className="text-xs text-slate-600">
                  Click the <strong>"Download Project (.ZIP)"</strong> button at the top right of this page, extract the ZIP, and place the files into:
                </p>
                <div className="bg-slate-900 text-emerald-400 p-2.5 rounded font-mono text-xs">
                  C:\xampp\htdocs\student-management-system\
                </div>
                <div className="bg-amber-50 border border-amber-300 p-3 rounded-md text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950">
                    <span>⚠️ Seeing "Index of /student-management-system" in your browser?</span>
                  </div>
                  <p>
                    This means your files were extracted into a double folder:
                    <br />
                    <code>C:\xampp\htdocs\student-management-system\student-management-system\index.php</code>
                  </p>
                  <p className="font-semibold text-amber-950">
                    Quick 10-Second Fix:
                  </p>
                  <p>
                    Open <code>C:\xampp\htdocs\student-management-system\</code> in Windows File Explorer. If you see another <code>student-management-system</code> folder inside it, open it, select all files (including <code>index.php</code>), and move (cut & paste) them directly into <code>C:\xampp\htdocs\student-management-system\</code>.
                  </p>
                  <p>
                    Or simply visit: <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-950 font-mono">http://localhost/student-management-system/student-management-system/</code>
                  </p>
                </div>
                <p className="text-[11px] text-slate-400">
                  (On macOS: <code>/Applications/XAMPP/xamppfiles/htdocs/student-management-system/</code>)
                </p>
              </div>
            </li>

            <li className="pl-1">
              <strong className="text-slate-900">Import the Database in phpMyAdmin:</strong>
              <div className="mt-1 pl-4 text-xs text-slate-600 space-y-1">
                <p>1. Open your browser and go to <code className="bg-slate-100 text-blue-700 px-1 py-0.5 rounded">http://localhost/phpmyadmin/</code></p>
                <p>2. Click on the <strong>Import</strong> tab in the top navigation bar.</p>
                <p>3. Click <strong>Choose File</strong> and select <code>database.sql</code> from inside your project folder.</p>
                <p>4. Scroll down and click <strong>Import</strong> (or <strong>Go</strong>).</p>
                <p className="text-emerald-700 font-medium">✓ phpMyAdmin will automatically create the database <code>student_management</code> and the <code>users</code> table.</p>
              </div>
            </li>

            <li className="pl-1">
              <strong className="text-slate-900">Open the Website in Browser:</strong>
              <div className="mt-1 pl-4">
                <p className="text-xs text-slate-600 mb-1.5">
                  Visit the local URL:
                </p>
                <div className="bg-slate-100 border border-slate-300 p-2 rounded font-mono text-xs text-blue-700">
                  http://localhost/student-management-system/
                </div>
              </div>
            </li>
          </ol>
        </div>
      )}

      {/* SECTION 2: ONLINE HOSTING */}
      {activeSection === 'hosting' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5 text-sm text-slate-700 leading-relaxed">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Deploying to Online Public Hosting (Google Form Submission)
            </h3>
            <p className="text-xs text-slate-500">
              How to upload your project to free or shared hosting so external college examiners can access your live link.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded text-xs text-amber-900">
            <strong>Recommended Free Hosts:</strong> InfinityFree (infinityfree.com), AwardSpace, or 000webhost. They provide free PHP 8.2, MariaDB MySQL, and phpMyAdmin without credit cards.
          </div>

          <ol className="space-y-4 list-decimal list-inside text-xs">
            <li className="pl-1">
              <strong className="text-slate-900 text-sm">Create MySQL Database in Hosting cPanel:</strong>
              <p className="mt-1 pl-4 text-slate-600">
                Go to cPanel &rarr; <strong>MySQL Databases</strong>. Create a database, create a database user, and note down the exact Database Name, Username, and Password assigned by the host.
              </p>
            </li>

            <li className="pl-1">
              <strong className="text-slate-900 text-sm">Import <code>database.sql</code> via Online phpMyAdmin:</strong>
              <p className="mt-1 pl-4 text-slate-600">
                Click <strong>phpMyAdmin</strong> in your hosting dashboard, choose your online database, click <strong>Import</strong>, and upload <code>database.sql</code>.
              </p>
            </li>

            <li className="pl-1">
              <strong className="text-slate-900 text-sm">Upload Project Files to <code>htdocs</code> or <code>public_html</code>:</strong>
              <p className="mt-1 pl-4 text-slate-600">
                In cPanel <strong>File Manager</strong>, open <code>htdocs/</code> or <code>public_html/</code> and upload all project files.
              </p>
            </li>

            <li className="pl-1">
              <strong className="text-slate-900 text-sm">Update <code>config/database.php</code> with Host Credentials:</strong>
              <div className="mt-1 pl-4">
                <p className="text-slate-600 mb-1">Edit <code>config/database.php</code> on the server to match your hosting details:</p>
                <div className="bg-slate-900 text-slate-200 p-2.5 rounded font-mono text-[11px]">
                  define('DB_HOST', 'sqlxxx.infinityfree.com'); // From hosting dashboard<br/>
                  define('DB_USER', 'epiz_12345678');<br/>
                  define('DB_PASS', 'YourAssignedPassword');<br/>
                  define('DB_NAME', 'epiz_12345678_student_management');
                </div>
              </div>
            </li>

            <li className="pl-1">
              <strong className="text-slate-900 text-sm">Verify the Live Public Website:</strong>
              <p className="mt-1 pl-4 text-slate-600">
                Visit your free subdomain (e.g. <code>https://yourname.infinityfreeapp.com/</code>), register a student, log in, and submit that exact URL into the college Google Form!
              </p>
            </li>
          </ol>
        </div>
      )}

      {/* SECTION 3: VIVA Q&A */}
      {activeSection === 'viva' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 text-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              BCA Semester 3 Viva Voce Preparation
            </h3>
            <p className="text-xs text-slate-500">
              Standard technical questions asked by external examiners during practical evaluations:
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="font-semibold text-slate-900 text-xs">
                Q1: What is the purpose of PDO and why is it preferred over old <code>mysql_*</code> functions?
              </div>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Answer:</strong> PDO (PHP Data Objects) is an object-oriented database abstraction layer introduced in PHP 5.1. It supports prepared statements, named parameters, uniform exception handling, and works across multiple databases (MySQL, PostgreSQL, SQLite). The legacy <code>mysql_*</code> functions were deprecated and removed in PHP 7 due to security vulnerabilities and lack of prepared statement support.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="font-semibold text-slate-900 text-xs">
                Q2: How does your code protect against SQL Injection?
              </div>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Answer:</strong> By using PDO Prepared Statements (<code>$db-&gt;prepare()</code> and <code>$stmt-&gt;execute()</code>). The SQL template is compiled on the MySQL engine first, and user input values are transmitted separately as bound parameters. Even if a user enters <code>' OR '1'='1</code>, MySQL treats it purely as literal string data rather than executable SQL syntax.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="font-semibold text-slate-900 text-xs">
                Q3: Why do we call <code>session_regenerate_id(true)</code> during login?
              </div>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Answer:</strong> To defend against <em>Session Fixation attacks</em>. When a visitor's privilege level escalates from guest to authenticated user, regenerating the session ID and deleting the old session ensures that an attacker who previously knew or set the guest session ID cannot hijack the student's logged-in session.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="font-semibold text-slate-900 text-xs">
                Q4: How does <code>password_hash()</code> and <code>password_verify()</code> work in PHP?
              </div>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Answer:</strong> <code>password_hash()</code> uses the one-way Bcrypt cryptographic algorithm with an automatically generated random salt and cost factor. <code>password_verify()</code> extracts the salt embedded inside the hash, hashes the plain text candidate with the same salt, and checks if they match using a timing-safe comparison.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="font-semibold text-slate-900 text-xs">
                Q5: How does your profile page prevent unauthorized access or ID tampering?
              </div>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Answer:</strong> The query in <code>profile.php</code> looks up data strictly using the server-side session variable <code>$_SESSION['user_id']</code> (e.g. <code>SELECT ... WHERE id = :id</code> with <code>$_SESSION['user_id']</code>). It does not accept a query string parameter like <code>profile.php?id=5</code>, completely eliminating Insecure Direct Object References (IDOR).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: CHECKLIST */}
      {activeSection === 'checklist' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 text-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Practical Examination Evaluation Checklist
            </h3>
            <p className="text-xs text-slate-500">
              Check all criteria required for Semester 3 academic evaluation:
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            {[
              { label: 'MySQL database named student_management with users table', done: true },
              { label: 'Importable database.sql file provided for phpMyAdmin', done: true },
              { label: 'All passwords hashed with password_hash() using Bcrypt', done: true },
              { label: 'Authentication verifies hash via password_verify()', done: true },
              { label: 'Prepared SQL statements implemented on all DB queries', done: true },
              { label: 'Session verification gatekeeper protects dashboard and profile', done: true },
              { label: 'Direct URL access without session redirects to login page', done: true },
              { label: 'Session ID regenerated upon successful authentication', done: true },
              { label: 'Logout endpoint clears $_SESSION, cookie, and calls session_destroy()', done: true },
              { label: 'HTML escaping via htmlspecialchars() prevents Cross-Site Scripting (XSS)', done: true },
              { label: 'CSRF token protection on state-changing forms', done: true },
              { label: 'Clean academic design (white background, blue buttons, standard Arial)', done: true },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2.5 p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  ✓
                </span>
                <span className="font-medium text-slate-800">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
