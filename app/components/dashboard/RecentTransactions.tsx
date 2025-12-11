'use client';
import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import { useTransactions } from '@/app/lib/hooks/use-transactions';
import { formatCurrency } from '@/app/lib/utils/formatters';
import { formatRelativeDate } from '@/app/lib/utils/formatters';
import TransactionsSkeleton from './skeletons/TransactionsSkeleton';
const getCategoryIcon = (category: string) => {
  const icons: Record<string, React.ReactElement> = {
    Mobile: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    Entertainment: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    Software: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    Food: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    Transfer: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  };
  return icons[category] || icons.Software;
};
export default function RecentTransactions() {
  const { data: transactions, isLoading, isError, error, refetch } = useTransactions(5);
  if (isLoading) {
    return <TransactionsSkeleton />;
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
            {error instanceof Error ? error.message : 'Failed to load transactions'}
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
  if (!transactions || transactions.length === 0) {
    return (
      <Card className="w-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-gray-500">No recent transactions</p>
        </div>
      </Card>
    );
  }
  return (
    <Card className="w-full fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        <Link
          href="/transactions"
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
      {/* Transactions List */}
      <div className="space-y-4">
        {transactions.map((transaction) => {
          const isNegative = transaction.type === 'expense' || transaction.type === 'transfer' || transaction.amount < 0;
          const displayAmount = Math.abs(transaction.amount);
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2"
            >
              {/* Left: Icon + Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Avatar/Icon with Business Logo */}
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 overflow-hidden">
                  {transaction.image ? (
                    <img
                      src={transaction.image}
                      alt={transaction.business}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getCategoryIcon(transaction.type || transaction.category || 'Software')
                  )}
                </div>
                {/* Name and Business */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {transaction.name || transaction.title}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.business || transaction.type}</p>
                </div>
              </div>
              {/* Right: Date + Amount */}
              <div className="flex items-center gap-4 flex-shrink-0">
                {/* Date/Time */}
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-gray-500">
                    {formatRelativeDate(transaction.date)}
                  </p>
                </div>
                {/* Amount */}
                <div
                  className={`text-sm font-semibold ${isNegative ? 'text-red-600' : 'text-green-600'
                    }`}
                >
                  {isNegative ? '' : '+'}
                  {transaction.currency}
                  {displayAmount.toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
