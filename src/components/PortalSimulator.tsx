import React, { useState } from 'react';
import { ShieldCheck, Info, UserCheck, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

interface PortalSimulatorProps {
  users: UserRecord[];
  onRegisterUser: (name: string, email: string, passwordHash: string) => boolean;
}

export const PortalSimulator: React.FC<PortalSimulatorProps> = ({ users, onRegisterUser }) => {
  // Current active page inside the PHP simulation: 'login' | 'register' | 'dashboard' | 'profile'
  const [activePage, setActivePage] = useState<'login' | 'register' | 'dashboard' | 'profile'>('login');
  
  // Simulated PHP session state
  const [currentUser, setCurrentUser] = useState<UserRecord | null>(null);
  const [flashSuccess, setFlashSuccess] = useState<string | null>(null);
  const [flashError, setFlashError] = useState<string | null>(null);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Simulated CSRF token
  const [csrfToken] = useState('7f8a9b2c3d4e5f60a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4');

  // Helper to clear messages
  const clearFlash = () => {
    setFlashSuccess(null);
    setFlashError(null);
  };

  // Login handler mimicking index.php
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    clearFlash();

    if (!loginEmail.trim() || !loginPassword) {
      setFlashError("Please enter both your email address and password.");
      return;
    }

    // Lookup user in simulated MySQL database
    const foundUser = users.find(u => u.email.toLowerCase() === loginEmail.trim().toLowerCase());
    
    // In real PHP, password_verify() is used against bcrypt hash
    // In simulation: we check if password is correct (for seed user "password123" or newly registered passwords)
    if (foundUser) {
      // Check password matching
      const isValidPassword = foundUser.passwordHash.includes(loginPassword) || 
                             loginPassword === 'password123' ||
                             foundUser.passwordHash === `$2y$10$simulated_hash_for_${loginPassword}`;
      
      if (isValidPassword) {
        setCurrentUser(foundUser);
        setActivePage('dashboard');
        setLoginEmail('');
        setLoginPassword('');
        return;
      }
    }

    // Generic error message to prevent account enumeration
    setFlashError("Invalid email or password.");
  };

  // Register handler mimicking register.php
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    clearFlash();

    const name = regName.trim();
    const email = regEmail.trim();
    const password = regPassword;
    const confirmPassword = regConfirmPassword;

    if (!name || !email || !password || !confirmPassword) {
      setFlashError("All fields are required. Please fill in all inputs.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFlashError("Invalid email format. Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setFlashError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setFlashError("Passwords do not match. Please verify your password.");
      return;
    }

    // Check duplicate email
    const duplicate = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (duplicate) {
      setFlashError("This email is already registered. Please log in or use another email.");
      return;
    }

    // Generate simulated bcrypt hash ($2y$10$...)
    const simulatedBcrypt = `$2y$10$${Math.random().toString(36).substring(2, 15)}K8qJ9${Math.random().toString(36).substring(2, 15)}simulated_hash_for_${password}`;

    const success = onRegisterUser(name, email, simulatedBcrypt);
    if (success) {
      setFlashSuccess("Registration successful! You can now log in.");
      setActivePage('login');
      setRegName('');
      setRegEmail('');
      setRegPassword('');
      setRegConfirmPassword('');
      setLoginEmail(email); // Convenience
    } else {
      setFlashError("Something went wrong while creating your account. Please try again.");
    }
  };

  // Logout handler mimicking logout.php
  const handleLogout = () => {
    setCurrentUser(null);
    clearFlash();
    setFlashSuccess("You have been successfully logged out.");
    setActivePage('login');
  };

  // Gatekeeper: if user tries to open dashboard or profile while logged out
  const navigateTo = (page: 'login' | 'register' | 'dashboard' | 'profile') => {
    clearFlash();
    if ((page === 'dashboard' || page === 'profile') && !currentUser) {
      setFlashError("Please log in to access this page.");
      setActivePage('login');
      return;
    }
    setActivePage(page);
  };

  return (
    <div className="space-y-6">
      {/* Live Simulation Status Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <span className="font-semibold">Live PHP & MySQL Interactive Preview:</span>{' '}
            <span className="text-blue-700">Simulating PHP 8.2 session state, CSRF tokens, and MySQL query execution.</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-blue-800">
          <span className="font-mono bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
            Session: {currentUser ? `User #${currentUser.id} Logged In` : 'Guest (Logged Out)'}
          </span>
        </div>
      </div>

      {/* College Project Canvas Window (Renders exact HTML/CSS requested) */}
      <div className="border border-slate-300 rounded-lg bg-white overflow-hidden shadow-xs">
        {/* Browser Mockup Chrome Bar */}
        <div className="bg-slate-100 border-b border-slate-300 px-4 py-2 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span className="ml-2 font-mono text-slate-700 hidden sm:inline">
              http://localhost/student-management-system/{activePage === 'login' ? 'index.php' : `${activePage}.php`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="font-mono text-[11px] bg-slate-200 px-2 py-0.5 rounded">Apache 2.4 / PHP 8.2</span>
          </div>
        </div>

        {/* Embedded Website matching style.css */}
        <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#333333', backgroundColor: '#ffffff', minHeight: '440px' }} className="p-4 sm:p-6">
          {/* Header */}
          <header style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '15px', marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <h1 style={{ fontSize: '20px', color: '#222222', margin: 0, fontWeight: 'bold' }}>
                <button 
                  onClick={() => navigateTo(currentUser ? 'dashboard' : 'login')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', fontWeight: 'bold', color: '#222222', padding: 0 }}
                >
                  Student Management System
                </button>
              </h1>
              <nav style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
                {currentUser ? (
                  <>
                    <button 
                      onClick={() => navigateTo('dashboard')} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: activePage === 'dashboard' ? '#003d80' : '#0056b3', textDecoration: activePage === 'dashboard' ? 'underline' : 'none', fontWeight: activePage === 'dashboard' ? 'bold' : 'normal' }}
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => navigateTo('profile')} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: activePage === 'profile' ? '#003d80' : '#0056b3', textDecoration: activePage === 'profile' ? 'underline' : 'none', fontWeight: activePage === 'profile' ? 'bold' : 'normal' }}
                    >
                      Profile
                    </button>
                    <button 
                      onClick={handleLogout} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0056b3' }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => navigateTo('login')} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: activePage === 'login' ? '#003d80' : '#0056b3', textDecoration: activePage === 'login' ? 'underline' : 'none', fontWeight: activePage === 'login' ? 'bold' : 'normal' }}
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => navigateTo('register')} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: activePage === 'register' ? '#003d80' : '#0056b3', textDecoration: activePage === 'register' ? 'underline' : 'none', fontWeight: activePage === 'register' ? 'bold' : 'normal' }}
                    >
                      Register
                    </button>
                  </>
                )}
              </nav>
            </div>
          </header>

          {/* Main Body Container */}
          <main style={{ maxWidth: activePage === 'dashboard' || activePage === 'profile' ? '800px' : '450px', margin: '0 auto' }}>
            
            {/* Flash Messages */}
            {flashSuccess && (
              <div style={{ backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', padding: '12px 15px', borderRadius: '3px', marginBottom: '18px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{flashSuccess}</span>
              </div>
            )}

            {flashError && (
              <div style={{ backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', padding: '12px 15px', borderRadius: '3px', marginBottom: '18px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
                <span>{flashError}</span>
              </div>
            )}

            {/* VIEW 1: LOGIN (index.php) */}
            {activePage === 'login' && (
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '4px', padding: '24px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '20px', paddingBottom: '8px', borderBottom: '1px solid #eeeeee', color: '#222222', fontWeight: 'bold' }}>
                  Student Login
                </h2>

                <form onSubmit={handleLogin}>
                  {/* Simulated CSRF Hidden Field */}
                  <input type="hidden" name="csrf_token" value={csrfToken} />

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px', color: '#444444' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Enter registered email"
                      required
                      style={{ width: '100%', padding: '8px 12px', fontSize: '14px', border: '1px solid #cccccc', borderRadius: '3px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px', color: '#444444' }}>
                      Password
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                      style={{ width: '100%', padding: '8px 12px', fontSize: '14px', border: '1px solid #cccccc', borderRadius: '3px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ width: '100%', padding: '9px 18px', fontSize: '14px', border: '1px solid #0056b3', borderRadius: '3px', backgroundColor: '#0056b3', color: '#ffffff', cursor: 'pointer' }}
                  >
                    Log In
                  </button>
                </form>

                <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>
                  Don't have an account yet?{' '}
                  <button
                    onClick={() => navigateTo('register')}
                    style={{ background: 'none', border: 'none', color: '#0056b3', cursor: 'pointer', textDecoration: 'underline', padding: 0, font: 'inherit' }}
                  >
                    Register here
                  </button>
                </div>

                {/* Quick Testing Hint for Practical Evaluators */}
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 bg-slate-50 p-2.5 rounded">
                  <div className="font-semibold text-slate-700 mb-1">Pre-seeded Test Account:</div>
                  <div>Email: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">rohan@college.edu</code></div>
                  <div>Password: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">password123</code></div>
                  <div className="mt-1">Or register any new account using the registration form.</div>
                </div>
              </div>
            )}

            {/* VIEW 2: REGISTRATION (register.php) */}
            {activePage === 'register' && (
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '4px', padding: '24px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '20px', paddingBottom: '8px', borderBottom: '1px solid #eeeeee', color: '#222222', fontWeight: 'bold' }}>
                  Student Registration
                </h2>

                <form onSubmit={handleRegister}>
                  <input type="hidden" name="csrf_token" value={csrfToken} />

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px', color: '#444444' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      style={{ width: '100%', padding: '8px 12px', fontSize: '14px', border: '1px solid #cccccc', borderRadius: '3px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px', color: '#444444' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. student@college.edu"
                      required
                      style={{ width: '100%', padding: '8px 12px', fontSize: '14px', border: '1px solid #cccccc', borderRadius: '3px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px', color: '#444444' }}>
                      Password
                    </label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      required
                      style={{ width: '100%', padding: '8px 12px', fontSize: '14px', border: '1px solid #cccccc', borderRadius: '3px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px', color: '#444444' }}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      required
                      style={{ width: '100%', padding: '8px 12px', fontSize: '14px', border: '1px solid #cccccc', borderRadius: '3px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ width: '100%', padding: '9px 18px', fontSize: '14px', border: '1px solid #0056b3', borderRadius: '3px', backgroundColor: '#0056b3', color: '#ffffff', cursor: 'pointer' }}
                  >
                    Register
                  </button>
                </form>

                <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>
                  Already have an account?{' '}
                  <button
                    onClick={() => navigateTo('login')}
                    style={{ background: 'none', border: 'none', color: '#0056b3', cursor: 'pointer', textDecoration: 'underline', padding: 0, font: 'inherit' }}
                  >
                    Log In here
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 3: DASHBOARD (dashboard.php) */}
            {activePage === 'dashboard' && currentUser && (
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '4px', padding: '24px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '20px', paddingBottom: '8px', borderBottom: '1px solid #eeeeee', color: '#222222', fontWeight: 'bold' }}>
                  Welcome to Your Student Portal
                </h2>

                <p style={{ marginBottom: '20px' }}>
                  Hello, <strong>{currentUser.name}</strong>! You are securely logged in to the Student Management System.
                </p>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', marginBottom: '20px' }}>
                  <tbody>
                    <tr>
                      <th style={{ backgroundColor: '#f8f9fa', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #dddddd', width: '35%', fontSize: '14px', fontWeight: 'bold' }}>Account ID</th>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #dddddd', fontSize: '14px' }}>#{currentUser.id}</td>
                    </tr>
                    <tr>
                      <th style={{ backgroundColor: '#f8f9fa', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #dddddd', fontSize: '14px', fontWeight: 'bold' }}>Student Name</th>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #dddddd', fontSize: '14px' }}>{currentUser.name}</td>
                    </tr>
                    <tr>
                      <th style={{ backgroundColor: '#f8f9fa', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #dddddd', fontSize: '14px', fontWeight: 'bold' }}>Registered Email</th>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #dddddd', fontSize: '14px' }}>{currentUser.email}</td>
                    </tr>
                    <tr>
                      <th style={{ backgroundColor: '#f8f9fa', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #dddddd', fontSize: '14px', fontWeight: 'bold' }}>Account Status</th>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #dddddd', fontSize: '14px' }}>
                        <span style={{ color: '#28a745', fontWeight: 'bold' }}>Active</span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ marginTop: '25px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigateTo('profile')}
                    style={{ padding: '9px 18px', fontSize: '14px', border: '1px solid #0056b3', borderRadius: '3px', backgroundColor: '#0056b3', color: '#ffffff', cursor: 'pointer' }}
                  >
                    View Full Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{ padding: '9px 18px', fontSize: '14px', border: '1px solid #6c757d', borderRadius: '3px', backgroundColor: '#6c757d', color: '#ffffff', cursor: 'pointer' }}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 4: PROFILE (profile.php) */}
            {activePage === 'profile' && currentUser && (
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '4px', padding: '24px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '20px', paddingBottom: '8px', borderBottom: '1px solid #eeeeee', color: '#222222', fontWeight: 'bold' }}>
                  Student Profile Details
                </h2>

                <p style={{ marginBottom: '20px', color: '#555555' }}>
                  Below are your official student registration records retrieved from the MySQL database.
                </p>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', marginBottom: '20px' }}>
                  <tbody>
                    <tr>
                      <th style={{ backgroundColor: '#f8f9fa', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #dddddd', width: '35%', fontSize: '14px', fontWeight: 'bold' }}>Student Database ID</th>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #dddddd', fontSize: '14px' }}>#{currentUser.id}</td>
                    </tr>
                    <tr>
                      <th style={{ backgroundColor: '#f8f9fa', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #dddddd', fontSize: '14px', fontWeight: 'bold' }}>Full Name</th>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #dddddd', fontSize: '14px' }}>{currentUser.name}</td>
                    </tr>
                    <tr>
                      <th style={{ backgroundColor: '#f8f9fa', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #dddddd', fontSize: '14px', fontWeight: 'bold' }}>Email Address</th>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #dddddd', fontSize: '14px' }}>{currentUser.email}</td>
                    </tr>
                    <tr>
                      <th style={{ backgroundColor: '#f8f9fa', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #dddddd', fontSize: '14px', fontWeight: 'bold' }}>Registration Date</th>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #dddddd', fontSize: '14px' }}>{currentUser.createdAt}</td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ marginTop: '25px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigateTo('dashboard')}
                    style={{ padding: '9px 18px', fontSize: '14px', border: '1px solid #0056b3', borderRadius: '3px', backgroundColor: '#0056b3', color: '#ffffff', cursor: 'pointer' }}
                  >
                    Back to Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{ padding: '9px 18px', fontSize: '14px', border: '1px solid #6c757d', borderRadius: '3px', backgroundColor: '#6c757d', color: '#ffffff', cursor: 'pointer' }}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </main>

          {/* Footer */}
          <footer style={{ marginTop: '50px', borderTop: '1px solid #e0e0e0', paddingTop: '20px', textAlign: 'center', fontSize: '13px', color: '#666666' }}>
            <p>&copy; {new Date().getFullYear()} Student Login and Management System | BCA Practical Project</p>
          </footer>
        </div>
      </div>
    </div>
  );
};
