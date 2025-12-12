'use client';

import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, ButtonGroup, Button, CircularProgress } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useWorkingCapital } from '@/app/lib/hooks/use-dashboard';
import type { Period } from '@/app/lib/types';

export default function WorkingCapitalChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');
  const { data, isLoading, isError } = useWorkingCapital(selectedPeriod);
  const [isSmUp, setIsSmUp] = useState(true);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const breakpoint = 600;
    const handleResize = () => {
      setIsSmUp(window.innerWidth >= breakpoint);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Extract data for chart
  React.useEffect(() => {
    if (data || isError) {
      console.log('WorkingCapital data', {
        period: selectedPeriod,
        data,
        error: isError,
      });
    }
  }, [data, isError, selectedPeriod]);
  const chartData = data || [];
  const months = chartData.map((d) => d.month);
  const incomeData = chartData.map((d) => d.income);
  const expenseData = chartData.map((d) => d.expense);
  const tickFontSize = isSmUp ? 12 : 10;
  const chartHeight = isSmUp ? 300 : 250;
  const chartMargin = {
    top: 10,
    right: isSmUp ? 10 : 5,
    bottom: 30,
    left: isSmUp ? 60 : 40,
  };
  const lineWidth = isSmUp ? 2 : 1.5;
  const markScale = isSmUp ? 0.8 : 0.6;

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
      <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, sm: 3 }, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Working Capital
          </Typography>

          {/* Period Selector */}
          <ButtonGroup size="small" sx={{ bgcolor: 'background.paper', flexShrink: 0 }}>
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
        <Box sx={{ width: '100%', height: chartHeight, overflowX: 'auto' }}>
          <LineChart
            xAxis={[
              {
                scaleType: 'point',
                data: months,
                tickLabelStyle: {
                  fontSize: tickFontSize,
                  fill: 'var(--text-secondary)',
                },
              },
            ]}
            yAxis={[
              {
                tickLabelStyle: {
                  fontSize: tickFontSize,
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
            height={chartHeight}
            margin={chartMargin}
            sx={{
              '& .MuiLineElement-root': {
                strokeWidth: lineWidth,
              },
              '& .MuiMarkElement-root': {
                transform: `scale(${markScale})`,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
