import Link from 'next/link';
import Logo from '@/components/Logo';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Three columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <Logo size="md" variant="dark" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mt-2">
              AI-powered quarterly reporting and ILPA disclosure platform for private equity fund managers, institutional LPs, and compliance analysts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/documents', label: 'Documents' },
                { href: '/kpi-analytics', label: 'KPI Analytics' },
                { href: '/reports', label: 'Investor Reports' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@apexhorizon.com" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            &copy; 2026 Apex Horizon Capital. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Built with institutional-grade security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
