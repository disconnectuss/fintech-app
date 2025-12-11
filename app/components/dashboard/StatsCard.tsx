import { ReactNode } from 'react';
import Card from '@/app/components/ui/Card';
import { formatCurrency } from '@/app/lib/utils/formatters';

interface TrendProps {
  direction: 'up' | 'down';
  percentage: number;
}

interface StatsCardProps {
  title: string;
  value: number;
  currency: string;
  icon: ReactNode;
  trend?: TrendProps;
}

export default function StatsCard({
  title,
  value,
  currency,
  icon,
  trend,
}: StatsCardProps) {
  const isPositive = trend?.direction === 'up';

  return (
    <Card className="fade-in">
      <div className="flex items-center justify-between">
        {/* Icon */}
        <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 mx-4 text-center">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatCurrency(value, currency)}
          </p>
        </div>

        {/* Trend indicator */}
        {trend && (
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
              isPositive
                ? 'bg-[#C8EE44]/20 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {isPositive ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            )}
            <span>{trend.percentage}%</span>
          </div>
        )}

        {/* Placeholder for alignment when no trend */}
        {!trend && <div className="w-16" />}
      </div>
    </Card>
  );
}
