'use client';

import Card from '../../ui/Card';
import Skeleton from '../../ui/Skeleton';

export default function ChartSkeleton() {
  return (
    <Card className="w-full">
      {/* Skeleton tabs */}
      <div className="flex gap-2 mb-6">
        <Skeleton
          variant="rectangular"
          width={100}
          height={36}
          className="rounded-lg"
        />
        <Skeleton
          variant="rectangular"
          width={100}
          height={36}
          className="rounded-lg"
        />
        <Skeleton
          variant="rectangular"
          width={100}
          height={36}
          className="rounded-lg"
        />
      </div>

      {/* Skeleton chart area */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={300}
        className="rounded-lg"
      />
    </Card>
  );
}
