'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Toolbar, Grid } from '@mui/material';
import {
  AccountBalance as BalanceIcon,
  ShoppingBag as ShoppingIcon,
  Savings as SavingsIcon,
} from '@mui/icons-material';
import Sidebar from '@/app/components/dashboard/mui/Sidebar';
import TopBar from '@/app/components/dashboard/mui/TopBar';
import StatCard from '@/app/components/dashboard/mui/StatCard';
import AuthGuard from '@/app/components/auth/AuthGuard';
import ErrorBoundary from '@/app/components/ui/ErrorBoundary';
import { useDashboardSummary } from '@/app/lib/hooks/use-dashboard';
import { ChartSkeleton, TransactionListSkeleton, CardSkeleton, ScheduledTransferSkeleton } from '@/app/components/ui/SkeletonLoaders';

// Dynamic imports for heavy components
const WorkingCapitalChart = dynamic(() => import('@/app/components/dashboard/mui/WorkingCapitalChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});

const RecentTransactions = dynamic(() => import('@/app/components/dashboard/mui/RecentTransactions'), {
  loading: () => <TransactionListSkeleton />,
  ssr: false,
});

const WalletSection = dynamic(() => import('@/app/components/dashboard/mui/WalletSection'), {
  loading: () => <CardSkeleton />,
  ssr: false,
});

const ScheduledTransfers = dynamic(() => import('@/app/components/dashboard/mui/ScheduledTransfers'), {
  loading: () => (
    <div className="space-y-3">
      <ScheduledTransferSkeleton />
      <ScheduledTransferSkeleton />
    </div>
  ),
  ssr: false,
});

const DRAWER_WIDTH = 240;
export default function DashboardPage() {
  const { data: summary } = useDashboardSummary();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AuthGuard requireAuth>
      <ErrorBoundary>
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'var(--surface-subtle)' }}>
          <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            }}
          >
            <TopBar onMenuClick={handleDrawerToggle} />
            <Toolbar />
            {/* Dashboard Content */}
            <Box sx={{ p: { xs: 2, sm: 2, md: 3 } }}>
              {/* Main Content Grid */}
              <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                {/* Left Column - Main Content */}
                <Grid size={{ xs: 12, lg: 8 }}>
                  <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                    {/* Stats Cards */}
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
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
                  <Grid container spacing={2}>
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
