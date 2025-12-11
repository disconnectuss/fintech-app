'use client';

import Card from '../../ui/Card';
import Skeleton from '../../ui/Skeleton';

export default function TransfersSkeleton() {
  return (
    <Card className="w-full">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton variant="text" width={180} height={24} />
        <Skeleton variant="text" width={80} height={20} />
      </div>

      {/* Transfer rows skeleton */}
      <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
          >
            {/* Left: Avatar + Info */}
            <div className="flex items-center gap-3 flex-1">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex-1">
                <Skeleton variant="text" width={140} height={16} />
                <Skeleton variant="text" width={100} height={12} className="mt-1" />
              </div>
            </div>

            {/* Right: Amount */}
            <Skeleton variant="text" width={80} height={16} />
          </div>
        ))}
      </div>
    </Card>
  );
}
