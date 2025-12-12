'use client';
import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useAuth } from '@/app/lib/auth-context';
import type { SignInFormErrors } from '@/app/lib/types';
import { GoogleIcon } from '@/app/components/ui/icons';

type ApiErrorResponse = {
  message?: string;
};
export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<SignInFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const validateForm = (): boolean => {
    const newErrors: SignInFormErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    setIsLoading(true);
    try {
      await signIn(email, password);
      toast.success('Successfully signed in!');
    } catch (error: unknown) {
      let errorMessage = 'Failed to sign in. Please try again.';

      if (isAxiosError<ApiErrorResponse>(error)) {
        errorMessage = error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: 'var(--font-kumbh-sans)' }}>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-[#1b1e2b]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) {
              setErrors({ ...errors, email: undefined });
            }
          }}
          disabled={isLoading}
          className={`w-full px-5 py-4 rounded-2xl bg-white text-[16px] font-normal shadow-[0_12px_30px_rgba(16,24,40,0.08)] border ${errors.email
            ? 'border-red-500'
            : 'border-transparent'
            } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/40 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all`}
          placeholder="example@gmail.com"
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold text-[#1b1e2b]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) {
              setErrors({ ...errors, password: undefined });
            }
          }}
          disabled={isLoading}
          className={`w-full px-5 py-4 rounded-2xl bg-white text-[16px] font-normal shadow-[0_12px_30px_rgba(16,24,40,0.08)] border ${errors.password
            ? 'border-red-500'
            : 'border-transparent'
            } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/40 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
        )}
      </div>
      <div className="space-y-7">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[var(--brand-primary)] text-[#111827] font-semibold py-4 px-5 text-[16px] rounded-2xl shadow-[0_20px_40px_rgba(138,204,31,0.4)] hover:bg-[var(--brand-primary-hover)] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-primary)]"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
        <button
          type="button"
          className="w-full bg-white border border-[#e4e6ed] hover:bg-gray-50 text-gray-700 font-medium py-4 px-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 flex items-center justify-center gap-3 text-[16px] shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
        >
          <GoogleIcon size={24} />
          Sign in with google
        </button>
      </div>
      {/* Sign Up Link */}
      <div className="pt-2 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/auth/sign-up" className="font-semibold text-gray-900 hover:text-gray-700 transition-colors relative inline-flex items-center">
            <span className="relative">
              Sign up
              <span className="absolute left-0 bottom-0 w-full h-1 bg-[var(--brand-primary)] opacity-70 translate-y-1 rounded-full" />
            </span>
          </Link>
        </p>
      </div>
    </form>
  );
}
