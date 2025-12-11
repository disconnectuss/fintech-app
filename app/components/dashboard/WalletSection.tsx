'use client';

import Card from '../ui/Card';
import CreditCard from './CreditCard';
import { useWalletCards } from '@/app/lib/hooks/use-wallet';
import CardsSkeleton from './skeletons/CardsSkeleton';

export default function WalletSection() {
  const { data: cards, isLoading, isError, error, refetch } = useWalletCards();

  if (isLoading) {
    return <CardsSkeleton />;
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
            {error instanceof Error ? error.message : 'Failed to load wallet cards'}
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

  if (!cards || cards.length === 0) {
    return (
      <Card className="w-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Wallet</h2>
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
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <p className="text-gray-500">No cards in your wallet</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full fade-in">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Wallet</h2>

      {/* Cards - Vertical Stack on Mobile, Max 3 Cards */}
      <div className="space-y-4 overflow-x-auto">
        {cards.slice(0, 3).map((card) => (
          <CreditCard key={card.id} card={card} />
        ))}
      </div>

      {/* Show More Link if more than 3 cards */}
      {cards.length > 3 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Cards ({cards.length})
          </button>
        </div>
      )}
    </Card>
  );
}
