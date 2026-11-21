import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/components/Toast';
import './globals.css';

export const metadata = {
  title: {
    default: 'Apex Horizon Capital \u2014 PE LP Reporting Portal',
    template: '%s | Apex Horizon Capital',
  },
  description:
    'AI-powered Private Equity LP quarterly reporting platform. Upload company reports, extract KPIs, compare quarterly performance, and generate professional investor reports.',
  keywords: [
    'private equity',
    'LP reporting',
    'KPI analytics',
    'fund management',
    'investor reports',
    'quarterly reporting',
    'AI document analysis',
  ],
  authors: [{ name: 'Apex Horizon Capital' }],
  creator: 'Apex Horizon Capital',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ricoz-project-amber.vercel.app',
    siteName: 'Apex Horizon Capital',
    title: 'Apex Horizon Capital \u2014 PE LP Reporting Portal',
    description:
      'AI-powered Private Equity LP quarterly reporting platform. Upload, analyze, compare, and generate professional investor reports.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Horizon Capital \u2014 PE LP Reporting Portal',
    description:
      'AI-powered PE LP quarterly reporting. Upload reports, extract KPIs, and generate investor packets.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E40AF',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <a href="#main" className="skip-to-content">
          Skip to main content
        </a>
        <AuthProvider>
          <ToastProvider>
            <div id="main">{children}</div>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
