'use client';

/**
 * Customer Fast-Track Onboarding Page
 * 4-step wizard with strict required-field validation and visual required asterisks (*).
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import {
  Building2,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Compass,
  Sparkles,
  UploadCloud,
  AlertCircle,
  Mail,
  DollarSign,
  Briefcase
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Company & Fund', desc: 'Core entity information' },
  { id: 2, title: 'Reporting Settings', desc: 'Currency & cadence' },
  { id: 3, title: 'Upload Filing', desc: 'Ingest first quarterly report' },
  { id: 4, title: 'Launch Workspace', desc: 'Audit & live dashboard' },
];

export default function CustomerOnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [completing, setCompleting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    companyName: '',
    fundName: '',
    email: user?.email || '',
    fundStrategy: 'Growth Equity & Mid-Market Buyout',
    targetSize: '₹5,000 Cr INR',
    reportingCurrency: 'INR',
    reportingCadence: 'Quarterly',
  });

  // Validation function per step
  function validateCurrentStep() {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
      if (!formData.fundName.trim()) {
        newErrors.fundName = 'Primary fund vehicle name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Corporate email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid corporate email address';
      }
      if (!formData.fundStrategy.trim()) {
        newErrors.fundStrategy = 'Investment strategy is required';
      }
    }

    if (currentStep === 2) {
      if (!formData.targetSize.trim()) {
        newErrors.targetSize = 'Committed capital / target fund size is required';
      }
      if (!formData.reportingCurrency) {
        newErrors.reportingCurrency = 'Reporting currency is required';
      }
      if (!formData.reportingCadence) {
        newErrors.reportingCadence = 'Reporting cadence is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleInputChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error as user types
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  }

  function handleNext() {
    // Check validation before proceeding
    const isValid = validateCurrentStep();
    if (!isValid) return;

    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishOnboarding();
    }
  }

  function handleBack() {
    setErrors({});
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100 text-slate-800 antialiased font-sans selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-200/90 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="sm" variant="dark" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Welcome, <strong className="text-slate-800">{user?.name || 'Partner'}</strong>
            </span>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Skip to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <Compass size={14} className="text-teal-600" />
            Customer Fast-Track Setup
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Configure Your Fund Reporting Portal
          </h1>
          <p className="text-slate-600 text-xs sm:text-base mt-2 max-w-xl mx-auto">
            Fill in the required information marked with a red star (<span className="text-red-500 font-bold">*</span>) to proceed through each onboarding stage.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
          {STEPS.map(step => {
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return (
              <div
                key={step.id}
                className={`p-2.5 sm:p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
                    : isDone
                    ? 'bg-teal-50/70 border-teal-200 text-slate-700'
                    : 'bg-white/60 border-slate-200 text-slate-400 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${isCurrent ? 'text-teal-700' : isDone ? 'text-slate-700' : 'text-slate-400'}`}>
                    Step {step.id}
                  </span>
                  {isDone ? (
                    <CheckCircle2 size={15} className="text-teal-600" />
                  ) : (
                    <span className={`h-2 w-2 rounded-full ${isCurrent ? 'bg-teal-600 animate-pulse' : 'bg-slate-300'}`} />
                  )}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">{step.title}</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">{step.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Form Error Banner */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3 shadow-sm animate-shake">
            <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-900">Please complete all required fields before proceeding</p>
              <p className="text-red-700 text-xs mt-0.5">Fill in the highlighted inputs marked with an asterisk (*).</p>
            </div>
          </div>
        )}

        {/* Step Content Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-5 sm:p-10 mb-8">
          
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Building2 size={22} className="text-blue-600" />
                  Step 1: Entity & Primary Fund Vehicle
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  All fields with (<span className="text-red-500 font-bold">*</span>) are mandatory to initialize your portfolio space.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Managing Entity / Firm Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Horizon Capital Management"
                    className={`w-full rounded-xl bg-slate-50 border px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white transition-all ${
                      errors.companyName
                        ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                        : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100'
                    }`}
                    value={formData.companyName}
                    onChange={e => handleInputChange('companyName', e.target.value)}
                  />
                  {errors.companyName && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.companyName}
                    </p>
                  )}
                </div>

                {/* Fund Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Fund Vehicle <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Horizon Flagship Fund IV"
                    className={`w-full rounded-xl bg-slate-50 border px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white transition-all ${
                      errors.fundName
                        ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                        : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100'
                    }`}
                    value={formData.fundName}
                    onChange={e => handleInputChange('fundName', e.target.value)}
                  />
                  {errors.fundName && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.fundName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Corporate Email Address <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="partner@apexpe.com"
                    className={`w-full rounded-xl bg-slate-50 border px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white transition-all ${
                      errors.email
                        ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                        : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100'
                    }`}
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Investment Strategy */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Investment Strategy <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mid-Market Buyout & Growth Equity"
                    className={`w-full rounded-xl bg-slate-50 border px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white transition-all ${
                      errors.fundStrategy
                        ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                        : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100'
                    }`}
                    value={formData.fundStrategy}
                    onChange={e => handleInputChange('fundStrategy', e.target.value)}
                  />
                  {errors.fundStrategy && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.fundStrategy}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet size={22} className="text-blue-600" />
                  Step 2: Fund Parameters & Reporting Cadence
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Specify accounting standards and reporting frequencies required by your Limited Partners.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Target Fund Size */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Fund Size / Committed Capital <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹5,000 Cr INR"
                    className={`w-full rounded-xl bg-slate-50 border px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white transition-all ${
                      errors.targetSize
                        ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                        : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100'
                    }`}
                    value={formData.targetSize}
                    onChange={e => handleInputChange('targetSize', e.target.value)}
                  />
                  {errors.targetSize && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.targetSize}
                    </p>
                  )}
                </div>

                {/* Currency */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Reporting Base Currency <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all"
                    value={formData.reportingCurrency}
                    onChange={e => handleInputChange('reportingCurrency', e.target.value)}
                  >
                    <option value="INR">INR (₹) — Indian Rupee</option>
                    <option value="USD">USD ($) — US Dollar</option>
                    <option value="EUR">EUR (€) — Euro</option>
                    <option value="GBP">GBP (£) — British Pound</option>
                    <option value="CAD">CAD ($) — Canadian Dollar</option>
                  </select>
                </div>

                {/* Cadence */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Filing Cadence <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
                    value={formData.reportingCadence}
                    onChange={e => handleInputChange('reportingCadence', e.target.value)}
                  >
                    <option value="Quarterly">Quarterly Disclosures (Q1-Q4)</option>
                    <option value="Monthly">Monthly Financial Flash Reports</option>
                    <option value="Annual">Annual Comprehensive Tear-Sheet</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <UploadCloud size={22} className="text-blue-600" />
                  Step 3: Ingest Quarterly Portfolio Filing
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Upload raw portfolio company reports (CSV, PDF, Excel) for automated AI parsing and metric extraction.
                </p>
              </div>

              <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl p-8 text-center transition-all">
                <div className="mx-auto h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <UploadCloud size={24} />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Upload Q3 or Q4 Filing Document</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Drag and drop quarterly reports, or use our pre-seeded sample data for instant verification.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <Link
                    href="/documents"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition"
                  >
                    Open Document Uploader
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Pre-seeded demo dataset is ready for instant QoQ comparison in the workspace.</span>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles size={22} className="text-blue-600" />
                  Step 4: Launch Institutional Portal
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Your fund mandate, KPI triggers, and sample filings have been compiled and verified.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Managing Entity</span>
                  <span className="font-bold text-slate-900">{formData.companyName || 'Apex Horizon Capital'}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Fund Vehicle</span>
                  <span className="font-bold text-slate-900">{formData.fundName || 'Flagship Fund IV'}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Target Size</span>
                  <span className="font-bold text-slate-900">{formData.targetSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cadence / Currency</span>
                  <span className="font-bold text-slate-900">{formData.reportingCadence} • {formData.reportingCurrency}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center gap-3">
                <Sparkles size={18} className="text-blue-600 shrink-0" />
                <p>Click <strong>Launch Workspace</strong> below to open the live dashboard and generate investor tear-sheets.</p>
              </div>
            </div>
          )}

        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 pt-2">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition text-center"
          >
            <ArrowLeft size={16} className="inline-block mr-1.5" /> Back
          </button>

          <button
            onClick={handleNext}
            disabled={completing}
            className="w-full sm:w-auto justify-center px-6 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white text-sm font-bold rounded-xl shadow-md shadow-teal-500/20 flex items-center gap-2 transition"
          >
            {completing ? (
              'Launching Workspace...'
            ) : currentStep < STEPS.length ? (
              <>
                <span>Next Step</span>
                <ArrowRight size={16} />
              </>
            ) : (
              <>
                <span>Launch Workspace</span>
                <CheckCircle2 size={16} />
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
