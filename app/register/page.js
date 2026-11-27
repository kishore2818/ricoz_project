'use client';

/**
 * Register Page
 * Professional registration form with name, email, password, and role fields.
 * Styled with Option C Tech Teal palette, ambient background, and responsive mobile padding.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import { UserPlus, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const { register, user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Analyst');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [registrationPending, setRegistrationPending] = useState(false);

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, authLoading, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await register({ name, email, password, role });
      const payload = res?.data || res;
      if (payload?.requiresApproval || res?.requiresApproval) {
        setRegistrationPending(true);
      } else {
        router.push('/onboarding');
      }
    } catch (err) {
      setError(err?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-10 bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100 relative font-sans text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
      {/* Subtle ambient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <div className="mb-3">
            <Logo size="md" variant="dark" />
          </div>
          <p className="text-xs text-teal-600 font-semibold tracking-wide uppercase mt-0.5">
            LP Reporting & Intelligence Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-5 sm:p-8">
          {registrationPending ? (
            <div className="text-center py-4">
              <div className="h-16 w-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4 shadow-sm animate-pulse">
                <Clock size={32} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-2">
                <span className="block sm:inline">Account Registration</span>{' '}
                <span className="block sm:inline text-amber-600">Pending Signoff</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed mb-6">
                Thank you, <strong className="text-slate-800">{name}</strong>. Your requested role of{' '}
                <span className="px-2 py-0.5 rounded font-bold text-xs bg-amber-100 text-amber-800">{role}</span>{' '}
                has been submitted to the Administrator queue.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-2 mb-6">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <ShieldCheck size={16} className="text-teal-600" />
                  <span>Institutional Governance Notice</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Under ILPA and dual-signoff compliance protocols, all newly created Analyst and Reviewer accounts must be approved by an Executive Administrator before access to portfolio company financials is activated.
                </p>
                <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
                  Registered Email: <span className="font-mono font-medium text-slate-700">{email}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/login"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white text-xs font-bold shadow-sm transition"
                >
                  <span>Go to Login</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-snug">
                  <span className="block sm:inline">Create Your</span>{' '}
                  <span className="block sm:inline text-teal-700">Institutional Account</span>
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Provision credentials for the PE LP Reporting platform
                </p>
              </div>

              {/* Error banner */}
              {error && (
                <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span className="leading-snug">{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5
                           text-sm text-slate-900 placeholder-slate-400
                           focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20
                           outline-none transition"
                placeholder="Jane Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Corporate Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5
                           text-sm text-slate-900 placeholder-slate-400
                           focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20
                           outline-none transition"
                placeholder="you@apexpe.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="new-password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5
                           text-sm text-slate-900 placeholder-slate-400
                           focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20
                           outline-none transition"
                placeholder="Minimum 6 characters"
              />
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Platform Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5
                           text-sm text-slate-900 font-medium
                           focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20
                           outline-none transition"
              >
                <option value="Analyst">Analyst (Upload & Extraction)</option>
                <option value="Reviewer">Reviewer (Audit & Sign-Off)</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 px-4 py-3
                         text-sm font-bold text-white shadow-md shadow-teal-500/20
                         focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                         disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {submitting ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span>Creating account…</span>
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  <span>Create Account</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-bold text-teal-600 hover:text-teal-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </>
      )}
    </div>
      </div>
    </div>
  );
}
