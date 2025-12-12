import Skeleton from './Skeleton';

export function StatsCardSkeleton() {
  return (
    <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl border border-(--border-base) space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton variant="rectangular" width={40} height={40} className="rounded-lg sm:rounded-xl" />
        <Skeleton variant="text" width={60} height={20} />
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" width={100} height={16} />
        <Skeleton variant="text" width={140} height={32} />
      </div>
    </div>
  );
}

export function TransactionItemSkeleton() {
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
      <Skeleton variant="circular" width={40} height={40} className="flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="60%" height={16} />
        <Skeleton variant="text" width="40%" height={14} />
      </div>
      <div className="text-right space-y-2">
        <Skeleton variant="text" width={80} height={16} />
        <Skeleton variant="text" width={60} height={14} />
      </div>
    </div>
  );
}

export function TransactionListSkeleton() {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl border border-(--border-base) divide-y divide-(--border-base)">
      <div className="p-4 sm:p-5 md:p-6 border-b border-(--border-base)">
        <Skeleton variant="text" width={150} height={24} />
      </div>
      <div className="divide-y divide-(--border-base)">
        {Array.from({ length: 5 }).map((_, index) => (
          <TransactionItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl border border-(--border-base) space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width={180} height={24} />
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width={60} height={32} className="rounded-lg" />
          <Skeleton variant="rectangular" width={60} height={32} className="rounded-lg" />
          <Skeleton variant="rectangular" width={60} height={32} className="rounded-lg" />
        </div>
      </div>
      <Skeleton variant="rectangular" width="100%" height={300} className="rounded-lg" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="relative w-full aspect-[1.586] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-4 skeleton-shimmer">
      <div className="flex justify-between items-start">
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="rectangular" width={50} height={30} className="rounded" />
      </div>
      <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-4 sm:left-5 md:left-6 right-4 sm:right-5 md:right-6 space-y-3">
        <Skeleton variant="text" width="70%" height={24} />
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width={100} height={16} />
          <Skeleton variant="text" width={80} height={16} />
        </div>
      </div>
    </div>
  );
}

export function ScheduledTransferSkeleton() {
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-(--border-base)">
      <Skeleton variant="circular" width={48} height={48} className="flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="50%" height={16} />
        <Skeleton variant="text" width="30%" height={14} />
      </div>
      <div className="text-right space-y-2">
        <Skeleton variant="text" width={70} height={16} />
        <Skeleton variant="text" width={50} height={14} />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6 md:p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </div>

      {/* Chart */}
      <ChartSkeleton />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <TransactionListSkeleton />
        <div className="space-y-4">
          <CardSkeleton />
          <div className="space-y-3">
            <ScheduledTransferSkeleton />
            <ScheduledTransferSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
