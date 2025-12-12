import axios from 'axios';
import type { Transaction, ScheduledTransfer, Card, SearchResult } from './types';

const API_BASE_URL = 'https://case.nodelabs.dev/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/auth/sign-in';
    }
    return Promise.reject(error);
  }
);
export const authAPI = {
  signIn: async (email: string, password: string) => {
    const response = await apiClient.post('/users/login', { email, password });
    return response.data;
  },
  signUp: async (fullName: string, email: string, password: string) => {
    const response = await apiClient.post('/users/register', { fullName, email, password });
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },
};
export const dashboardAPI = {
  getSummary: async () => {
    const response = await apiClient.get('/financial/summary');
    return response.data.data || response.data;
  },
  getWorkingCapital: async (period: 'week' | 'month' | 'year' = 'month') => {
    const response = await apiClient.get('/financial/working-capital', {
      params: { period },
    });
    const responseData = response.data.data || response.data;
    if (responseData && typeof responseData === 'object') {
      const periodSources = [
        responseData[period],
        responseData?.periods?.[period],
        responseData?.data?.[period],
      ];
      for (const source of periodSources) {
        if (Array.isArray(source)) {
          return source;
        }
        if (source && typeof source === 'object' && Array.isArray(source.data)) {
          return source.data;
        }
      }
    }
    if (responseData && typeof responseData === 'object' && Array.isArray(responseData.data)) {
      return responseData.data;
    }
    if (Array.isArray(responseData)) {
      return responseData;
    }
    if (responseData && typeof responseData === 'object') {
      if (Array.isArray(responseData.workingCapital)) return responseData.workingCapital;
      if (Array.isArray(responseData.items)) return responseData.items;
      if (Array.isArray(responseData.chartData)) return responseData.chartData;
    }
    return [];
  },
  getTransactions: async (limit: number = 5) => {
    const response = await apiClient.get('/financial/transactions/recent', {
      params: { limit },
    });
    const data = response.data.data?.transactions || response.data.data || response.data;
    return Array.isArray(data) ? data : [];
  },
  getWallet: async () => {
    const response = await apiClient.get('/financial/wallet');
    const data = response.data.data?.cards || response.data.data || response.data;
    return Array.isArray(data) ? data : [];
  },
  getScheduledTransfers: async () => {
    const response = await apiClient.get('/financial/transfers/scheduled');
    const data = response.data.data?.transfers || response.data.data || response.data;
    return Array.isArray(data) ? data : [];
  },
};

export const searchAPI = {
  search: async (query: string) => {
    // Get all data in parallel
    const [transactions, transfers, cards] = await Promise.all([
      dashboardAPI.getTransactions(100),
      dashboardAPI.getScheduledTransfers(),
      dashboardAPI.getWallet(),
    ]);

    const searchTerm = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search in transactions
    transactions.forEach((transaction: Transaction) => {
      if (
        transaction.name?.toLowerCase().includes(searchTerm) ||
        transaction.business?.toLowerCase().includes(searchTerm) ||
        transaction.type?.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: transaction.id,
          type: 'transaction',
          title: transaction.name || transaction.business,
          subtitle: transaction.business || transaction.type,
          amount: transaction.amount,
          currency: transaction.currency,
          image: transaction.image,
          date: transaction.date,
        });
      }
    });

    // Search in transfers
    transfers.forEach((transfer: ScheduledTransfer) => {
      if (transfer.name?.toLowerCase().includes(searchTerm)) {
        results.push({
          id: transfer.id,
          type: 'transfer',
          title: transfer.name,
          subtitle: `Scheduled for ${new Date(transfer.date).toLocaleDateString()}`,
          amount: transfer.amount,
          currency: transfer.currency,
          image: transfer.image,
          date: transfer.date,
        });
      }
    });

    // Search in cards
    cards.forEach((card: Card) => {
      if (
        card.name?.toLowerCase().includes(searchTerm) ||
        card.bank?.toLowerCase().includes(searchTerm) ||
        card.cardNumber?.includes(searchTerm)
      ) {
        results.push({
          id: card.id,
          type: 'card',
          title: card.name,
          subtitle: card.bank,
          image: undefined,
        });
      }
    });

    return {
      results: results.slice(0, 10), // Limit to 10 results
      total: results.length,
    };
  },
};
