import Card from '@/app/components/ui/Card';
import Skeleton from '@/app/components/ui/Skeleton';

export default function StatsCardSkeleton() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        {/* Icon skeleton */}
        <Skeleton
          variant="rectangular"
          width={48}
          height={48}
          className="flex-shrink-0"
        />

        {/* Content skeleton */}
        <div className="flex-1 min-w-0 mx-4 flex flex-col items-center">
          <Skeleton variant="text" width={80} height={16} />
          <Skeleton variant="text" width={120} height={28} className="mt-1" />
        </div>

        {/* Trend skeleton */}
        <Skeleton variant="rectangular" width={64} height={28} />
      </div>
    </Card>
  );
}
