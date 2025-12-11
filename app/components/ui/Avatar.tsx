import { clsx } from 'clsx';
import Image from 'next/image';
import type { AvatarProps } from '@/app/lib/types';
export default function Avatar({
  src,
  alt,
  size = 'md',
  fallback,
  className,
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };
  const getInitials = (name: string): string => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };
  return (
    <div
      className={clsx(
        'rounded-full overflow-hidden flex items-center justify-center bg-gray-200 text-gray-600 font-medium',
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{fallback ? getInitials(fallback) : alt.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}
