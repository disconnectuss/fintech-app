'use client';

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material';
import type { MuiStatCardProps } from '@/app/lib/types';

export default function StatCard({
  title,
  value,
  currency,
  icon,
  trend,
  bgcolor = 'var(--surface-base)',
}: MuiStatCardProps) {
  const isDarkCard =
    typeof bgcolor === 'string' &&
    (bgcolor.toLowerCase() === '#1b212d' || bgcolor.includes('surface-dark'));
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
        boxShadow: '0 1px 3px 0 var(--shadow-soft)',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: '0 4px 6px -1px var(--shadow-soft)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
        {/* Header - Icon and Title */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: { xs: 1.5, sm: 2 } }}>
          <Typography
            variant="body2"
            sx={{
              color: isDarkCard ? 'var(--text-inverted)' : 'var(--text-secondary)',
              fontSize: { xs: 12, sm: 13 },
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              borderRadius: 2,
              bgcolor: isDarkCard ? 'var(--overlay-card-inverted)' : 'var(--overlay-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDarkCard ? 'var(--brand-primary)' : 'var(--text-secondary)',
              '& svg': {
                fontSize: { xs: 20, sm: 24 },
              },
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
            color: isDarkCard ? 'var(--text-inverted)' : 'var(--text-primary)',
            mb: 1,
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
          }}
        >
          {getCurrencySymbol(currency)}
          {formatValue(value)}
        </Typography>

        {/* Trend */}
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {trend.direction === 'up' ? (
              <TrendingUpIcon sx={{ fontSize: 16, color: 'var(--success-500)' }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 16, color: 'var(--danger-500)' }} />
            )}
            <Typography
              variant="body2"
              sx={{
                fontSize: 12,
                color: trend.direction === 'up' ? 'var(--success-500)' : 'var(--danger-500)',
                fontWeight: 600,
              }}
            >
              {trend.percentage}%
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: 12,
                color: isDarkCard ? 'var(--text-inverted-muted)' : 'var(--text-secondary)',
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
