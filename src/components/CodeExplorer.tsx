import React, { useState } from 'react';
import { PROJECT_FILES, ProjectFile } from '../data/projectFiles';
import { Copy, Check, FileCode, Database, FileText, Palette, Search, Download } from 'lucide-react';
import { downloadProjectZip } from '../utils/zipExporter';

export const CodeExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<ProjectFile>(PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsExporting(true);
      await downloadProjectZip();
    } finally {
      setIsExporting(false);
    }
  };

  const filteredFiles = PROJECT_FILES.filter(file => 
    file.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type: ProjectFile['type']) => {
    switch (type) {
      case 'sql':
        return <Database className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'php':
        return <FileCode className="w-4 h-4 text-indigo-600 shrink-0" />;
      case 'css':
        return <Palette className="w-4 h-4 text-cyan-600 shrink-0" />;
      case 'markdown':
        return <FileText className="w-4 h-4 text-emerald-600 shrink-0" />;
    }
  };

  const lines = selectedFile.content.split('\n');

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900">Project Source Code Inspector</h3>
          <p className="text-xs text-slate-500">
            Browse, inspect, and copy all 13 production PHP and MySQL files generated for the college practical.
          </p>
        </div>
        <button
          onClick={handleDownloadZip}
          disabled={isExporting}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-md transition-colors shrink-0 disabled:opacity-60 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Packaging ZIP...' : 'Download Project (.ZIP)'}</span>
        </button>
      </div>

      {/* Main Split Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* File Sidebar */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="p-3 border-b border-slate-200 bg-slate-50">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter files..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100 max-h-[560px] overflow-y-auto">
            {filteredFiles.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3.5 py-2.5 transition-colors flex items-start gap-2.5 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 text-blue-950 font-medium'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="mt-0.5">{getFileIcon(file.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-xs truncate">{file.path}</span>
                      <span className="text-[10px] uppercase font-mono px-1 py-0.2 bg-slate-100 border border-slate-200 text-slate-600 rounded shrink-0">
                        {file.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {file.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Content Pane */}
        <div className="lg:col-span-8 bg-slate-950 text-slate-100 rounded-lg border border-slate-800 overflow-hidden shadow-xs flex flex-col">
          {/* File Tab Info Bar */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono font-semibold text-slate-200 truncate">
                {selectedFile.path}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 font-mono text-[11px]">
                {lines.length} lines
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy File</span>
                </>
              )}
            </button>
          </div>

          {/* Formatted Code with Line Numbers */}
          <div className="max-h-[520px] overflow-auto p-4 font-mono text-xs leading-relaxed">
            <pre className="table w-full">
              {lines.map((line, idx) => (
                <div key={idx} className="table-row hover:bg-slate-900/60">
                  <span className="table-cell select-none text-slate-600 text-right pr-4 pl-1 w-10 border-r border-slate-800">
                    {idx + 1}
                  </span>
                  <span className="table-cell pl-4 text-slate-200 whitespace-pre">
                    {line || ' '}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
