// Customer Onboarding Landing Page
// Public-facing onboarding wizard for new customers

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Building2,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Compass,
  Users,
  Sparkles,
  UploadCloud,
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Create Account', desc: 'Sign up and verify email' },
  { id: 2, title: 'Configure Profile', desc: 'Fund details & preferences' },
  { id: 3, title: 'Upload Data', desc: 'Add your first quarterly report' },
  { id: 4, title: 'Review Dashboard', desc: 'Explore insights & reports' },
];

export default function CustomerOnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [completing, setCompleting] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    fundName: '',
    reportingCurrency: 'USD',
    reportingCadence: 'Quarterly',
  });

  function handleNext() {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishOnboarding();
    }
  }

  function handleBack() {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  }

  function finishOnboarding() {
    setCompleting(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('customer_onboarded', 'true');
    }
    setTimeout(() => router.push('/dashboard'), 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800 antialiased font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white font-black flex items-center justify-center shadow-md">
              AP
            </div>
            <div>
              <span className="font-bold text-gray-900 text-sm block">APEX HORIZON CAPITAL</span>
              <span className="text-[10px] text-blue-600 font-semibold uppercase block">Customer Onboarding Wizard</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 hidden sm:inline">
              Welcome, <strong className="text-gray-800">{user?.name || 'Guest'}</strong>
            </span>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Skip to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <Compass size={14} className="text-blue-600" />
            Customer Fast‑Track Onboarding
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Get Started with Your Fund Reporting Portal
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Create your account, configure your fund, upload your first quarterly report, and unlock AI‑driven insights in just four steps.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {STEPS.map(step => {
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : isDone
                    ? 'bg-blue-50 border-blue-200 text-gray-700'
                    : 'bg-white/60 border-gray-200 text-gray-400 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${isCurrent ? 'text-blue-600' : isDone ? 'text-gray-600' : 'text-gray-400'}`}>Step {step.id}</span>
                  {isDone ? (
                    <CheckCircle2 size={16} className="text-blue-600" />
                  ) : (
                    <span className={`h-2 w-2 rounded-full ${isCurrent ? 'bg-blue-600 animate-pulse' : 'bg-gray-300'}`} />
                  )}
                </div>
                <div className="text-sm font-bold text-gray-900">{step.title}</div>
                <div className="text-[11px] text-gray-500 truncate">{step.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-10 mb-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 size={22} className="text-blue-600" />
                Step 1: Create Your Account
              </h2>
              <p className="text-xs text-gray-500">Enter your company and fund name to begin.</p>
              {/* Simple form fields */}
              <input
                type="text"
                placeholder="Company Name"
                className="w-full border rounded px-3 py-2"
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Fund Name"
                className="w-full border rounded px-3 py-2"
                value={formData.fundName}
                onChange={e => setFormData({ ...formData, fundName: e.target.value })}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FileSpreadsheet size={22} className="text-blue-600" />
                Step 2: Configure Reporting
              </h2>
              <p className="text-xs text-gray-500">Select your reporting currency and cadence.</p>
              <select
                className="w-full border rounded px-3 py-2"
                value={formData.reportingCurrency}
                onChange={e => setFormData({ ...formData, reportingCurrency: e.target.value })}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              <select
                className="w-full border rounded px-3 py-2"
                value={formData.reportingCadence}
                onChange={e => setFormData({ ...formData, reportingCadence: e.target.value })}
              >
                <option value="Quarterly">Quarterly</option>
                <option value="Monthly">Monthly</option>
                <option value="Annual">Annual</option>
              </select>
            </div>
          )}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <UploadCloud size={22} className="text-blue-600" />
                Step 3: Upload First Report
              </h2>
              <p className="text-xs text-gray-500">Use the document upload flow to add your Q1 report.</p>
              <Link href="/documents" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Go to Document Upload
              </Link>
            </div>
          )}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles size={22} className="text-blue-600" />
                Step 4: Review Dashboard
              </h2>
              <p className="text-xs text-gray-500">Explore KPI analytics and generate your first investor PDF.</p>
              <Link href="/dashboard" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Open Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
          >
            <ArrowLeft size={16} className="inline-block mr-1" /> Back
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
            disabled={completing}
          >
            {currentStep < STEPS.length ? (
              <>
                Next <ArrowRight size={16} className="ml-1" />
              </>
            ) : (
              'Finish'
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
