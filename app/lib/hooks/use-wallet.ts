'use client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { dashboardAPI } from '../api';
import { Card } from '../types';
import toast from 'react-hot-toast';
export const useWalletCards = (): UseQueryResult<Card[], Error> => {
  return useQuery<Card[], Error>({
    queryKey: ['wallet', 'cards'],
    queryFn: dashboardAPI.getWallet,
    staleTime: 10 * 60 * 1000, // for cards 10 mins!!!
  });
};
