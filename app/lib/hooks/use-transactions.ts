'use client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { dashboardAPI } from '../api';
import { Transaction } from '../types';
import toast from 'react-hot-toast';
export const useTransactions = (limit: number = 5): UseQueryResult<Transaction[], Error> => {
  return useQuery<Transaction[], Error>({
    queryKey: ['transactions', limit],
    queryFn: () => dashboardAPI.getTransactions(limit),
    staleTime: 2 * 60 * 1000,
  });
};
