'use client';

/**
 * Root Page (/)
 * Redirects unauthenticated users to /login and
 * authenticated users to /dashboard.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function RootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    router.replace(user ? '/dashboard' : '/login');
  }, [user, loading, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner message="Loading…" />
    </div>
  );
}
