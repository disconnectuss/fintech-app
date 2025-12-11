import { clsx } from 'clsx';
import type { CardProps } from '@/app/lib/types';
export default function Card({
  children,
  className,
  padding = 'md',
  shadow = 'sm',
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };
  return (
    <div
      className={clsx(
        'bg-white rounded-lg',
        paddingClasses[padding],
        shadowClasses[shadow],
        className
      )}
    >
      {children}
    </div>
  );
}
