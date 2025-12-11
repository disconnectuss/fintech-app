'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/app/lib/auth-context';
import type { SignUpFormErrors } from '@/app/lib/types';
export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();
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
      // Note: router.push is handled in auth context
    } catch (error: any) {
      console.error('Sign up error:', error.response || error);
      console.error('Validation details:', error.response?.data?.details);
      let errorMessage = 'Failed to create account. Please try again.';

      if (error.response?.status === 409) {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (error.response?.status === 400) {
        // Check if there are validation details
        const details = error.response?.data?.details;
        if (details && details.length > 0) {
          errorMessage = details.map((d: any) => d.message || d).join(', ');
        } else {
          errorMessage = error.response?.data?.message || 'Invalid form data. Please check your inputs.';
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
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
        className="w-full bg-gradient-to-r from-lime-400 to-yellow-300 hover:from-lime-500 hover:to-yellow-400 text-gray-900 font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-2"
      >
        {isLoading ? 'Creating account...' : 'Sign up'}
      </button>
      {/* Google Sign Up Button */}
      <button
        type="button"
        className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 flex items-center justify-center gap-3"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M19.8055 10.2292C19.8055 9.55152 19.7489 8.86677 19.6265 8.19604H10.2002V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0879V17.5866H16.8251C18.7179 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4" />
          <path d="M10.2002 20.0006C12.9505 20.0006 15.2715 19.1151 16.8251 17.5865L13.6025 15.0879C12.7031 15.6979 11.5428 16.0433 10.2002 16.0433C7.54067 16.0433 5.28162 14.2832 4.48282 11.9169H1.16602V14.4927C2.75632 17.8695 6.30849 20.0006 10.2002 20.0006Z" fill="#34A853" />
          <path d="M4.48282 11.9169C4.0612 10.6751 4.0612 9.32598 4.48282 8.08421V5.50842H1.16602C-0.387702 8.71754 -0.387702 12.2837 1.16602 15.4928L4.48282 11.9169Z" fill="#FBBC04" />
          <path d="M10.2002 3.95805C11.6189 3.93548 13.0003 4.47384 14.0395 5.45932L16.893 2.60582C15.1817 0.990821 12.9315 0.0813027 10.2002 0.105851C6.30849 0.105851 2.75632 2.23699 1.16602 5.50842L4.48282 8.08421C5.28162 5.71793 7.54067 3.95805 10.2002 3.95805Z" fill="#EA4335" />
        </svg>
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
