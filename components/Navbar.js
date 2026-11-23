'use client';

/**
 * Global Responsive Navigation Bar
 * Perfectly responsive across all mobile screens, tablets, and desktop devices.
 * Glassmorphic background, clean brand typography, and mobile drawer.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  FileText,
  Brain,
  BarChart3,
  Lock,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Platform', href: '/#features' },
  { label: 'Operating Flow', href: '/#flow' },
  { label: 'KPI Analytics', href: '/kpi-analytics' },
  { label: 'LP Reporting', href: '/reports' },
  { label: 'Client Onboarding', href: '/customer-onboarding' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg">
            <Logo size="md" variant="dark" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold text-slate-600 hover:text-teal-600 hover:bg-teal-50/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 lg:gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-xs sm:text-sm font-bold text-white shadow-sm shadow-teal-500/20 active:scale-[0.99] transition-all"
              >
                <LayoutDashboard size={15} />
                <span>Enter Portal</span>
                <ArrowRight size={14} />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/customer-onboarding"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-xs sm:text-sm font-bold text-white shadow-sm shadow-teal-500/25 active:scale-[0.99] transition-all group"
                >
                  <span>Start Onboarding</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            {user ? (
              <Link
                href="/dashboard"
                className="px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-bold shadow-xs"
              >
                Portal
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-teal-600 hover:bg-teal-50"
              >
                Sign In
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sliding Navigation Panel */}
      <div
        className={`fixed inset-x-0 top-16 z-40 bg-white border-b border-slate-200 shadow-2xl px-6 py-6 transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Navigation</p>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {user ? (
              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm shadow-sm"
              >
                <LayoutDashboard size={16} />
                <span>Go to Investment Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/customer-onboarding"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm shadow-sm"
                >
                  <span>Start Client Onboarding</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center py-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Institutional Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
