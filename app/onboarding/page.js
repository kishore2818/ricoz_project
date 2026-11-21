'use client';

/**
 * Customer Onboarding Landing Page
 * Institutional 4-step walkthrough for newly onboarded PE fund managers, LPs, and analysts.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Building2,
  Landmark,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  UploadCloud,
  FileCheck2,
  Users,
  Compass,
  AlertCircle
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Fund Vehicle', desc: 'Primary fund & strategy' },
  { id: 2, title: 'KPI Benchmarks', desc: 'Reporting metrics' },
  { id: 3, title: 'Ingest Filing', desc: 'Quarterly document' },
  { id: 4, title: 'Launch Portal', desc: 'Audit & verification' }
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [completing, setCompleting] = useState(false);
  const [errors, setErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    fundName: 'Apex Horizon Flagship Fund IV',
    fundStrategy: 'Growth Equity & Mid-Market Buyout',
    targetSize: '$750M USD',
    reportingCurrency: 'USD ($)',
    reportingCadence: 'Quarterly (Q3 2026)',
    selectedKPIs: ['ARR Growth', 'EBITDA Margin', 'MoIC Multiple', 'Net Debt / EBITDA', 'Rule of 40'],
    initialPortfolioCompany: 'CloudSync Technologies Inc.',
    sector: 'Enterprise B2B SaaS',
    sampleDataset: true
  });

  const availableKPIs = [
    { id: 'ARR Growth', label: 'ARR / Revenue Growth', group: 'Topline' },
    { id: 'EBITDA Margin', label: 'EBITDA Margin %', group: 'Profitability' },
    { id: 'MoIC Multiple', label: 'Gross / Net MoIC', group: 'Returns' },
    { id: 'Net Debt / EBITDA', label: 'Leverage Covenants', group: 'Risk' },
    { id: 'Rule of 40', label: 'Rule of 40 Score', group: 'Efficiency' },
    { id: 'Gross Margin', label: 'Gross Margin %', group: 'Profitability' },
    { id: 'Customer Churn', label: 'Net Revenue Retention', group: 'Retention' },
    { id: 'Cash Runway', label: 'Cash Runway (Months)', group: 'Solvency' }
  ];

  function toggleKPI(kpi) {
    setFormData(prev => {
      const exists = prev.selectedKPIs.includes(kpi);
      if (exists) {
        return { ...prev, selectedKPIs: prev.selectedKPIs.filter(k => k !== kpi) };
      }
      return { ...prev, selectedKPIs: [...prev.selectedKPIs, kpi] };
    });
  }

  function validateStep() {
    const errs = {};
    if (currentStep === 1) {
      if (!formData.fundName.trim()) errs.fundName = 'Fund Name is required';
      if (!formData.fundStrategy.trim()) errs.fundStrategy = 'Investment Strategy is required';
      if (!formData.targetSize.trim()) errs.targetSize = 'Committed Capital / Target Size is required';
    }
    if (currentStep === 2) {
      if (formData.selectedKPIs.length === 0) errs.kpis = 'Please select at least one reporting KPI';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleInputChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  }

  function handleNext() {
    if (!validateStep()) return;

    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishOnboarding();
    }
  }

  function handleBack() {
    setErrors({});
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }

  function finishOnboarding() {
    setCompleting(true);
    // Mark completed in localStorage for user session
    if (typeof window !== 'undefined') {
      localStorage.setItem('pe_onboarded', 'true');
    }
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-100 text-slate-800 antialiased font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Institutional Header */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white font-black text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
              AP
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm tracking-tight block">
                APEX HORIZON CAPITAL
              </span>
              <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider block">
                Client Onboarding Wizard
              </span>
            </div>
          </div>

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

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        
        {/* Welcome Callout Banner */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <Compass size={14} className="text-blue-600" />
            Institutional Fast-Track Onboarding
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Configure Your Fund Reporting Portal
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Set up your investment vehicle, configure audit-traceable KPIs, and experience automated LP report generation in 4 simple steps.
          </p>
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {STEPS.map(step => {
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-white border-blue-500 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20'
                    : isDone
                    ? 'bg-blue-50/50 border-blue-200 text-slate-700'
                    : 'bg-white/60 border-slate-200 text-slate-400 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${isCurrent ? 'text-blue-600' : isDone ? 'text-slate-600' : 'text-slate-400'}`}>
                    Step {step.id}
                  </span>
                  {isDone ? (
                    <CheckCircle2 size={16} className="text-blue-600" />
                  ) : (
                    <span className={`h-2 w-2 rounded-full ${isCurrent ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`} />
                  )}
                </div>
                <div className="text-sm font-bold text-slate-900">{step.title}</div>
                <div className="text-[11px] text-slate-500 truncate">{step.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Step Content Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-10 mb-8 transition-all">
          
          {/* STEP 1: Fund Vehicle Configuration */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
                  <Landmark className="text-blue-600" size={22} />
                  Step 1: Primary Fund Vehicle & Mandate
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Specify the flagship private equity fund that will anchor your portfolio company reports.
                </p>
              </div>

              {/* Form Error Banner */}
              {Object.keys(errors).length > 0 && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5 mb-2">
                  <AlertCircle size={16} className="text-red-600 shrink-0" />
                  <span>Please fill in all required fields marked with an asterisk (<span className="text-red-500 font-bold">*</span>) before proceeding.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Fund Name <span className="text-red-500 font-bold ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fundName}
                    onChange={e => handleInputChange('fundName', e.target.value)}
                    className={`w-full rounded-xl bg-slate-50 border px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:bg-white transition-all ${
                      errors.fundName
                        ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                        : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100'
                    }`}
                  />
                  {errors.fundName && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.fundName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Investment Strategy <span className="text-red-500 font-bold ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fundStrategy}
                    onChange={e => handleInputChange('fundStrategy', e.target.value)}
                    className={`w-full rounded-xl bg-slate-50 border px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:bg-white transition-all ${
                      errors.fundStrategy
                        ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                        : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100'
                    }`}
                  />
                  {errors.fundStrategy && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.fundStrategy}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Committed Capital / Target Size <span className="text-red-500 font-bold ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.targetSize}
                    onChange={e => handleInputChange('targetSize', e.target.value)}
                    className={`w-full rounded-xl bg-slate-50 border px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:bg-white transition-all ${
                      errors.targetSize
                        ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                        : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100'
                    }`}
                  />
                  {errors.targetSize && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.targetSize}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Reporting Cadence <span className="text-red-500 font-bold ml-1">*</span>
                  </label>
                  <select
                    value={formData.reportingCadence}
                    onChange={e => handleInputChange('reportingCadence', e.target.value)}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
                  >
                    <option>Quarterly (Q3 2026)</option>
                    <option>Quarterly (Q4 2026)</option>
                    <option>Annual Disclosure (FY 2026)</option>
                    <option>Monthly Flash Monitoring</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex items-start gap-3">
                <ShieldCheck size={20} className="text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Institutional Governance Notice:</strong> All fund vehicles created are secured with immutable audit logs compliant with ILPA (Institutional Limited Partners Association) disclosure standards.
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: KPI & Valuation Preferences */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
                  <BarChart3 className="text-blue-600" size={22} />
                  Step 2: Core KPI Metrics & Valuation Triggers
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Select the metrics your LP Advisory Committee (LPAC) expects in quarterly disclosure packs.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Selected Disclosure Metrics ({formData.selectedKPIs.length} Active) <span className="text-red-500 font-bold ml-1">*</span>
                </label>
                {errors.kpis && (
                  <p className="text-xs text-red-600 font-medium mb-3 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.kpis}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableKPIs.map(kpi => {
                    const isSelected = formData.selectedKPIs.includes(kpi.id);
                    return (
                      <button
                        key={kpi.id}
                        type="button"
                        onClick={() => toggleKPI(kpi.id)}
                        className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-1 ring-blue-500/30'
                            : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900">{kpi.label}</div>
                          <div className="text-[11px] text-slate-500">{kpi.group} metric</div>
                        </div>
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center border ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                          {isSelected && <CheckCircle2 size={13} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <TrendingUp size={20} className="text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 leading-relaxed">
                  The AI extraction pipeline automatically parses these targets from raw financials and benchmarks QoQ variances against your valuation model.
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Initial Filing Ingestion */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
                  <UploadCloud className="text-blue-600" size={22} />
                  Step 3: Ingest First Portfolio Company Filing
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Upload raw quarterly financial statements (PDF, Excel, or CSV) for automated OCR and KPI extraction.
                </p>
              </div>

              {/* Sample Filing Option */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <FileSpreadsheet size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        Pre-loaded Sample: CloudSync Q3 2026 Filing
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        Contains Q3 revenue ($28.4M), ARR ($42.1M), gross margin (78%), and EBITDA covenant disclosures.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-blue-600 text-white rounded-md shadow-xs shrink-0">
                    Recommended
                  </span>
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-colors">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <UploadCloud size={24} />
                </div>
                <div className="text-sm font-bold text-slate-900">
                  Drag and drop quarterly files here
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Supports PDF, XLSX, CSV, and DOCX up to 50MB
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
                  >
                    Select File From Device
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Platform Launch */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
                  <Sparkles className="text-blue-600" size={22} />
                  Step 4: Audit Verification & Launch Portal
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Review your configured setup. You can adjust settings or add additional funds at any time.
                </p>
              </div>

              {/* Summary of Configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Fund Vehicle
                  </span>
                  <div className="text-sm font-bold text-slate-900 mt-1">{formData.fundName}</div>
                  <div className="text-xs text-blue-600 font-medium mt-0.5">{formData.fundStrategy} • {formData.targetSize}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Active Reporting Cadence
                  </span>
                  <div className="text-sm font-bold text-slate-900 mt-1">{formData.reportingCadence}</div>
                  <div className="text-xs text-emerald-600 font-medium mt-0.5">Automated LP PDF Generation Ready</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Configured Disclosure Metrics ({formData.selectedKPIs.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedKPIs.map(kpi => (
                      <span key={kpi} className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                        {kpi}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Final Ready Box */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <FileCheck2 size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">Platform Environment Validated</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Your environment is pre-configured with sample portfolio holdings, valuation models, and audit sign-off workflows.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Footer Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-8">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft size={16} />
                Previous Step
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={completing}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition-all cursor-pointer group"
            >
              {completing ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Launching Workspace...</span>
                </div>
              ) : currentStep === 4 ? (
                <>
                  <span>Complete Setup & Enter Portal</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  <span>Continue to Step {currentStep + 1}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Trust & Compliance Footer */}
        <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck size={15} className="text-emerald-600" />
          <span>ILPA Compliant • SOC2 Type II Certified • 256-Bit Bank-Grade Encryption</span>
        </div>
      </main>
    </div>
  );
}

