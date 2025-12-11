import axios from 'axios';
const API_BASE_URL = 'https:
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
    const response = await apiClient.get('/financial/working-capital');
    const responseData = response.data.data || response.data;
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
    const response = await apiClient.get('/financial/transactions/recent');
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
