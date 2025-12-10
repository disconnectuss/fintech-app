import Image from 'next/image';
import SignInForm from '@/app/components/auth/signinForm';
import AuthGuard from '@/app/components/auth/AuthGuard';
export default function SignInPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen flex">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center px-12 lg:px-24 bg-white">
          <div className="w-full max-w-[380px] position:relative">
            {/* Logo */}
            <div className="position:absolute mt-10 bg-red-900">
              <Image
                src="/assets/images/Logo.svg"
                alt="Fintech"
                width={108}
                height={30}
                priority
              />
            </div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sign In
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back! Please enter your details
              </p>
            </div>
            <SignInForm />
          </div>
        </div>
        {/* Right Side  */}
        <div className="hidden lg:flex flex-1 bg-gray-100 items-center justify-center p-12">
          <div className="relative w-full h-full max-w-2xl max-h-[600px]">
            <Image
              src="/assets/images/sign-in.svg"
              alt="Sign In"
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
