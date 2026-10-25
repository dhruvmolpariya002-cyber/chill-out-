import React, { useState } from 'react';
import { PortalSimulator, UserRecord } from './components/PortalSimulator';
import { CodeExplorer } from './components/CodeExplorer';
import { DatabaseViewer } from './components/DatabaseViewer';
import { SetupGuide } from './components/SetupGuide';
import { ProjectSynopsis } from './components/ProjectSynopsis';
import { downloadProjectZip } from './utils/zipExporter';
import { Download, GraduationCap, CheckCircle } from 'lucide-react';

const INITIAL_USERS: UserRecord[] = [
  {
    id: 1,
    name: 'Rohan Sharma',
    email: 'rohan@college.edu',
    passwordHash: '$2y$10$e7K9Q2mYxL.p8A7vK1lEueZ0o0rL9a1B5c8D3e4F6g8H9i0j1k2l3simulated_hash_for_password123',
    createdAt: '2026-10-25 10:15:00',
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya@college.edu',
    passwordHash: '$2y$10$w3X1Y8zV0.m2B5nK9qL7puR4t2eY5a7C9d1E3f5G7h9J1k3l5m7simulated_hash_for_password123',
    createdAt: '2026-10-25 11:30:20',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'database' | 'guide' | 'synopsis'>('simulator');
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleRegisterUser = (name: string, email: string, passwordHash: string): boolean => {
    const newUser: UserRecord = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name,
      email,
      passwordHash,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    setUsers((prev) => [...prev, newUser]);
    return true;
  };

  const handleResetUsers = () => {
    setUsers(INITIAL_USERS);
  };

  const handleDownloadZip = async () => {
    try {
      setIsExporting(true);
      await downloadProjectZip();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Bar following 3-Zone Contract */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded bg-blue-700 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('simulator');
              }}
              className="text-base font-bold text-slate-900 tracking-tight whitespace-nowrap hover:text-blue-700 transition-colors"
            >
              Student Management System
            </a>
          </div>

          {/* Zone 2: Navigation Links (single line, whitespace-nowrap) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                activeTab === 'simulator'
                  ? 'border-blue-700 text-blue-700 font-bold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Live Portal
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                activeTab === 'code'
                  ? 'border-blue-700 text-blue-700 font-bold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Code Explorer (13 Files)
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                activeTab === 'database'
                  ? 'border-blue-700 text-blue-700 font-bold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Database & phpMyAdmin
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                activeTab === 'guide'
                  ? 'border-blue-700 text-blue-700 font-bold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              XAMPP & Viva Guide
            </button>
            <button
              onClick={() => setActiveTab('synopsis')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                activeTab === 'synopsis'
                  ? 'border-blue-700 text-blue-700 font-bold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Practical Synopsis
            </button>
          </nav>

          {/* Zone 3: Primary Action (Download .ZIP) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadZip}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-md transition-colors whitespace-nowrap shrink-0 disabled:opacity-60 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Packaging ZIP...' : 'Download Project (.ZIP)'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Strip */}
        <div className="md:hidden flex overflow-x-auto border-t border-slate-200 px-4 py-2 gap-4 text-xs font-medium text-slate-600 bg-slate-50">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'simulator' ? 'text-blue-700 font-bold' : ''
            }`}
          >
            Live Portal
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'code' ? 'text-blue-700 font-bold' : ''
            }`}
          >
            Code Explorer
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'database' ? 'text-blue-700 font-bold' : ''
            }`}
          >
            Database
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'guide' ? 'text-blue-700 font-bold' : ''
            }`}
          >
            XAMPP & Viva
          </button>
          <button
            onClick={() => setActiveTab('synopsis')}
            className={`whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'synopsis' ? 'text-blue-700 font-bold' : ''
            }`}
          >
            Synopsis
          </button>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'simulator' && (
          <PortalSimulator users={users} onRegisterUser={handleRegisterUser} />
        )}
        {activeTab === 'code' && <CodeExplorer />}
        {activeTab === 'database' && (
          <DatabaseViewer users={users} onResetUsers={handleResetUsers} />
        )}
        {activeTab === 'guide' && <SetupGuide />}
        {activeTab === 'synopsis' && <ProjectSynopsis />}
      </main>

      {/* Download Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 text-xs border border-slate-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <div className="font-semibold">student-management-system.zip downloaded!</div>
            <div className="text-slate-400 text-[11px]">
              Extract and copy into <code className="text-slate-300">htdocs</code> for XAMPP.
            </div>
          </div>
        </div>
      )}

      {/* Academic Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-700">Student Login & Management System</span>
            <span className="mx-2 text-slate-300">·</span>
            <span>BCA Semester 3 Practical Examination Project</span>
          </div>
          <div className="text-slate-400">
            Core PHP 8.2 · MySQL InnoDB · Prepared Statements · Bcrypt Hashing · CSRF Protected
          </div>
        </div>
      </footer>
    </div>
  );
}
