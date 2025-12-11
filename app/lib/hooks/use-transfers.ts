'use client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { dashboardAPI } from '../api';
import { ScheduledTransfer } from '../types';
import toast from 'react-hot-toast';
export const useScheduledTransfers = (): UseQueryResult<ScheduledTransfer[], Error> => {
  return useQuery<ScheduledTransfer[], Error>({
    queryKey: ['transfers', 'scheduled'],
    queryFn: dashboardAPI.getScheduledTransfers,
    staleTime: 5 * 60 * 1000,
  });
};
