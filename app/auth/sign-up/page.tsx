import Image from 'next/image';
import SignUpForm from '@/app/components/auth/signUpForm';
import AuthGuard from '@/app/components/auth/AuthGuard';

export default function SignUpPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col lg:flex-row bg-white" style={{ fontFamily: 'var(--font-kumbh-sans)' }}>
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8">
          <div className="flex items-center mt-6 sm:mt-8 md:mt-10 ml-0 sm:ml-12 md:ml-16 lg:ml-24">
            <Image src="/assets/images/Logo.svg" alt="Fintech" width={108} height={30} priority />
          </div>

          <div className="flex-1 flex items-center justify-center px-2 sm:px-0">
            <div className="w-full max-w-[520px] space-y-6 sm:space-y-8 md:space-y-10">
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-[42px] leading-tight font-semibold text-(--text-primary)">Create new account</h1>
                <p className="text-sm sm:text-base text-(--text-secondary)">Welcome! Please enter your details</p>
              </div>
              <SignUpForm />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-[#e6eaef] items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-[#dfe3ec]">
          <div className="absolute bottom-[-25%] left-1/2 -translate-x-1/2 w-[150%] h-[55%] bg-[#f1dbd2] rounded-[50%]" />
          <div className="relative w-full h-full">
            <Image
              src="/assets/images/sign-in.svg"
              alt="Sign Up illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
