'use client';
import React from 'react';
import { Box, Toolbar, Grid } from '@mui/material';
import {
  AccountBalance as BalanceIcon,
  ShoppingBag as ShoppingIcon,
  Savings as SavingsIcon,
} from '@mui/icons-material';
import Sidebar from '@/app/components/dashboard/mui/Sidebar';
import TopBar from '@/app/components/dashboard/mui/TopBar';
import StatCard from '@/app/components/dashboard/mui/StatCard';
import WorkingCapitalChart from '@/app/components/dashboard/mui/WorkingCapitalChart';
import RecentTransactions from '@/app/components/dashboard/mui/RecentTransactions';
import WalletSection from '@/app/components/dashboard/mui/WalletSection';
import ScheduledTransfers from '@/app/components/dashboard/mui/ScheduledTransfers';
import AuthGuard from '@/app/components/auth/AuthGuard';
import ErrorBoundary from '@/app/components/ui/ErrorBoundary';
import { useDashboardSummary } from '@/app/lib/hooks/use-dashboard';
const DRAWER_WIDTH = 240;
export default function MuiDashboardPage() {
  const { data: summary } = useDashboardSummary();
  return (
    <AuthGuard requireAuth>
      <ErrorBoundary>
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'var(--surface-subtle)' }}>
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
              ml: { sm: `${DRAWER_WIDTH}px` },
            }}
          >
            {/* Top Bar */}
            <TopBar />
            {/* Toolbar Spacer */}
            <Toolbar />
            {/* Dashboard Content */}
            <Box sx={{ p: 4 }}>
              {/* Stats Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <StatCard
                    title="Total balance"
                    value={summary?.totalBalance?.amount || 5240.21}
                    currency={summary?.totalBalance?.currency || 'USD'}
                    icon={<BalanceIcon />}
                    bgcolor="var(--surface-dark)"
                    trend={
                      summary?.totalBalance?.change
                        ? {
                          direction: summary.totalBalance.change.trend as 'up' | 'down',
                          percentage: summary.totalBalance.change.percentage,
                        }
                        : undefined
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <StatCard
                    title="Total spending"
                    value={summary?.totalExpense?.amount || 250.8}
                    currency={summary?.totalExpense?.currency || 'USD'}
                    icon={<ShoppingIcon />}
                    trend={
                      summary?.totalExpense?.change
                        ? {
                          direction: summary.totalExpense.change.trend as 'up' | 'down',
                          percentage: summary.totalExpense.change.percentage,
                        }
                        : undefined
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <StatCard
                    title="Total saved"
                    value={summary?.totalSavings?.amount || 550.25}
                    currency={summary?.totalSavings?.currency || 'USD'}
                    icon={<SavingsIcon />}
                    trend={
                      summary?.totalSavings?.change
                        ? {
                          direction: summary.totalSavings.change.trend as 'up' | 'down',
                          percentage: summary.totalSavings.change.percentage,
                        }
                        : undefined
                    }
                  />
                </Grid>
              </Grid>
              {/* Main Content Grid */}
              <Grid container spacing={3}>
                {/* Left Column - Main Content */}
                <Grid size={{ xs: 12, lg: 8 }}>
                  <Grid container spacing={3}>
                    {/* Working Capital Chart */}
                    <Grid size={{ xs: 12 }}>
                      <WorkingCapitalChart />
                    </Grid>
                    {/* Recent Transactions */}
                    <Grid size={{ xs: 12 }}>
                      <RecentTransactions />
                    </Grid>
                  </Grid>
                </Grid>
                {/* Right Column - Sidebar */}
                <Grid size={{ xs: 12, lg: 4 }}>
                  <Grid container spacing={3}>
                    {/* Wallet Section */}
                    <Grid size={{ xs: 12 }}>
                      <WalletSection />
                    </Grid>
                    {/* Scheduled Transfers */}
                    <Grid size={{ xs: 12 }}>
                      <ScheduledTransfers />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </ErrorBoundary>
    </AuthGuard>
  );
}
