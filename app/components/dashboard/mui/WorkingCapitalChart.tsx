'use client';

import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, ButtonGroup, Button, CircularProgress } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useWorkingCapital } from '@/app/lib/hooks/use-dashboard';
import type { Period } from '@/app/lib/types';

export default function WorkingCapitalChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');
  const { data, isLoading, isError } = useWorkingCapital(selectedPeriod);

  // Extract data for chart
  const chartData = data || [];
  const months = chartData.map((d) => d.month);
  const incomeData = chartData.map((d) => d.income);
  const expenseData = chartData.map((d) => d.expense);

  if (isLoading) {
    return (
      <Card sx={{ height: 400 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (isError || chartData.length === 0) {
    return (
      <Card sx={{ height: 400 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Working Capital
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
            <Typography variant="body2" color="text.secondary">
              No data available
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Working Capital
          </Typography>

          {/* Period Selector */}
          <ButtonGroup size="small" sx={{ bgcolor: 'background.paper' }}>
            <Button
              variant={selectedPeriod === 'week' ? 'contained' : 'outlined'}
              onClick={() => setSelectedPeriod('week')}
              sx={{
                textTransform: 'none',
                fontSize: 12,
                bgcolor: selectedPeriod === 'week' ? 'var(--surface-dark)' : 'transparent',
                color: selectedPeriod === 'week' ? 'var(--text-inverted)' : 'var(--text-secondary)',
                borderColor: 'var(--border-base)',
                '&:hover': {
                  bgcolor: selectedPeriod === 'week' ? 'var(--surface-dark)' : 'var(--surface-muted)',
                  borderColor: 'var(--border-base)',
                },
              }}
            >
              Last 7 days
            </Button>
            <Button
              variant={selectedPeriod === 'month' ? 'contained' : 'outlined'}
              onClick={() => setSelectedPeriod('month')}
              sx={{
                textTransform: 'none',
                fontSize: 12,
                bgcolor: selectedPeriod === 'month' ? 'var(--surface-dark)' : 'transparent',
                color: selectedPeriod === 'month' ? 'var(--text-inverted)' : 'var(--text-secondary)',
                borderColor: 'var(--border-base)',
                '&:hover': {
                  bgcolor: selectedPeriod === 'month' ? 'var(--surface-dark)' : 'var(--surface-muted)',
                  borderColor: 'var(--border-base)',
                },
              }}
            >
              Last month
            </Button>
            <Button
              variant={selectedPeriod === 'year' ? 'contained' : 'outlined'}
              onClick={() => setSelectedPeriod('year')}
              sx={{
                textTransform: 'none',
                fontSize: 12,
                bgcolor: selectedPeriod === 'year' ? 'var(--surface-dark)' : 'transparent',
                color: selectedPeriod === 'year' ? 'var(--text-inverted)' : 'var(--text-secondary)',
                borderColor: 'var(--border-base)',
                '&:hover': {
                  bgcolor: selectedPeriod === 'year' ? 'var(--surface-dark)' : 'var(--surface-muted)',
                  borderColor: 'var(--border-base)',
                },
              }}
            >
              Last year
            </Button>
          </ButtonGroup>
        </Box>

        {/* Legend */}
        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'var(--success-500)' }} />
            <Typography variant="body2" sx={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Income
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'var(--warning-accent)' }} />
            <Typography variant="body2" sx={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Expenses
            </Typography>
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ width: '100%', height: 300 }}>
          <LineChart
            xAxis={[
              {
                scaleType: 'point',
                data: months,
                tickLabelStyle: {
                  fontSize: 12,
                  fill: 'var(--text-secondary)',
                },
              },
            ]}
            yAxis={[
              {
                tickLabelStyle: {
                  fontSize: 12,
                  fill: 'var(--text-secondary)',
                },
                valueFormatter: (value: number) => `$${(value / 1000).toFixed(0)}k`,
              },
            ]}
            series={[
              {
                data: incomeData,
                label: 'Income',
                color: 'var(--success-500)',
                curve: 'catmullRom',
                showMark: true,
              },
              {
                data: expenseData,
                label: 'Expenses',
                color: 'var(--warning-accent)',
                curve: 'catmullRom',
                showMark: true,
              },
            ]}
            height={300}
            margin={{ top: 10, right: 10, bottom: 30, left: 60 }}
            sx={{
              '& .MuiLineElement-root': {
                strokeWidth: 2,
              },
              '& .MuiMarkElement-root': {
                scale: '0.8',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
