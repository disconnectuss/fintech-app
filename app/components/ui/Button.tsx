import { clsx } from 'clsx';
import type { ButtonProps } from '@/app/lib/types';
import { SpinnerIcon } from '@/app/components/ui/icons';
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-[var(--brand-primary)] text-gray-900 hover:bg-[var(--brand-primary-hover)] font-semibold',
    secondary: 'bg-[var(--surface-dark)] text-white hover:bg-[var(--surface-dark-hover)] font-semibold',
    outline:
      'bg-transparent border-2 border-gray-300 text-gray-700 hover:border-gray-400 font-medium',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 font-medium',
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  const isDisabled = disabled || loading;
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--brand-primary)',
        variantClasses[variant],
        sizeClasses[size],
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <SpinnerIcon size={16} />
          <span className="ml-2">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
