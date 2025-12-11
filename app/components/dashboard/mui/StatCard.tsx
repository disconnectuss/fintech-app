'use client';

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: number;
  currency: string;
  icon: React.ReactNode;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
  bgcolor?: string;
}

export default function StatCard({
  title,
  value,
  currency,
  icon,
  trend,
  bgcolor = '#FFFFFF',
}: StatCardProps) {
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const getCurrencySymbol = (curr: string) => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      TRY: '₺',
    };
    return symbols[curr] || curr;
  };

  return (
    <Card
      sx={{
        height: '100%',
        bgcolor: bgcolor,
        borderRadius: 3,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header - Icon and Title */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: bgcolor === '#1B212D' ? '#FFFFFF' : '#78778B',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: bgcolor === '#1B212D' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(27, 33, 45, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: bgcolor === '#1B212D' ? '#C8EE44' : '#78778B',
            }}
          >
            {icon}
          </Box>
        </Box>

        {/* Value */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: bgcolor === '#1B212D' ? '#FFFFFF' : '#1B212D',
            mb: 1,
          }}
        >
          {getCurrencySymbol(currency)}
          {formatValue(value)}
        </Typography>

        {/* Trend */}
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {trend.direction === 'up' ? (
              <TrendingUpIcon sx={{ fontSize: 16, color: '#4ade80' }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 16, color: '#ef4444' }} />
            )}
            <Typography
              variant="body2"
              sx={{
                fontSize: 12,
                color: trend.direction === 'up' ? '#4ade80' : '#ef4444',
                fontWeight: 600,
              }}
            >
              {trend.percentage}%
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: 12,
                color: bgcolor === '#1B212D' ? 'rgba(255, 255, 255, 0.6)' : '#78778B',
                ml: 0.5,
              }}
            >
              vs last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
