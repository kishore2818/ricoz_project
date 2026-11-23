'use client';

/**
 * Sidebar
 * Responsive navigation for the PE LP Reporting Agent dashboard.
 * Fixed 260px sidebar on desktop (lg+), slide-over drawer with top bar on mobile/tablet.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import {
  LayoutDashboard,
  Landmark,
  Building2,
  FileText,
  Brain,
  BarChart3,
  TrendingUp,
  ShieldAlert,
  ClipboardCheck,
  FileOutput,
  Users,
  Settings,
  Compass,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard',           href: '/dashboard',      icon: LayoutDashboard },
  { label: 'Client Onboarding',   href: '/onboarding',     icon: Compass },
  { label: 'Funds',               href: '/funds',          icon: Landmark },
  { label: 'Portfolio Companies', href: '/companies',      icon: Building2 },
  { label: 'Documents',           href: '/documents',      icon: FileText },
  { label: 'AI Analysis',         href: '/analysis',       icon: Brain },
  { label: 'KPI Analytics',       href: '/kpi-analytics',  icon: BarChart3 },
  { label: 'Valuation Analysis',  href: '/valuations',     icon: TrendingUp },
  { label: 'Risk Insights',       href: '/risks',          icon: ShieldAlert },
  { label: 'Reviews & Sign-Off',  href: '/reviews',        icon: ClipboardCheck },
  { label: 'Investor Reports',    href: '/reports',        icon: FileOutput },
  { label: 'User Management',     href: '/users',          icon: Users, adminOnly: true },
  { label: 'Settings',            href: '/settings',       icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function isActive(href) {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Mobile / Tablet Top Header */}
      <header
        className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.08] px-4 lg:hidden"
        style={{ backgroundColor: '#0B0F19' }}
      >
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo size="sm" variant="light" />
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="rounded-lg p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-800/80 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: '#0B0F19' }}
      >
        {/* Brand */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <Link href="/dashboard" className="flex items-center">
            <Logo size="sm" variant="light" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.06] hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            if (item.adminOnly && user?.role !== 'Admin') return null;

            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold tracking-wide transition-all duration-150 ${
                  active
                    ? 'bg-teal-500/15 text-teal-300 font-bold border-l-2 border-teal-400 shadow-xs'
                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-100'
                }`}
              >
                <Icon size={17} className={`shrink-0 ${active ? 'text-teal-400' : 'text-slate-500'}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="border-t border-white/[0.08] px-4 py-4 bg-black/20">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-xs font-bold uppercase text-teal-300 border border-teal-500/30">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">
                {user?.name || 'User'}
              </p>
              <p className="truncate text-[10px] uppercase tracking-wider text-teal-400">
                {user?.role || 'Role'}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition-colors duration-150 hover:bg-white/[0.06] hover:text-rose-400 cursor-pointer"
          >
            <LogOut size={15} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
