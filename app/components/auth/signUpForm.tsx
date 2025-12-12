'use client';
import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useAuth } from '@/app/lib/auth-context';
import { GoogleIcon } from '@/app/components/ui/icons';
import type { SignUpFormErrors } from '@/app/lib/types';

type ErrorDetail = { message?: string } | string;
type ApiErrorResponse = {
  message?: string;
  details?: ErrorDetail[];
};
export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const validateForm = (): boolean => {
    const newErrors: SignUpFormErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      newErrors.password = 'Password must contain uppercase and lowercase letters';
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
      await signUp(name, email, password);
      toast.success('Account created successfully!');
    } catch (error: unknown) {
      console.error('Sign up error:', error);
      let errorMessage = 'Failed to create account. Please try again.';

      if (isAxiosError<ApiErrorResponse>(error)) {
        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 409) {
          errorMessage = 'This email is already registered. Please sign in instead.';
        } else if (status === 400) {
          const details = Array.isArray(data?.details) ? data?.details : undefined;
          if (details && details.length > 0) {
            errorMessage = details
              .map((detail) => (typeof detail === 'string' ? detail : detail.message ?? 'Invalid field'))
              .join(', ');
          } else if (data?.message) {
            errorMessage = data.message;
          } else {
            errorMessage = 'Invalid form data. Please check your inputs.';
          }
        } else if (data?.message) {
          errorMessage = data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
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
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) {
              setErrors({ ...errors, name: undefined });
            }
          }}
          disabled={isLoading}
          className={`w-full px-4 py-3 border ${errors.name
            ? 'border-red-500'
            : 'border-gray-300'
            } rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors`}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
        )}
      </div>
      {/* Email Field */}
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
      {/* Password Field */}
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
          autoComplete="new-password"
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
          placeholder="Create a password"
        />
        {errors.password && (
          <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
        )}
        <p className="mt-1.5 text-xs text-gray-500">
          Must be at least 6 characters with uppercase and lowercase letters
        </p>
      </div>
      {/* Sign Up Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--warning-500)] hover:from-[var(--brand-primary-hover)] hover:to-[var(--warning-accent)] text-gray-900 font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-2"
      >
        {isLoading ? 'Creating account...' : 'Sign up'}
      </button>
      {/* Google Sign Up Button */}
      <button
        type="button"
        className="w-full bg-[var(--surface-base)] border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 flex items-center justify-center gap-3"
      >
        <GoogleIcon size={20} />
        Sign up with google
      </button>
      {/* Sign In Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/auth/sign-in"
            className="font-semibold text-gray-900 underline hover:text-gray-700 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
