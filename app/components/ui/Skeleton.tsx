import { clsx } from 'clsx';
import type { SkeletonProps } from '@/app/lib/types';
export default function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animation = 'wave',
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-shimmer',
    none: '',
  };
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };
  return (
    <div
      className={clsx(
        'bg-gray-200',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
    />
  );
}
