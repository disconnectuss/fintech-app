'use client';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useAuth } from '@/app/lib/auth-context';
import { GoogleIcon } from '@/app/components/ui/icons';

type SignInFormData = {
  email: string;
  password: string;
};

type ApiErrorResponse = {
  message?: string;
};

export default function SignInForm() {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signIn(data.email, data.password);
      toast.success('Successfully signed in!');
    } catch (error: unknown) {
      let errorMessage = 'Failed to sign in. Please try again.';

      if (isAxiosError<ApiErrorResponse>(error)) {
        errorMessage = error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6" style={{ fontFamily: 'var(--font-kumbh-sans)' }}>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-(--text-primary)">
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
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold text-(--text-primary)">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          disabled={isSubmitting}
          className={`w-full sm:max-w-[404px] h-11 sm:h-12 px-4 sm:px-5 py-3 sm:py-[15px] rounded-[10px] bg-white text-base sm:text-[16px] font-normal border ${
            errors.password ? 'border-red-500' : 'border-[#F2F2F2]'
          } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--brand-primary)/40 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div className="space-y-4 sm:space-y-7">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:max-w-[404px] mt-4 sm:mt-6! mb-4! h-11 sm:h-12 bg-(--brand-primary) text-[#111827] font-semibold px-4 sm:px-5 py-3 sm:py-[15px] text-base sm:text-[16px] rounded-[10px] hover:bg-(--brand-primary-hover) transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--brand-primary) disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
        <button
          type="button"
          className="w-full sm:max-w-[404px] h-11 sm:h-12 bg-white border border-[#F2F2F2] hover:bg-gray-50 text-gray-700 font-medium px-4 sm:px-5 py-3 sm:py-[15px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 flex items-center justify-center gap-3 text-base sm:text-[16px]"
        >
          <GoogleIcon size={24} />
          Sign in with google
        </button>
      </div>
      {/* Sign Up Link */}
      <div className="w-full max-w-[404px] mt-4! text-center">
        <p className="text-sm text-(--text-secondary)">
          Don&apos;t have an account?{' '}
          <Link href="/auth/sign-up" className="font-semibold text-(--text-primary) hover:text-gray-700 transition-colors relative inline-flex items-center">
            <span className="relative">
              Sign up
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
