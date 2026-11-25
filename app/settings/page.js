'use client';

import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { Shield, FileCheck, Lock } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Application Settings</h1>
          <p className="text-sm text-gray-500">
            Account profile, reporting standards, and extraction compliance policies
          </p>
        </div>

        <div className="max-w-4xl space-y-6">
          {/* User Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              Current Authenticated Session
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 bg-gray-50 rounded-xl text-xs">
              <div>
                <span className="text-gray-400">User Name</span>
                <p className="text-sm font-semibold text-gray-800">{user?.name || 'User'}</p>
              </div>
              <div>
                <span className="text-gray-400">Email Address</span>
                <p className="text-sm font-semibold text-gray-800">{user?.email || '—'}</p>
              </div>
              <div>
                <span className="text-gray-400">Assigned Role</span>
                <p className="text-sm font-semibold text-blue-700">{user?.role || 'Analyst'}</p>
              </div>
              <div>
                <span className="text-gray-400">Department</span>
                <p className="text-sm font-semibold text-gray-800">{user?.department || 'Private Equity'}</p>
              </div>
            </div>
          </div>

          {/* Reporting & Ingestion Standards */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-indigo-600" />
              Reporting & Document Ingestion Policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg border border-gray-100 bg-gray-50/60">
                <span className="font-bold text-gray-900 block mb-1">Supported Filing Formats</span>
                <p className="text-gray-600">PDF (native & scanned), Excel (.xlsx, .xls), Word (.docx), and CSV up to 50 MB per filing.</p>
              </div>
              <div className="p-4 rounded-lg border border-gray-100 bg-gray-50/60">
                <span className="font-bold text-gray-900 block mb-1">Investor Reporting Standard</span>
                <p className="text-gray-600">Institutional Limited Partners Association (ILPA) aligned quarterly packet format.</p>
              </div>
              <div className="p-4 rounded-lg border border-gray-100 bg-gray-50/60">
                <span className="font-bold text-gray-900 block mb-1">Valuation Framework</span>
                <p className="text-gray-600">IPEV & ASC 820 / IFRS 13 fair value mark-to-market tracking.</p>
              </div>
              <div className="p-4 rounded-lg border border-gray-100 bg-gray-50/60">
                <span className="font-bold text-gray-900 block mb-1">Human Sign-Off Policy</span>
                <p className="text-gray-600">Analyst or Reviewer approval required prior to publishing finalized LP packets.</p>
              </div>
            </div>
          </div>

          {/* Extraction & Security Guardrails Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              Extraction & Security Guardrails
            </h2>
            <ul className="text-xs text-gray-600 space-y-2 list-disc pl-5">
              <li><strong className="text-gray-900">Zero Hallucination Rule:</strong> Missing financial metrics are strictly stored as null; values are never estimated or invented.</li>
              <li><strong className="text-gray-900">Calculated Metric Tagging:</strong> Auto-computed values (e.g. EBITDA Margin, Gross Margin) are distinctly flagged as calculated.</li>
              <li><strong className="text-gray-900">Source Tracing:</strong> Every extracted metric preserves exact page numbers and document snippets for LP auditability.</li>
              <li><strong className="text-gray-900">Role-Based Access Control:</strong> Only certified Reviewers or Admins may approve quarterly analyses for LP packet compilation.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
