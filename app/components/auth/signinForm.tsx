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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
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
          className={`w-full px-4 py-3 border ${errors.email
            ? 'border-red-500'
            : 'border-gray-300'
            } rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors`}
          placeholder="example@gmail.com"
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
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
          className={`w-full px-4 py-3 border ${errors.password
            ? 'border-red-500'
            : 'border-gray-300'
            } rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#C8EE44] text-gray-900 font-semibold py-3 px-4 rounded-lg mt-2"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
      <button
        type="button"
        className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 flex items-center justify-center gap-3"
      >
        <GoogleIcon size={24} />
        Sign in with google
      </button>
      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/sign-up"
            className="font-semibold text-gray-900 underline hover:text-gray-700 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
