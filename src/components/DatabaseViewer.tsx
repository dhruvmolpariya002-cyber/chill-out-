import React, { useState } from 'react';
import { Database, Table, RefreshCw, Key, Shield, CheckCircle2 } from 'lucide-react';
import { UserRecord } from './PortalSimulator';

interface DatabaseViewerProps {
  users: UserRecord[];
  onResetUsers: () => void;
}

export const DatabaseViewer: React.FC<DatabaseViewerProps> = ({ users, onResetUsers }) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'structure' | 'sql'>('browse');

  return (
    <div className="space-y-4">
      {/* DB Overview Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 font-mono">student_management</h3>
              <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                MySQL 8.0 / InnoDB
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulating phpMyAdmin database state. Current table:{' '}
              <span className="font-mono font-medium text-slate-700">users</span> ({users.length} record{users.length !== 1 ? 's' : ''})
            </p>
          </div>
        </div>

        <button
          onClick={onResetUsers}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-3 pt-2 rounded-t-lg">
        <button
          onClick={() => setActiveTab('browse')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === 'browse'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Browse Table (`users`)
        </button>
        <button
          onClick={() => setActiveTab('structure')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === 'structure'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Table Structure (Schema)
        </button>
        <button
          onClick={() => setActiveTab('sql')}
          className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === 'sql'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          SQL Queries & Prepared Statements
        </button>
      </div>

      {/* TAB 1: BROWSE TABLE */}
      {activeTab === 'browse' && (
        <div className="bg-white border border-slate-200 border-t-0 rounded-b-lg overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span className="font-mono text-slate-700">SELECT * FROM \`users\` ORDER BY \`id\` ASC;</span>
            <span className="text-slate-500">Showing {users.length} row{users.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                  <th className="p-3 font-semibold w-16">id</th>
                  <th className="p-3 font-semibold">name</th>
                  <th className="p-3 font-semibold">email</th>
                  <th className="p-3 font-semibold">password (Bcrypt Hash)</th>
                  <th className="p-3 font-semibold">created_at</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-blue-600">#{row.id}</td>
                    <td className="p-3 font-sans font-medium text-slate-900">{row.name}</td>
                    <td className="p-3 text-slate-700">{row.email}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5 max-w-xs sm:max-w-md">
                        <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate text-slate-500 text-[11px] select-all bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {row.passwordHash}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-500 whitespace-nowrap">{row.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Notice: Plain-text passwords are NEVER stored in this database. Every record contains a 60-character Bcrypt hash.</span>
          </div>
        </div>
      )}

      {/* TAB 2: STRUCTURE */}
      {activeTab === 'structure' && (
        <div className="bg-white border border-slate-200 border-t-0 rounded-b-lg overflow-hidden p-4">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                <th className="p-2.5 font-semibold">Column Name</th>
                <th className="p-2.5 font-semibold">Data Type</th>
                <th className="p-2.5 font-semibold">Null</th>
                <th className="p-2.5 font-semibold">Default</th>
                <th className="p-2.5 font-semibold">Key / Extra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-500" />
                  <span>id</span>
                </td>
                <td className="p-2.5 text-slate-700">INT(11)</td>
                <td className="p-2.5 text-slate-500">NO</td>
                <td className="p-2.5 text-slate-400">None</td>
                <td className="p-2.5 text-amber-600 font-bold">PRIMARY KEY, AUTO_INCREMENT</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-900">name</td>
                <td className="p-2.5 text-slate-700">VARCHAR(100)</td>
                <td className="p-2.5 text-slate-500">NO</td>
                <td className="p-2.5 text-slate-400">None</td>
                <td className="p-2.5 text-slate-400">-</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-blue-500" />
                  <span>email</span>
                </td>
                <td className="p-2.5 text-slate-700">VARCHAR(150)</td>
                <td className="p-2.5 text-slate-500">NO</td>
                <td className="p-2.5 text-slate-400">None</td>
                <td className="p-2.5 text-blue-600 font-semibold">UNIQUE</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-900">password</td>
                <td className="p-2.5 text-slate-700">VARCHAR(255)</td>
                <td className="p-2.5 text-slate-500">NO</td>
                <td className="p-2.5 text-slate-400">None</td>
                <td className="p-2.5 text-slate-400">-</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-900">created_at</td>
                <td className="p-2.5 text-slate-700">TIMESTAMP</td>
                <td className="p-2.5 text-slate-500">NO</td>
                <td className="p-2.5 text-slate-700">CURRENT_TIMESTAMP</td>
                <td className="p-2.5 text-slate-400">DEFAULT_GENERATED</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: SQL STATEMENTS */}
      {activeTab === 'sql' && (
        <div className="bg-white border border-slate-200 border-t-0 rounded-b-lg p-4 space-y-4 text-xs font-mono">
          <div>
            <div className="text-slate-500 font-sans text-xs mb-1 font-semibold">1. User Registration (Prepared Statement):</div>
            <pre className="p-3 bg-slate-900 text-emerald-400 rounded overflow-x-auto">
INSERT INTO users (name, email, password) VALUES (:name, :email, :password);
            </pre>
          </div>

          <div>
            <div className="text-slate-500 font-sans text-xs mb-1 font-semibold">2. User Authentication (Prepared Statement):</div>
            <pre className="p-3 bg-slate-900 text-blue-400 rounded overflow-x-auto">
SELECT id, name, email, password FROM users WHERE email = :email LIMIT 1;
            </pre>
          </div>

          <div>
            <div className="text-slate-500 font-sans text-xs mb-1 font-semibold">3. Duplicate Email Check:</div>
            <pre className="p-3 bg-slate-900 text-amber-400 rounded overflow-x-auto">
SELECT id FROM users WHERE email = :email LIMIT 1;
            </pre>
          </div>

          <div>
            <div className="text-slate-500 font-sans text-xs mb-1 font-semibold">4. Profile Lookup (Secure Session Query):</div>
            <pre className="p-3 bg-slate-900 text-purple-400 rounded overflow-x-auto">
SELECT id, name, email, created_at FROM users WHERE id = :id LIMIT 1;
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
