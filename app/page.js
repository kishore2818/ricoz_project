'use client';

/**
 * Public Customer Landing Page (/)
 * Institutional, high-converting product landing page for Apex Horizon Capital PE LP Reporting Agent.
 * Embeds the exact 6-stage core institutional operating flow.
 */

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  UploadCloud,
  FileSearch,
  Brain,
  TrendingUp,
  ClipboardCheck,
  FileDown,
  Sparkles,
  ArrowRight,
  ArrowDown,
  Building2,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ChevronRight,
  Compass
} from 'lucide-react';

const OPERATING_FLOW_STEPS = [
  {
    step: '01',
    title: 'Upload company reports',
    subtitle: 'PDF, Excel, Word',
    desc: 'Drag & drop raw quarterly filings, board decks, and financial statements.',
    icon: UploadCloud,
    accent: 'blue',
    route: '/documents',
  },
  {
    step: '02',
    title: 'Read and understand documents',
    subtitle: 'Extract text, tables and financial information',
    desc: 'Automated OCR & parser reconstructs tables, balance sheets, and footnote disclosures with source grounding.',
    icon: FileSearch,
    accent: 'indigo',
    route: '/documents',
  },
  {
    step: '03',
    title: 'AI analysis',
    subtitle: 'Extract KPIs, analyze valuations and identify risks',
    desc: 'LLM agents extract Revenue, ARR, EBITDA, debt covenants, and flag high-risk operational overhangs.',
    icon: Brain,
    accent: 'cyan',
    route: '/analysis',
  },
  {
    step: '04',
    title: 'Compare quarterly performance',
    subtitle: 'Previous quarter vs current quarter',
    desc: 'Automated QoQ trend analysis, MoIC multiple expansions, and budget variance benchmarks.',
    icon: TrendingUp,
    accent: 'teal',
    route: '/kpi-analytics',
  },
  {
    step: '05',
    title: 'Human review and approval',
    subtitle: 'Verify AI-extracted information',
    desc: 'Senior analysts & reviewers audit extracted figures against source files and sign off before publication.',
    icon: ClipboardCheck,
    accent: 'purple',
    route: '/reviews',
  },
  {
    step: '06',
    title: 'Generate investor report',
    subtitle: 'Download professional PDF',
    desc: 'One-click generation of investor-ready LP disclosure packets and executive tear-sheets.',
    icon: FileDown,
    accent: 'emerald',
    route: '/reports',
  },
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white font-black text-base flex items-center justify-center shadow-md shadow-blue-500/25">
              AP
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base tracking-tight block">
                APEX HORIZON CAPITAL
              </span>
              <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider block">
                PE LP Reporting & Intelligence Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all"
              >
                Go to Dashboard
                <ArrowRight size={15} />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all group"
                >
                  <span>Start Onboarding</span>
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-white via-blue-50/20 to-slate-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-200/40 via-indigo-100/30 to-cyan-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] opacity-35 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles size={14} className="text-blue-600" />
            <span>Institutional AI Document Intelligence</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-slate-500 font-normal">Q3 2026 Reporting Cadence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
            Institutional LP Reporting, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
              Reconciled & Audit-Ready in Minutes.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-9 font-normal">
            Automate ingestion of quarterly portfolio company statements, extract audit-traceable financial KPIs, verify MoIC valuations, and publish investor-grade LP packages with dual-signoff governance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-12">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-sm font-bold text-white shadow-xl shadow-blue-500/25 transition-all group"
            >
              <Compass size={17} />
              <span>Explore Client Onboarding</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-sm font-bold text-slate-800 shadow-xs transition-all"
            >
              <Lock size={16} className="text-slate-500" />
              <span>Institutional Sign In</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>ILPA Compliant Disclosures</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-600" />
              <span>SOC2 Type II Certified</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5">
              <Building2 size={16} className="text-indigo-600" />
              <span>Supporting Flagship Fund IV ($750M)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core System Architecture & Workflow Pipeline */}
      <section className="py-20 px-6 bg-[#070D1D] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
              End-to-End Operating Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              How the Platform Operates
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Every document uploaded to this site follows this strict 6-stage institutional workflow from ingestion to signed LP pack.
            </p>
          </div>

          {/* Sequential 6-Stage Process Column */}
          <div className="space-y-4">
            {OPERATING_FLOW_STEPS.map((item, idx) => {
              const Icon = item.icon;
              const isLast = idx === OPERATING_FLOW_STEPS.length - 1;
              return (
                <div key={item.step} className="flex flex-col items-center">
                  {/* Step Card */}
                  <div className="w-full bg-[#0D152A] border border-slate-800 hover:border-blue-500/60 rounded-2xl p-5 sm:p-6 transition-all duration-200 group shadow-lg">
                    <div className="flex items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-600/25 transition-all">
                          <Icon size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                              Stage {item.step}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 font-medium">
                            {item.subtitle}
                          </p>
                          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={user ? item.route : '/login'}
                        className="shrink-0 hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                      >
                        <span>Open {item.route.replace('/', '')}</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  {!isLast && (
                    <div className="py-2 text-blue-500/70 flex items-center justify-center">
                      <ArrowDown size={18} className="animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Onboarding Walkthrough Teaser */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-50 to-blue-50/40 border-b border-slate-200">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                Customer Setup
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                Ready to Onboard Your Fund?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Walk through our 4-step wizard to define your fund strategy, set disclosure KPI triggers, ingest sample filings, and experience live AI-powered LP packet generation.
              </p>
              
              <div className="flex items-center gap-3">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all"
                >
                  <span>Launch Onboarding Wizard</span>
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-auto shrink-0 bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px]">1</div>
                <span>Configure Fund Vehicle & Target Size</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px]">2</div>
                <span>Select Reporting KPIs & Covenants</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px]">3</div>
                <span>Ingest Quarterly Portfolio Filings</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <div className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px]">✓</div>
                <span>Review & Launch Reporting Workspace</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Institutional Footer */}
      <footer className="py-10 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Apex Horizon Capital</span>
            <span>• LP Quarterly Reporting & Intelligence Platform</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/onboarding" className="hover:text-blue-600 transition-colors">Onboarding</Link>
            <Link href="/login" className="hover:text-blue-600 transition-colors">Sign In</Link>
            <Link href="/register" className="hover:text-blue-600 transition-colors">Register</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
