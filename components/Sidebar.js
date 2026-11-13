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
        className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 px-4 lg:hidden"
        style={{ backgroundColor: '#0B132B' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
            PE
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight text-white">PE LP Reporting</p>
            <p className="text-[11px] text-gray-400">Quarterly Agent</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: '#0B132B' }}
      >
        {/* Brand */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
              PE
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-tight text-white">
                PE LP Reporting
              </h1>
              <p className="text-xs text-gray-400">Quarterly Agent</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            if (item.adminOnly && user?.role !== 'Admin') return null;

            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                  active
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="border-t border-white/10 px-4 py-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/30 text-xs font-semibold uppercase text-blue-400">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {user?.name || 'User'}
              </p>
              <p className="truncate text-xs text-gray-400">
                {user?.role || 'Role'}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors duration-150 hover:bg-white/5 hover:text-red-400"
          >
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
