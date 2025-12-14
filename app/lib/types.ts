import type { ButtonHTMLAttributes, ReactNode } from 'react';
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
  signUp: (name: string, email: string, password: string) => Promise<SignUpResult>;
  signOut: () => void;
}
export type SignUpResult = 'authenticated' | 'needs-sign-in';
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
export interface WorkingCapitalData {
  month: string; 
  income: number;
  expense: number;
  net: number;
}
export interface Transaction {
  id: string;
  name: string; 
  title?: string; 
  business: string; 
  image: string; 
  type: string; 
  category?: string; 
  amount: number; 
  currency: string;
  date: string; 
  status: 'completed' | 'pending' | 'failed';
}
export interface Card {
  id: string;
  name: string; 
  type: 'credit' | 'debit';
  cardNumber: string; 
  bank: string; 
  network: 'Visa' | 'Mastercard' | 'Amex';
  expiryMonth: number;
  expiryYear: number;
  color: string; 
  isDefault: boolean;
  brand?: 'visa' | 'mastercard' | 'amex' | 'discover';
  lastFourDigits?: string;
  expiryDate?: string;
  holderName?: string;
  cardHolder?: string;
  balance?: number;
  currency?: string;
  bankName?: string;
}
export interface ScheduledTransfer {
  id: string;
  name: string; 
  image: string; 
  date: string; 
  amount: number; 
  currency: string; 
  status: 'scheduled' | 'pending' | 'completed' | 'failed';
  recipientName?: string;
  recipientAvatar?: string;
  scheduledDate?: string;
  frequency?: 'once' | 'weekly' | 'monthly';
}
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
