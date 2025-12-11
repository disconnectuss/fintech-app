'use client';

import Card from '../../ui/Card';
import Skeleton from '../../ui/Skeleton';

export default function CardsSkeleton() {
  return (
    <Card className="w-full">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant="text" width={100} height={24} />
      </div>

      {/* Cards skeleton */}
      <div className="space-y-4">
        {[...Array(2)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={180}
            className="rounded-2xl"
          />
        ))}
      </div>
    </Card>
  );
}
