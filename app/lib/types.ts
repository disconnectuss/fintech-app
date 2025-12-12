import type { ButtonHTMLAttributes, ReactNode } from 'react';

// User types
export interface User {
  id: string;
  name?: string;
  fullName?: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

// Auth/UI helper interfaces
export interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

export interface SignInFormErrors {
  email?: string;
  password?: string;
}

export interface SignUpFormErrors {
  name?: string;
  email?: string;
  password?: string;
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

// Dashboard/Chart helpers
export type Period = 'week' | 'month' | 'year';

export interface PeriodTab {
  key: Period;
  label: string;
}

export interface TrendProps {
  direction: 'up' | 'down';
  percentage: number;
}

export interface StatsCardProps {
  title: string;
  value: number;
  currency: string;
  icon: ReactNode;
  trend?: TrendProps;
}

export interface MuiStatCardProps extends StatsCardProps {
  bgcolor?: string;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface NavItem {
  text: string;
  icon: ReactNode;
  path: string;
  section?: 'main' | 'bottom';
}

export interface CreditCardProps {
  card: Card;
}

// UI components
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

export interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Search types
export type SearchResultType = 'transaction' | 'transfer' | 'card';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  amount?: number;
  currency?: string;
  image?: string;
  date?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
}
