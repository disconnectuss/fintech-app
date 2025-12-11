// User types
export interface User {
  id: string;
  name?: string;
  fullName?: string;
  email: string;
}

// Dashboard Summary (matching API response from /financial/summary)
export interface DashboardSummary {
  totalBalance: {
    amount: number;
    currency: string;
    change?: {
      percentage: number;
      trend: 'up' | 'down' | 'neutral';
    };
  };
  totalExpense: {
    amount: number;
    currency: string;
    change?: {
      percentage: number;
      trend: 'up' | 'down' | 'neutral';
    };
  };
  totalSavings: {
    amount: number;
    currency: string;
    change?: {
      percentage: number;
      trend: 'up' | 'down' | 'neutral';
    };
  };
  lastUpdated?: string;
}

// Working Capital Chart Data (matching API response from /financial/working-capital)
export interface WorkingCapitalData {
  month: string; // "Ocak", "Şubat", etc. (Turkish month names)
  income: number;
  expense: number;
  net: number;
}

// Transaction (matching API response from /financial/transactions/recent)
export interface Transaction {
  id: string;
  name: string; // Product/service name
  title?: string; // Alias for compatibility
  business: string; // Business/Company name
  image: string; // Business logo URL
  type: string; // Category (Mobile, Entertainment, etc.)
  category?: string; // Alias for compatibility
  amount: number; // Positive for income, negative for expense
  currency: string;
  date: string; // ISO date string
  status: 'completed' | 'pending' | 'failed';
}

// Credit/Debit Card (matching API response from /financial/wallet)
export interface Card {
  id: string;
  name: string; // Card name (e.g., "Maglo Gold Card")
  type: 'credit' | 'debit';
  cardNumber: string; // Full number like "5495 7381 3759 2321"
  bank: string; // Bank name with brand (e.g., "Maglo | Universal Bank")
  network: 'Visa' | 'Mastercard' | 'Amex';
  expiryMonth: number;
  expiryYear: number;
  color: string; // Hex color for card (e.g., "#000000")
  isDefault: boolean;
  // Legacy fields for compatibility
  brand?: 'visa' | 'mastercard' | 'amex' | 'discover';
  lastFourDigits?: string;
  expiryDate?: string;
  holderName?: string;
  cardHolder?: string;
  balance?: number;
  currency?: string;
  bankName?: string;
}

// Scheduled Transfer (matching API response from /financial/transfers/scheduled)
export interface ScheduledTransfer {
  id: string;
  name: string; // Recipient's full name
  image: string; // Avatar URL
  date: string; // Scheduled date/time (ISO)
  amount: number; // Negative for outgoing
  currency: string; // Currency symbol
  status: 'scheduled' | 'pending' | 'completed' | 'failed';
  // Legacy fields for compatibility
  recipientName?: string;
  recipientAvatar?: string;
  scheduledDate?: string;
  frequency?: 'once' | 'weekly' | 'monthly';
}

// API Response wrappers
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
