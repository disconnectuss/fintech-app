import Image from 'next/image';
import SignInForm from '@/app/components/auth/signinForm';
import AuthGuard from '@/app/components/auth/AuthGuard';
export default function SignInPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col lg:flex-row bg-white" style={{ fontFamily: 'var(--font-kumbh-sans)' }}>
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col px-6 sm:px-10 lg:px-16 xl:px-20 pt-12 pb-8">
          <div className="flex items-center mt-10! ml-32!">
            <Image src="/assets/images/Logo.svg" alt="Fintech" width={108} height={30} priority />
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-[420px] space-y-10">
              <div className="space-y-3">
                <h1 className="text-[42px] leading-tight font-semibold text-[#1b1e2b]">Sign In</h1>
                <p className="text-base text-[#7b7f8f] mb-10!">Welcome back! Please enter your details</p>
              </div>
              <SignInForm />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-[#e6eaef] items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-[#dfe3ec]">
          <div className="absolute bottom-[-25%] left-1/2 -translate-x-1/2 w-[150%] h-[55%] bg-[#f1dbd2] rounded-[50%]" />
          <div className="relative w-[80%] max-w-xl h-[520px] flex items-center justify-center">
            <Image
              src="/assets/images/sign-in.svg"
              alt="Sign In illustration"
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
