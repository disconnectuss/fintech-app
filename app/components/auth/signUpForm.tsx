'use client';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useAuth } from '@/app/lib/auth-context';
import { GoogleIcon } from '@/app/components/ui/icons';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

type ErrorDetail = { message?: string } | string;
type ApiErrorResponse = {
  message?: string;
  details?: ErrorDetail[];
};

export default function SignUpForm() {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUp(data.name, data.email, data.password);
      if (result === 'needs-sign-in') {
        toast.success('Account created successfully! Please sign in to continue.');
      } else {
        toast.success('Account created successfully!');
      }
    } catch (error: unknown) {
      console.error('Sign up error:', error);
      let errorMessage = 'Failed to create account. Please try again.';

      if (isAxiosError<ApiErrorResponse>(error)) {
        const status = error.response?.status;
        const responseData = error.response?.data;

        if (status === 409) {
          errorMessage = 'This email is already registered. Please sign in instead.';
        } else if (status === 400) {
          const details = Array.isArray(responseData?.details) ? responseData?.details : undefined;
          if (details && details.length > 0) {
            errorMessage = details
              .map((detail) => (typeof detail === 'string' ? detail : detail.message ?? 'Invalid field'))
              .join(', ');
          } else if (responseData?.message) {
            errorMessage = responseData.message;
          } else {
            errorMessage = 'Invalid form data. Please check your inputs.';
          }
        } else if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6" style={{ fontFamily: 'var(--font-kumbh-sans)' }}>
      {/* Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-(--text-primary)"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register('name', {
            required: 'Full name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
            validate: (value) => value.trim().length >= 2 || 'Name must be at least 2 characters',
          })}
          disabled={isSubmitting}
          className={`w-full sm:max-w-[404px] h-11 sm:h-12 px-4 sm:px-5 py-3 sm:py-[15px] rounded-[10px] bg-white text-base sm:text-[16px] font-normal border ${
            errors.name ? 'border-red-500' : 'border-[#F2F2F2]'
          } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--brand-primary)/40 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all`}
          placeholder="Mahfuzul Nabil"
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-(--text-primary)"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          })}
          disabled={isSubmitting}
          className={`w-full sm:max-w-[404px] h-11 sm:h-12 px-4 sm:px-5 py-3 sm:py-[15px] rounded-[10px] bg-white text-base sm:text-[16px] font-normal border ${
            errors.email ? 'border-red-500' : 'border-[#F2F2F2]'
          } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--brand-primary)/40 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all`}
          placeholder="example@gmail.com"
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      {/* Password Field */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-(--text-primary)"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
            pattern: {
              value: /(?=.*[a-z])(?=.*[A-Z])/,
              message: 'Password must contain uppercase and lowercase letters',
            },
          })}
          disabled={isSubmitting}
          className={`w-full sm:max-w-[404px] h-11 sm:h-12 px-4 sm:px-5 py-3 sm:py-[15px] rounded-[10px] bg-white text-base sm:text-[16px] font-normal border ${
            errors.password ? 'border-red-500' : 'border-[#F2F2F2]'
          } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--brand-primary)/40 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all`}
          placeholder="Create a password"
        />
        {errors.password && (
          <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>
        )}
        <p className="mt-1.5 text-xs text-(--text-secondary)">
          Must be at least 6 characters with uppercase and lowercase letters
        </p>
      </div>
      <div className="space-y-4 sm:space-y-7">
        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:max-w-[404px] mt-4 sm:mt-6! mb-4! h-11 sm:h-12 bg-(--brand-primary) text-[#111827] font-semibold px-4 sm:px-5 py-3 sm:py-[15px] text-base sm:text-[16px] rounded-[10px] hover:bg-(--brand-primary-hover) transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--brand-primary) disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
        {/* Google Sign Up Button */}
        <button
          type="button"
          className="w-full sm:max-w-[404px] h-11 sm:h-12 bg-white border border-[#F2F2F2] hover:bg-gray-50 text-gray-700 font-medium px-4 sm:px-5 py-3 sm:py-[15px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 flex items-center justify-center gap-3 text-base sm:text-[16px]"
        >
          <GoogleIcon size={24} />
          Sign up with google
        </button>
      </div>
      {/* Sign In Link */}
      <div className="w-full max-w-[404px] mt-4! text-center">
        <p className="text-sm text-(--text-secondary)">
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="font-semibold text-(--text-primary) hover:text-gray-700 transition-colors relative inline-flex items-center">
            <span className="relative">
              Sign in
              <span className="absolute left-0 bottom-0 w-full translate-y-1 flex justify-center">
                <Image
                  src="/assets/images/Vector.png"
                  alt="Vector decoration"
                  width={60}
                  height={8}
                />
              </span>
            </span>
          </Link>
        </p>
      </div>
    </form>
  );
}
