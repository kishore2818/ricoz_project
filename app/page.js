'use client';

/**
 * Public Visitor & Customer Landing Page (/)
 * Institutional, high-converting product landing page for Ricoz PE LP Intelligence Agent.
 * Modeled after top private equity reporting leaders:
 * - Chronograph: Source-grounded audit trace & page-level OCR grounding
 * - Allvue Systems: Institutional cash flow & fund return engine (DPI, TVPI, RVPI, Net IRR in ₹)
 * - Juniper Square: Dedicated self-service LP reporting portal
 * - Carta: Valuation multiple expansion, cap tables & disclosure packets
 * - Visible.vc: Automated portfolio CFO data collection workflows
 *
 * Fully responsive:
 * - 2 cards per row on mobile, 2 to 3 on desktop
 * - Two-line balanced questions for all FAQs
 * - Unified Indian Rupee (₹ Cr / ₹ L) figures
 */

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  ChevronDown,
  Compass,
  Check,
  X,
  Activity,
  Layers,
  Zap,
  FileSpreadsheet,
  Database,
  PieChart,
  FileText,
  Clock,
  ExternalLink,
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

const BENCHMARK_CAPABILITIES = [
  {
    benchmark: 'Chronograph Style',
    title: 'Audit-Grounded OCR Verification',
    desc: 'Every extracted KPI links directly to the source filing page, table coordinates, and raw footnote disclosure.',
    icon: FileSearch,
    badge: 'Page Traceability',
    highlight: '99.4% Extraction Precision',
  },
  {
    benchmark: 'Allvue Systems Style',
    title: 'Fund Returns & Cash Flow Engine',
    desc: 'Track capital calls, distributions, Net IRR (22.4%), DPI (0.72x), and TVPI (1.65x) modeled in Indian Rupees (₹ Cr).',
    icon: BarChart3,
    badge: 'IRR & Waterfall',
    highlight: 'Real-Time Reconciled',
  },
  {
    benchmark: 'Carta Style',
    title: 'Valuation & Multiple Expansion',
    desc: 'Automated MoIC multiple analysis, enterprise valuation marks, and ownership dilution tracking across portfolio cohorts.',
    icon: TrendingUp,
    badge: 'Multiple Tracking',
    highlight: '1.65x Portfolio MoIC',
  },
  {
    benchmark: 'Visible.vc Style',
    title: 'Automated CFO Filing Requests',
    desc: 'Standardized quarterly collection workflows that turn messy portfolio company uploads into structured data pipelines.',
    icon: UploadCloud,
    badge: 'Data Pipelines',
    highlight: 'Zero Data Entry',
  },
  {
    benchmark: 'Juniper Square Style',
    title: 'LP Investor Portal & Packet Exports',
    desc: 'Institutional self-service access for limited partners with 1-click ILPA-aligned quarterly disclosure packet PDFs.',
    icon: FileDown,
    badge: 'ILPA Compliance',
    highlight: 'Audit-Ready PDFs',
  },
  {
    benchmark: 'Institutional Governance',
    title: 'Dual-Signoff Approval Gate',
    desc: 'Strict 4-eyes principle where Analysts submit and Compliance Reviewers sign off before metrics reach the LP deck.',
    icon: ShieldCheck,
    badge: 'Admin Gatekeeper',
    highlight: 'SOC2 & ILPA Aligned',
  },
];

const FAQ_ITEMS = [
  {
    qLine1: 'How does Ricoz extract financial metrics',
    qLine2: 'from unstructured quarterly PDF statements?',
    answer:
      'Ricoz utilizes high-precision OCR paired with domain-specific LLM parsers. It reconstructs balance sheets, profit & loss statements, and footnote disclosures, extracting key metrics (ARR, EBITDA, Cash Runway, Gross Margin) into validated JSON schemas while anchoring every number to its exact page coordinate.',
  },
  {
    qLine1: 'Why does the platform enforce dual-signoff',
    qLine2: 'governance before publishing LP packets?',
    answer:
      'Institutional private equity reporting requires zero-defect accuracy. Ricoz implements the 4-eyes principle: a Fund Analyst inspects and verifies the AI extractions against source documents, and a Senior Compliance Reviewer must provide counter-signoff before any metric can be published to LPs.',
  },
  {
    qLine1: 'How are currency conversions and fund metrics',
    qLine2: 'tracked in Indian Rupee (₹ Cr / ₹ L) figures?',
    answer:
      'All fund commitments, portfolio valuations, quarterly distributions, and EBITDA multiples are automatically converted and formatted in Indian Rupee standards (₹ Crores and ₹ Lakhs) with full support for dual-currency multi-currency LP reporting.',
  },
  {
    qLine1: 'What administrative approval is needed',
    qLine2: 'before new analyst and reviewer accounts activate?',
    answer:
      'When new Analysts and Reviewers register, their accounts are automatically placed in a "Pending Signoff" state. An active Fund Administrator must review and approve their credentials on the Users portal before they can log in and access portfolio intelligence.',
  },
  {
    qLine1: 'How does source grounding trace numbers',
    qLine2: 'directly back to the original filing footnote?',
    answer:
      'Like Chronograph, clicking any metric inside the Ricoz platform reveals its source filing name, exact page number, bounding coordinates, and confidence score. This eliminates audit disputes during LP annual reviews and statutory fund audits.',
  },
  {
    qLine1: 'Can LPs self-service and export ILPA-compliant',
    qLine2: 'quarterly valuation packets and PDFs?',
    answer:
      'Yes. Approved quarterly data can be compiled in 1 click into high-resolution, institutional-grade PDF investor packets formatted to ILPA reporting guidelines, containing portfolio tear-sheets, variance commentary, and auditor signoff stamps.',
  },
];

export default function LandingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-teal-500 selection:text-white relative overflow-hidden">
      
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section with Ambient Glow & Architectural Grid */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 border-b border-slate-200/80 bg-gradient-to-b from-white via-teal-50/20 to-[#F8FAFC]">
        
        {/* Behind-the-Screens Ambient Glow Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] max-w-full h-[450px] bg-gradient-to-tr from-teal-200/35 via-cyan-200/25 to-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-48 left-1/4 w-[350px] h-[350px] bg-teal-300/15 rounded-full blur-2xl pointer-events-none" />
        
        {/* Subtle Micro-Grid Pattern */}
        <div className="absolute inset-0 bg-grid-fintech opacity-45 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-teal-200/80 text-teal-800 text-[11px] sm:text-xs font-semibold mb-6 shadow-sm shadow-teal-500/10 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span className="font-bold tracking-wide">Next-Gen PE LP Reporting Agent</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">Q3 2026 Reporting Cadence</span>
          </div>

          {/* Main Hero Headline - Exactly balanced in two lines */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.15] mb-5 sm:mb-6">
            <span className="block">Institutional LP Reporting,</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-600">
              Reconciled &amp; Audit-Ready in Minutes.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
            Automate ingestion of quarterly portfolio company filings, extract audit-traceable financial KPIs in Indian Rupees (<strong className="font-semibold text-slate-800">₹</strong>), verify MoIC valuations, and publish investor-grade LP packets with dual-signoff governance.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-10 sm:mb-14">
            <Link
              href="/customer-onboarding"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 active:scale-[0.99] text-sm font-bold text-white shadow-xl shadow-teal-500/25 transition-all group"
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
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/70 shadow-xs">
              <ShieldCheck size={15} className="text-teal-600" />
              <span>ILPA Compliant Disclosures</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/70 shadow-xs">
              <CheckCircle2 size={15} className="text-cyan-600" />
              <span>SOC2 Type II Governance</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/70 shadow-xs">
              <Building2 size={15} className="text-indigo-600" />
              <span>Managing Flagship Fund IV (₹6,250 Cr)</span>
            </div>
          </div>

          {/* 3. Interactive Multi-Tab Platform Simulation (Chronograph / Allvue / Visible) */}
          <div className="mt-12 sm:mt-16 text-left max-w-5xl mx-auto rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-300/50 p-3.5 sm:p-6 transition-all">
            
            {/* Window Top Header & Mode Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-4 border-b border-slate-100 gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-bold text-slate-700">
                    Ricoz PE Intelligence Platform
                  </span>
                </div>
                <div className="sm:hidden">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                    Live Demo
                  </span>
                </div>
              </div>

              {/* Mode Tabs */}
              <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                    activeTab === 'portfolio'
                      ? 'bg-white text-teal-800 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Portfolio Monitoring
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                    activeTab === 'audit'
                      ? 'bg-white text-teal-800 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  AI OCR &amp; Audit Trace
                </button>
                <button
                  onClick={() => setActiveTab('returns')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                    activeTab === 'returns'
                      ? 'bg-white text-teal-800 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Fund Cash Flows &amp; IRR
                </button>
                <button
                  onClick={() => setActiveTab('ilpa')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                    activeTab === 'ilpa'
                      ? 'bg-white text-teal-800 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ILPA LP Packet
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: PORTFOLIO MONITORING */}
            {activeTab === 'portfolio' && (
              <div>
                {/* Metric Summary Cards: 2 on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-4">
                  <div className="bg-slate-50/90 rounded-xl p-2.5 sm:p-3 border border-slate-200/70">
                    <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Fund IV AUM</p>
                    <p className="text-base sm:text-xl font-bold font-mono text-slate-900 mt-0.5">₹6,250 Cr</p>
                    <p className="text-[10px] text-teal-600 font-medium mt-0.5">Vintage 2024</p>
                  </div>

                  <div className="bg-slate-50/90 rounded-xl p-2.5 sm:p-3 border border-slate-200/70">
                    <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Current Mark</p>
                    <p className="text-base sm:text-xl font-bold font-mono text-slate-900 mt-0.5">₹8,450 Cr</p>
                    <p className="text-[10px] text-emerald-600 font-medium mt-0.5">+18.4% YoY</p>
                  </div>

                  <div className="bg-slate-50/90 rounded-xl p-2.5 sm:p-3 border border-slate-200/70">
                    <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Net MoIC</p>
                    <p className="text-base sm:text-xl font-bold font-mono text-slate-900 mt-0.5">1.65x</p>
                    <p className="text-[10px] text-cyan-600 font-medium mt-0.5">Target: 2.2x</p>
                  </div>

                  <div className="bg-slate-50/90 rounded-xl p-2.5 sm:p-3 border border-slate-200/70">
                    <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Dual-Signoff</p>
                    <p className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">100%</p>
                    <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Q3 Verified</p>
                  </div>
                </div>

                {/* Mobile Cards (2 per row on mobile) */}
                <div className="grid grid-cols-2 gap-2 sm:hidden mb-3">
                  <div className="bg-slate-50/90 p-2.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">Verified</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 truncate">CloudSync Sol.</p>
                      <p className="text-[10px] text-slate-500">Enterprise SaaS</p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-slate-200/60">
                      <p className="text-[10px] text-slate-400">Valuation: <strong className="text-teal-700 font-mono">₹518 Cr</strong></p>
                      <p className="text-[10px] text-slate-500">MoIC: <strong className="text-slate-800 font-mono">1.38x</strong></p>
                    </div>
                  </div>

                  <div className="bg-slate-50/90 p-2.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">Signed Off</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 truncate">BioPulse Diag.</p>
                      <p className="text-[10px] text-slate-500">HealthTech AI</p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-slate-200/60">
                      <p className="text-[10px] text-slate-400">Valuation: <strong className="text-teal-700 font-mono">₹414 Cr</strong></p>
                      <p className="text-[10px] text-slate-500">MoIC: <strong className="text-slate-800 font-mono">1.30x</strong></p>
                    </div>
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200/80">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3.5">Portfolio Company</th>
                        <th className="py-2.5 px-3.5">Sector</th>
                        <th className="py-2.5 px-3.5">Invested (₹)</th>
                        <th className="py-2.5 px-3.5">Current Mark (₹)</th>
                        <th className="py-2.5 px-3.5">MoIC</th>
                        <th className="py-2.5 px-3.5 text-right">Signoff</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      <tr className="hover:bg-teal-50/30 transition">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-teal-500" />
                          CloudSync Solutions
                        </td>
                        <td className="py-2.5 px-3.5 text-slate-500">Enterprise SaaS</td>
                        <td className="py-2.5 px-3.5 font-mono text-slate-700">₹375 Cr</td>
                        <td className="py-2.5 px-3.5 font-mono font-bold text-teal-700">₹518 Cr</td>
                        <td className="py-2.5 px-3.5 font-mono text-slate-700">1.38x</td>
                        <td className="py-2.5 px-3.5 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20">
                            <Check size={11} /> Verified
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-teal-50/30 transition">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-teal-500" />
                          BioPulse Diagnostics
                        </td>
                        <td className="py-2.5 px-3.5 text-slate-500">HealthTech AI</td>
                        <td className="py-2.5 px-3.5 font-mono text-slate-700">₹318 Cr</td>
                        <td className="py-2.5 px-3.5 font-mono font-bold text-teal-700">₹414 Cr</td>
                        <td className="py-2.5 px-3.5 font-mono text-slate-700">1.30x</td>
                        <td className="py-2.5 px-3.5 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20">
                            <Check size={11} /> Signed Off
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-teal-50/30 transition">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-teal-500" />
                          NexPay Logistics Platform
                        </td>
                        <td className="py-2.5 px-3.5 text-slate-500">FinTech Rails</td>
                        <td className="py-2.5 px-3.5 font-mono text-slate-700">₹435 Cr</td>
                        <td className="py-2.5 px-3.5 font-mono font-bold text-teal-700">₹570 Cr</td>
                        <td className="py-2.5 px-3.5 font-mono text-slate-700">1.31x</td>
                        <td className="py-2.5 px-3.5 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20">
                            <Check size={11} /> Approved
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: CHRONOGRAPH STYLE OCR AUDIT TRACE */}
            {activeTab === 'audit' && (
              <div className="space-y-3">
                <div className="bg-teal-50/50 border border-teal-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileSearch size={16} className="text-teal-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-teal-900">Source Grounding Inspector (Chronograph Style)</p>
                      <p className="text-[11px] text-teal-700">Clicking any KPI highlights its exact coordinates and footnote in the audited statement.</p>
                    </div>
                  </div>
                  <span className="self-start sm:self-center text-[10px] font-bold text-teal-800 bg-white px-2 py-0.5 rounded-full border border-teal-300">
                    Confidence: 99.4%
                  </span>
                </div>

                {/* Two cards per row on mobile, 2 on desktop */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                  <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                      ARR Extraction
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">₹78.50 Cr ($9.4M)</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-1 italic">
                      "Annual recurring run-rate reached ₹78.50 Cr as of September 30, 2026..."
                    </p>
                    <div className="mt-2 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Source: Q3 Report p. 4</span>
                      <span className="text-emerald-600 font-bold">✓ Audit Validated</span>
                    </div>
                  </div>

                  <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                      Calculated EBITDA
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">₹16.50 Cr (27.8% Margin)</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-1 italic">
                      "Operating income ₹12.8 Cr + Depr &amp; Amort ₹3.7 Cr footnote 4B..."
                    </p>
                    <div className="mt-2 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Source: Notes to Fin p. 11</span>
                      <span className="text-emerald-600 font-bold">✓ Formula Bound</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: ALLVUE STYLE CASH FLOWS & IRR */}
            {activeTab === 'returns' && (
              <div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-3.5">
                  <div className="bg-slate-50/90 rounded-xl p-2.5 sm:p-3 border border-slate-200/70">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Paid-In Capital</p>
                    <p className="text-base sm:text-xl font-bold font-mono text-slate-900 mt-0.5">₹4,850 Cr</p>
                    <p className="text-[10px] text-slate-500">Calls Drawn</p>
                  </div>
                  <div className="bg-slate-50/90 rounded-xl p-2.5 sm:p-3 border border-slate-200/70">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Distributions</p>
                    <p className="text-base sm:text-xl font-bold font-mono text-emerald-700 mt-0.5">₹3,520 Cr</p>
                    <p className="text-[10px] text-emerald-600 font-bold">DPI: 0.72x</p>
                  </div>
                  <div className="bg-slate-50/90 rounded-xl p-2.5 sm:p-3 border border-slate-200/70">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Residual Value</p>
                    <p className="text-base sm:text-xl font-bold font-mono text-slate-900 mt-0.5">₹4,510 Cr</p>
                    <p className="text-[10px] text-slate-500">RVPI: 0.93x</p>
                  </div>
                  <div className="bg-slate-50/90 rounded-xl p-2.5 sm:p-3 border border-slate-200/70">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Net IRR</p>
                    <p className="text-base sm:text-xl font-bold font-mono text-teal-700 mt-0.5">22.4%</p>
                    <p className="text-[10px] text-teal-600 font-bold">TVPI: 1.65x</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span>Engine: Automated cash-flow date reconciliation across capital call notices &amp; distribution checks.</span>
                  <span className="text-teal-700 font-bold hidden sm:inline">Allvue Standard Compliant</span>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: JUNIPER SQUARE / CARTA ILPA PACKET */}
            {activeTab === 'ilpa' && (
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-teal-50 to-indigo-50 rounded-xl border border-teal-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileDown size={16} className="text-teal-700 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Institutional LP Packet PDF (ILPA Guidelines Aligned)</p>
                      <p className="text-[11px] text-slate-600">Executive summary, fund returns waterfall, portfolio company tear-sheets &amp; audit trails.</p>
                    </div>
                  </div>
                  <Link
                    href="/reports"
                    className="self-start sm:self-center px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center gap-1"
                  >
                    <span>Download LP PDF</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                  <div className="bg-slate-50/90 p-3 rounded-xl border border-slate-200 text-xs">
                    <span className="text-[10px] font-bold text-teal-800 uppercase block mb-1">Section 1 • Fund Overview</span>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      Comprehensive summary of Fund IV performance: ₹6,250 Cr commitments, 1.65x Net MoIC, and 22.4% Net IRR.
                    </p>
                  </div>
                  <div className="bg-slate-50/90 p-3 rounded-xl border border-slate-200 text-xs">
                    <span className="text-[10px] font-bold text-teal-800 uppercase block mb-1">Section 2 • Auditor Signoff</span>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      Dual-signoff signatures by Fund Analyst and Lead Compliance Officer recorded with UTC timestamp hash.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Simulation Action Footer */}
            <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-500 border-t border-slate-100">
              <span className="text-center sm:text-left text-[11px] sm:text-xs">
                Grounding: 3 quarterly filings ingested • Fully reconciled against balance sheets in Indian Rupees (₹)
              </span>
              <Link
                href="/customer-onboarding"
                className="inline-flex items-center gap-1.5 font-bold text-teal-600 hover:text-teal-700 text-xs"
              >
                <span>Launch Interactive Sandbox</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Benchmark Capabilities Grid (Chronograph, Allvue, Carta, Juniper Square, Visible) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} className="text-teal-600" />
              PE Intelligence Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              <span className="block">Engineered from the Best of</span>
              <span className="block text-teal-600">Private Equity Technology</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-3">
              We benchmarked Chronograph, Allvue, Juniper Square, Carta, and Visible.vc to build a unified, automated LP reporting engine.
            </p>
          </div>

          {/* Cards Grid: Exactly 2 cards per row on mobile, 3 cards on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {BENCHMARK_CAPABILITIES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50/70 hover:bg-white border border-slate-200/90 hover:border-teal-400/80 rounded-2xl p-3.5 sm:p-5 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2.5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all">
                        <Icon size={18} />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50/80 px-2 py-0.5 rounded border border-teal-200 truncate">
                        {item.benchmark}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-base font-bold text-slate-900 leading-snug mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[10px] sm:text-xs text-slate-500">
                    <span className="font-semibold text-teal-700">{item.highlight}</span>
                    <span className="text-slate-400 font-mono text-[9px] sm:text-[10px]">{item.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Competitive Comparison Matrix */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              <span className="block">Why Private Equity Funds</span>
              <span className="block text-teal-600">Transition to Ricoz</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-2.5">
              Compare traditional reporting overhead against modern AI-assisted audit workflows.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] sm:text-xs">
                  <tr>
                    <th className="py-3 px-4 sm:px-6">Reporting Capability</th>
                    <th className="py-3 px-3 sm:px-4 text-slate-400">Manual Spreadsheets</th>
                    <th className="py-3 px-3 sm:px-4 text-slate-400">Generic Data Rooms</th>
                    <th className="py-3 px-4 sm:px-6 text-teal-700 bg-teal-50/70">Ricoz PE Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Quarterly Turnaround Time</td>
                    <td className="py-3.5 px-3 sm:px-4 text-slate-400">3 to 4 Weeks</td>
                    <td className="py-3.5 px-3 sm:px-4 text-slate-400">2 Weeks</td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-teal-700 bg-teal-50/40">Under 15 Minutes</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Footnote &amp; Page Traceability</td>
                    <td className="py-3.5 px-3 sm:px-4 text-slate-400"><X size={15} className="text-rose-400 inline" /> Manual lookup</td>
                    <td className="py-3.5 px-3 sm:px-4 text-slate-400"><X size={15} className="text-rose-400 inline" /> Flat file storage</td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-teal-700 bg-teal-50/40"><Check size={15} className="text-teal-600 inline mr-1" /> 100% Page Grounding</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Currency &amp; Multiple Engine</td>
                    <td className="py-3.5 px-3 sm:px-4 text-slate-400"><X size={15} className="text-rose-400 inline" /> Formula break risk</td>
                    <td className="py-3.5 px-3 sm:px-4 text-slate-400"><X size={15} className="text-rose-400 inline" /> No returns logic</td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-teal-700 bg-teal-50/40"><Check size={15} className="text-teal-600 inline mr-1" /> Unified ₹ Cr / ₹ L Engine</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Dual-Signoff Governance Gate</td>
                    <td className="py-3.5 px-3 sm:px-4 text-slate-400"><X size={15} className="text-rose-400 inline" /> Email threads</td>
                    <td className="py-3.5 px-3 sm:px-4 text-slate-400"><X size={15} className="text-rose-400 inline" /> Unaudited download</td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-teal-700 bg-teal-50/40"><Check size={15} className="text-teal-600 inline mr-1" /> Analyst + Reviewer Gate</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">ILPA PDF Packet Generation</td>
                    <td className="py-3.5 px-3 sm:px-4 text-slate-400"><X size={15} className="text-rose-400 inline" /> Copy-pasting slides</td>
                    <td className="py-3.5 px-3 sm:px-4 text-slate-400"><X size={15} className="text-rose-400 inline" /> Raw folder zips</td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-teal-700 bg-teal-50/40"><Check size={15} className="text-teal-600 inline mr-1" /> 1-Click Institutional PDF</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Core System Architecture & 6-Stage Operating Flow */}
      <section id="flow" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#090D18] text-white relative overflow-hidden">
        
        {/* Background glow lines & micro grid */}
        <div className="absolute inset-0 bg-grid-fintech opacity-15 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-4">
              <Zap size={14} className="text-teal-400" />
              End-to-End Operating Pipeline
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              <span className="block">The 6-Stage Institutional</span>
              <span className="block text-teal-400">Reporting Workflow</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Every document uploaded to Ricoz follows this strict, audit-grounded sequence from ingestion to approved LP packet generation.
            </p>
          </div>

          {/* Sequential 6-Stage Process Cards */}
          <div className="space-y-3.5 sm:space-y-4">
            {OPERATING_FLOW_STEPS.map((item, idx) => {
              const Icon = item.icon;
              const isLast = idx === OPERATING_FLOW_STEPS.length - 1;
              return (
                <div key={item.step} className="flex flex-col items-center">
                  
                  {/* Step Card */}
                  <div className="w-full bg-[#0E1526]/90 border border-slate-800/90 hover:border-teal-500/50 rounded-2xl p-4 sm:p-5 transition-all duration-200 group shadow-lg hover:shadow-teal-500/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-500/30 transition-all">
                          <Icon size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 px-2 py-0.5 rounded-md bg-teal-950/70 border border-teal-800/60">
                              Stage {item.step}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400">
                              {item.badge}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-lg font-bold text-white tracking-tight mt-1">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                            {item.subtitle}
                          </p>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={user ? item.route : '/login'}
                        className="self-start sm:self-center shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-teal-600 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-slate-700/60 hover:border-teal-500"
                      >
                        <span>Open {item.route.replace('/', '')}</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  {!isLast && (
                    <div className="py-2 text-teal-400/60 flex items-center justify-center">
                      <ArrowDown size={16} className="animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Institutional FAQ Accordion Section (Two-Line Balanced Questions) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
              Institutional Governance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              <span className="block">Frequently Asked Questions</span>
              <span className="block text-teal-600">On Governance &amp; Security</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-2">
              Everything you need to know about our audit grounding, signoff workflows, and Indian Rupee reporting.
            </p>
          </div>

          {/* Accordion List with Strict Two-Line Balanced Questions */}
          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 hover:bg-white transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 focus:outline-none"
                  >
                    <div>
                      {/* Strictly formatted in two balanced lines */}
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        <span className="block">{faq.qLine1}</span>
                        <span className="block text-teal-800">{faq.qLine2}</span>
                      </h3>
                    </div>
                    <div className={`p-1 rounded-lg bg-slate-100 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-teal-100 text-teal-700' : ''}`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                      <p className="pt-2">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Onboarding Call To Action */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] to-teal-50/30 border-b border-slate-200">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-5 sm:p-10 md:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-200">
                Institutional Fund Setup
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                <span className="block">Ready to Modernize Your</span>
                <span className="block text-teal-600">Fund Reporting Workflow?</span>
              </h3>
              <p className="text-xs sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8">
                Walk through our 4-step setup wizard to configure your fund vehicle, establish reporting covenants in Indian Rupees (₹), ingest portfolio filings, and generate your first LP packet.
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <Link
                  href="/customer-onboarding"
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-sm font-bold text-white shadow-md shadow-teal-500/25 transition-all text-center"
                >
                  <span>Launch Onboarding Wizard</span>
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="/register"
                  className="w-full sm:w-auto justify-center text-center px-5 py-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="w-full lg:w-auto shrink-0 bg-slate-50/80 border border-slate-200 p-5 sm:p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="h-6 w-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">1</div>
                <span>Configure Fund Vehicle &amp; Target (₹ Cr)</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="h-6 w-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">2</div>
                <span>Select Reporting KPIs &amp; Covenants</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="h-6 w-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">3</div>
                <span>Ingest Quarterly Portfolio Filings</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                <span>Dual-Review &amp; Publish LP Packets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <Footer />

    </div>
  );
}
