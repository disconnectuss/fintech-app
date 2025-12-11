'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Card from '../ui/Card';
import { useWorkingCapital } from '@/app/lib/hooks/use-dashboard';
import ChartSkeleton from './skeletons/ChartSkeleton';
import type { Period, PeriodTab } from '@/app/lib/types';

const periodTabs: PeriodTab[] = [
  { key: 'week', label: 'Last 7 Days' },
  { key: 'month', label: 'Last Month' },
  { key: 'year', label: 'Last Year' },
];

export default function WorkingCapitalChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');
  const { data, isLoading, isError, error, refetch } = useWorkingCapital(selectedPeriod);

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (isError) {
    return (
      <Card className="w-full">
        <div className="flex flex-col items-center justify-center h-[376px] text-center">
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
            {error instanceof Error ? error.message : 'Failed to load chart data'}
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

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <div className="flex gap-2 mb-6">
          {periodTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedPeriod(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
          <p className="text-gray-500">No data available for this period</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      {/* Period Tabs */}
      <div className="flex gap-2 mb-6">
        {periodTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedPeriod(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => `₺${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{ color: '#374151', fontWeight: 600 }}
            formatter={(value: number, name: string) => [
              `₺${value.toLocaleString()}`,
              name.charAt(0).toUpperCase() + name.slice(1),
            ]}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
            formatter={(value) => (
              <span className="text-gray-600 text-sm capitalize">{value}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#4ade80"
            strokeWidth={2}
            dot={{ fill: '#4ade80', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#4ade80', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
