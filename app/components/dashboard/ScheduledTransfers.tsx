'use client';

import Link from 'next/link';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import { useScheduledTransfers } from '@/app/lib/hooks/use-transfers';
import { formatCurrency, formatDateTime } from '@/app/lib/utils/formatters';
import TransfersSkeleton from './skeletons/TransfersSkeleton';

export default function ScheduledTransfers() {
  const { data: transfers, isLoading, isError, error, refetch } = useScheduledTransfers();

  if (isLoading) {
    return <TransfersSkeleton />;
  }

  if (isError) {
    return (
      <Card className="w-full">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-red-500 mb-2">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : 'Failed to load scheduled transfers'}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </Card>
    );
  }

  if (!transfers || transfers.length === 0) {
    return (
      <Card className="w-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Transfers</h2>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <svg
            className="w-16 h-16 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          <p className="text-gray-500">No scheduled transfers</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Scheduled Transfers</h2>
        <Link
          href="/transfers"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          View All
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Transfers List */}
      <div className="space-y-4">
        {transfers.map((transfer) => {
          const recipientName = transfer.name || transfer.recipientName || 'Unknown';
          const avatarUrl = transfer.image || transfer.recipientAvatar;
          const scheduledDate = transfer.date || transfer.scheduledDate || new Date().toISOString();

          return (
            <div
              key={transfer.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2"
            >
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Avatar */}
                <Avatar
                  src={avatarUrl}
                  alt={recipientName}
                  fallback={recipientName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                  size="md"
                />

                {/* Name and Date */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {recipientName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDateTime(scheduledDate)}
                  </p>
                </div>
              </div>

              {/* Right: Amount (Always negative for outgoing) */}
              <div className="text-sm font-semibold text-red-600 flex-shrink-0">
                {transfer.currency}
                {Math.abs(transfer.amount).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
