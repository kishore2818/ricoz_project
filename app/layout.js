import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'Apex Horizon Capital — PE LP Reporting Agent',
  description:
    'Private Equity LP Quarterly Reporting Agent — AI-powered fund analytics, document processing, and investor reporting.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
