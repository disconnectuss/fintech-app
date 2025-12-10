import Image from 'next/image';
import SignUpForm from '@/app/components/auth/signUpForm';
import AuthGuard from '@/app/components/auth/AuthGuard';

export default function SignUpPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex flex-col justify-center items-center px-12 lg:px-24 bg-white">
          <div className="w-full max-w-[380px]">
            {/* Logo */}
            <div className="mb-12">
              <Image
                src="/assets/images/Logo.svg"
                alt="Fintech"
                width={120}
                height={40}
                priority
              />
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sign Up
              </h1>
              <p className="text-sm text-gray-600">
                Create your account to get started
              </p>
            </div>

            {/* Form Component */}
            <SignUpForm />
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:flex flex-1 bg-gray-100 items-center justify-center p-12">
          <div className="relative w-full h-full max-w-2xl max-h-[600px]">
            <Image
              src="/assets/images/sign-in.svg"
              alt="Sign Up"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
