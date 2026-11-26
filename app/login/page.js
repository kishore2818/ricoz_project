'use client';

/**
 * Institutional PE LP Reporting Agent Login Page
 * Clean, centered light design with white card, crisp borders, and refined blue accents.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import {
  LogIn,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  Building2
} from 'lucide-react';

const DEMO_ACCOUNTS = [
  {
    role: 'Admin',
    name: 'Sarah',
    email: 'admin@apexpe.com',
    password: 'Password123!',
    tag: 'Full Access'
  },
  {
    role: 'Analyst',
    name: 'Marcus',
    email: 'analyst@apexpe.com',
    password: 'Password123!',
    tag: 'KPI Pipeline'
  },
  {
    role: 'Reviewer',
    name: 'Elena',
    email: 'reviewer@apexpe.com',
    password: 'Password123!',
    tag: 'Audit & Sign-Off'
  }
];

export default function LoginPage() {
  const { login, user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('admin@apexpe.com');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState('Admin');

  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, authLoading, router]);

  function handleSelectDemo(acc) {
    setSelectedDemo(acc.role);
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err?.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100 relative font-sans text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
      
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Login Container */}
      <div className="w-full max-w-[480px] relative z-10">
        
        {/* Top Institutional Brand Header */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <div className="mb-3">
            <Logo size="md" variant="dark" />
          </div>
          <p className="text-xs text-teal-600 font-semibold tracking-wide uppercase mt-0.5">
            LP Reporting & Intelligence Portal
          </p>
        </div>

        {/* Clean White Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-5 sm:p-9">
          
          {/* Card Title */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              <span className="block sm:inline">Institutional Portal</span>{' '}
              <span className="block sm:inline text-teal-700">Authentication</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sign in to manage portfolio disclosures and review LP reports
            </p>
          </div>

          {/* Fast Demo Role Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Fast Demo Role Selection
              </span>
              <span className="text-[11px] text-teal-600 font-semibold">1-Click Auto-Fill</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
              {DEMO_ACCOUNTS.map((acc) => {
                const isSelected = selectedDemo === acc.role;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleSelectDemo(acc)}
                    className={`p-2 sm:p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50/70 border-teal-500 text-slate-900 shadow-sm ring-2 ring-teal-500/20'
                        : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                      <span className="text-xs font-bold text-slate-900 truncate">{acc.role}</span>
                      {isSelected && (
                        <CheckCircle2 size={12} className="text-teal-600 shrink-0" />
                      )}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 truncate">{acc.name}</div>
                    <div className="text-[9px] sm:text-[10px] text-teal-600 font-medium tracking-tight mt-0.5 sm:mt-1 truncate">
                      {acc.tag}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 flex items-start gap-2">
              <span className="text-red-500 font-bold shrink-0">✕</span>
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Corporate Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Corporate Email
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Mail size={17} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@apexpe.com"
                  className="w-full rounded-xl bg-slate-50/60 border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all"
                />
              </div>
            </div>

            {/* Access Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Access Password
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Lock size={17} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl bg-slate-50/60 border border-slate-200 pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 active:from-teal-700 active:to-cyan-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Authorizing Session...</span>
                </div>
              ) : (
                <>
                  <LogIn size={17} />
                  <span>Enter Investment Portal</span>
                  <ArrowRight size={16} className="ml-0.5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Registration Link */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              New fund analyst or LP reviewer?{' '}
              <Link
                href="/register"
                className="font-semibold text-teal-600 hover:text-teal-700 transition-colors hover:underline"
              >
                Register Account
              </Link>
            </p>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck size={15} className="text-emerald-600" />
          <span>256-Bit SSL • Audit Logged • Institutional Access Control</span>
        </div>
      </div>
    </div>
  );
}
