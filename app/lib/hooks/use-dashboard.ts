'use client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { dashboardAPI } from '../api';
import { DashboardSummary, WorkingCapitalData } from '../types';
export const useDashboardSummary = (): UseQueryResult<DashboardSummary, Error> => {
  return useQuery<DashboardSummary, Error>({
    queryKey: ['dashboard', 'summary'],
    queryFn: dashboardAPI.getSummary,
    staleTime: 5 * 60 * 1000,
  });
};
export const useWorkingCapital = (
  period: 'week' | 'month' | 'year' = 'month'
): UseQueryResult<WorkingCapitalData[], Error> => {
  return useQuery<WorkingCapitalData[], Error>({
    queryKey: ['dashboard', 'working-capital', period],
    queryFn: () => dashboardAPI.getWorkingCapital(period),
    staleTime: 5 * 60 * 1000,
  });
};
