'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-context';
import type { AuthGuardProps } from '@/app/lib/types';
export default function AuthGuard({
  children,
  redirectTo = '/dashboard',
  requireAuth = false
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push('/auth/sign-in');
      } else if (!requireAuth && isAuthenticated) {
        router.push(redirectTo);
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--brand-primary)"></div>
          <p className="text-sm text-(--text-secondary)">Loading...</p>
        </div>
      </div>
    );
  }
  if (requireAuth && !isAuthenticated) {
    return null;
  }
  if (!requireAuth && isAuthenticated) {
    return null;
  }
  return <>{children}</>;
}
