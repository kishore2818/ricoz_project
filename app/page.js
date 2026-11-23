'use client';

/**
 * Public Customer Landing Page (/)
 * Institutional, high-converting product landing page for Ricoz PE LP Reporting Agent.
 * Elevated with ambient mesh background effects, live interactive simulation, and Indian Rupee (₹) metrics.
 */

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
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
  Compass,
  Check,
  Activity,
  Layers,
  Zap,
} from 'lucide-react';

const OPERATING_FLOW_STEPS = [
  {
    step: '01',
    title: 'Upload Company Filings',
    subtitle: 'PDF, Excel, Word & Scanned Statements',
    desc: 'Drag & drop quarterly financial statements, board presentations, and debt covenant schedules.',
    icon: UploadCloud,
    badge: 'Multi-Format Parser',
    route: '/documents',
  },
  {
    step: '02',
    title: 'OCR Ingestion & Reconstruct',
    subtitle: 'Extract text, tables and footnotes with source grounding',
    desc: 'High-precision OCR reconstructs complex income statements, balance sheets, and footnote disclosures with source grounding.',
    icon: FileSearch,
    badge: 'Audit Traceable',
    route: '/documents',
  },
  {
    step: '03',
    title: 'AI Intelligence Analysis',
    subtitle: 'Extract KPIs, calculate valuations and detect risks',
    desc: 'LLM agents automatically compute Revenue, ARR, EBITDA, debt coverage, and flag operational risks.',
    icon: Brain,
    badge: 'Zod Schema Validated',
    route: '/analysis',
  },
  {
    step: '04',
    title: 'Performance Benchmarking',
    subtitle: 'QoQ trend analysis & MoIC valuation multiple expansions',
    desc: 'Automated QoQ trend analysis, MoIC multiple expansions, and budget variance benchmarks across portfolio companies.',
    icon: TrendingUp,
    badge: 'MoIC / IRR Engine',
    route: '/kpi-analytics',
  },
  {
    step: '05',
    title: 'Dual-Signoff Verification',
    subtitle: 'Human-in-the-loop review before publication',
    desc: 'Senior fund analysts & LP compliance reviewers audit every extracted figure against original source files before publishing.',
    icon: ClipboardCheck,
    badge: 'ILPA Standard',
    route: '/reviews',
  },
  {
    step: '06',
    title: 'Generate Investor Packets',
    subtitle: '1-Click institutional PDF LP disclosure packet',
    desc: 'Export formal, institutional LP packets complete with executive summaries, portfolio valuation tear-sheets, and audit logs.',
    icon: FileDown,
    badge: 'Institutional PDFKit',
    route: '/reports',
  },
];

const SAMPLE_PORTFOLIO_ROWS = [
  { name: 'CloudSync Solutions', sector: 'Enterprise SaaS', inv: '₹375 Cr', val: '₹518 Cr', moic: '1.38x', status: 'Audit Verified' },
  { name: 'BioPulse Diagnostics', sector: 'HealthTech AI', inv: '₹318 Cr', val: '₹414 Cr', moic: '1.30x', status: 'Signed Off' },
  { name: 'NexPay Logistics Platform', sector: 'FinTech Rails', inv: '₹435 Cr', val: '₹570 Cr', moic: '1.31x', status: 'Approved' },
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-teal-500 selection:text-white relative overflow-hidden">
      
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section with Ambient Glow & Architectural Grid */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-24 lg:pb-32 border-b border-slate-200/80 bg-gradient-to-b from-white via-teal-50/25 to-[#F8FAFC]">
        
        {/* Behind-the-Screens Ambient Glow Orbs (Visible / Allvue Style) */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] max-w-full h-[450px] bg-gradient-to-tr from-teal-200/35 via-cyan-200/25 to-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-48 left-1/4 w-[350px] h-[350px] bg-teal-300/15 rounded-full blur-2xl pointer-events-none" />
        
        {/* Subtle Micro-Grid Pattern */}
        <div className="absolute inset-0 bg-grid-fintech opacity-45 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-6 shadow-sm shadow-teal-500/10 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span className="font-bold tracking-wide">Next-Gen PE LP Reporting Agent</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">Q3 2026 Reporting Cadence</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Institutional LP Reporting, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-600">
              Reconciled & Audit-Ready in Minutes.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Automate ingestion of quarterly portfolio company filings, extract audit-traceable financial KPIs in Indian Rupees (<strong className="font-semibold text-slate-800">₹</strong>), verify MoIC valuations, and publish investor-grade LP packets with dual-signoff governance.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-14">
            <Link
              href="/customer-onboarding"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 active:scale-[0.99] text-sm font-bold text-white shadow-xl shadow-teal-500/25 transition-all group"
            >
              <Compass size={18} />
              <span>Start Fund Onboarding</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-sm font-bold text-slate-800 shadow-sm transition-all"
            >
              <Lock size={16} className="text-teal-600" />
              <span>Enter Portal</span>
            </Link>
          </div>

          {/* Trust Badges Bar */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-xs">
              <ShieldCheck size={16} className="text-teal-600" />
              <span>ILPA Compliant Disclosures</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-xs">
              <CheckCircle2 size={16} className="text-cyan-600" />
              <span>SOC2 Type II Governance</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-xs">
              <Building2 size={16} className="text-indigo-600" />
              <span>Managing Flagship Fund IV (₹6,250 Cr)</span>
            </div>
          </div>

          {/* 3. Interactive Platform Simulation Card (Chronograph / Visible Style) */}
          <div className="mt-14 sm:mt-18 text-left max-w-5xl mx-auto rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-300/50 p-4 sm:p-7 transition-all">
            
            {/* Window Top Bar */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-semibold text-slate-500 hidden sm:inline">
                  Ricoz Intelligence • Portfolio Monitoring & LP Packet Preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                  <Activity size={12} className="text-teal-600" />
                  Live Sync
                </span>
                <span className="text-xs text-slate-400 font-mono">Q3 2026</span>
              </div>
            </div>

            {/* KPI Cards Row (In Indian Rupees ₹) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Fund AUM</p>
                <p className="text-xl sm:text-2xl font-bold font-mono text-slate-900 mt-1">₹6,250 Cr</p>
                <p className="text-[11px] text-teal-600 font-medium mt-1">Fund IV Vintage 2024</p>
              </div>

              <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Current Valuation</p>
                <p className="text-xl sm:text-2xl font-bold font-mono text-slate-900 mt-1">₹8,450 Cr</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-1">+18.4% YoY Expansion</p>
              </div>

              <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Net Portfolio MoIC</p>
                <p className="text-xl sm:text-2xl font-bold font-mono text-slate-900 mt-1">1.65x</p>
                <p className="text-[11px] text-cyan-600 font-medium mt-1">Target: 2.2x</p>
              </div>

              <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Dual-Signoff Status</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">100%</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-1">LP Packet Ready</p>
              </div>
            </div>

            {/* Simulated Live Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200/80">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/90 text-slate-600 font-semibold uppercase text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Portfolio Company</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Industry Sector</th>
                    <th className="py-3 px-4">Invested</th>
                    <th className="py-3 px-4">Marked Valuation</th>
                    <th className="py-3 px-4 hidden md:table-cell">MoIC</th>
                    <th className="py-3 px-4">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {SAMPLE_PORTFOLIO_ROWS.map((row) => (
                    <tr key={row.name} className="hover:bg-teal-50/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        {row.name}
                      </td>
                      <td className="py-3 px-4 text-slate-500 hidden sm:table-cell">{row.sector}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-700">{row.inv}</td>
                      <td className="py-3 px-4 font-mono font-bold text-teal-700">{row.val}</td>
                      <td className="py-3 px-4 font-mono text-slate-700 hidden md:table-cell">{row.moic}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                          <Check size={12} />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Simulation Action Footer */}
            <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <span>Grounding: 3 source filings ingested • OCR verified against balance sheets</span>
              <Link
                href="/reports"
                className="inline-flex items-center gap-1.5 font-bold text-teal-600 hover:text-teal-700"
              >
                <span>Preview ILPA LP Packet PDF</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core System Architecture & 6-Stage Operating Flow */}
      <section id="flow" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#090D18] text-white relative overflow-hidden">
        
        {/* Background glow lines & micro grid */}
        <div className="absolute inset-0 bg-grid-fintech opacity-15 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14 sm:mb-18">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-4">
              <Zap size={14} className="text-teal-400" />
              End-to-End Operating Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              The 6-Stage Institutional Workflow
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Every document uploaded to Ricoz follows this strict, audit-grounded sequence from ingestion to approved LP packet generation.
            </p>
          </div>

          {/* Sequential 6-Stage Process Cards */}
          <div className="space-y-4">
            {OPERATING_FLOW_STEPS.map((item, idx) => {
              const Icon = item.icon;
              const isLast = idx === OPERATING_FLOW_STEPS.length - 1;
              return (
                <div key={item.step} className="flex flex-col items-center">
                  
                  {/* Step Card */}
                  <div className="w-full bg-[#0E1526]/90 border border-slate-800/90 hover:border-teal-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-200 group shadow-lg hover:shadow-teal-500/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      <div className="flex items-start sm:items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-500/30 transition-all">
                          <Icon size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 px-2 py-0.5 rounded-md bg-teal-950/70 border border-teal-800/60">
                              Stage {item.step}
                            </span>
                            <span className="text-[11px] font-medium text-slate-400">
                              {item.badge}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                            {item.subtitle}
                          </p>
                          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed max-w-2xl">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={user ? item.route : '/login'}
                        className="self-start sm:self-center shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-slate-700/60 hover:border-teal-500"
                      >
                        <span>Open {item.route.replace('/', '')}</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  {!isLast && (
                    <div className="py-2.5 text-teal-400/60 flex items-center justify-center">
                      <ArrowDown size={18} className="animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Onboarding Call To Action */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] to-teal-50/30 border-b border-slate-200">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-6 sm:p-10 md:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3.5 border border-teal-200">
                Institutional Fund Setup
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3.5">
                Ready to Onboard Your Fund?
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                Walk through our 4-step setup wizard to configure your fund vehicle, establish reporting covenants in Indian Rupees (₹), ingest portfolio filings, and generate your first LP packet.
              </p>
              
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/customer-onboarding"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-sm font-bold text-white shadow-md shadow-teal-500/25 transition-all"
                >
                  <span>Launch Onboarding Wizard</span>
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="w-full lg:w-auto shrink-0 bg-slate-50/80 border border-slate-200 p-6 rounded-2xl space-y-3.5">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="h-6 w-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">1</div>
                <span>Configure Fund Vehicle & Target (₹ Cr)</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="h-6 w-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">2</div>
                <span>Select Reporting KPIs & Covenants</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="h-6 w-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">3</div>
                <span>Ingest Quarterly Portfolio Filings</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">✓</div>
                <span>Dual-Review & Publish LP Packets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <Footer />

    </div>
  );
}
