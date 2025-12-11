/**
 * Currency formatting using Intl.NumberFormat
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Date formatting using Intl.DateTimeFormat
 */
export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  locale: string = 'en-US'
): string => {
  return new Intl.DateTimeFormat(locale, options).format(new Date(dateString));
};

/**
 * Format date with time
 */
export const formatDateTime = (
  dateString: string,
  locale: string = 'en-US'
): string => {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dateString));
};

/**
 * Relative date formatting (e.g., "2 days ago", "just now")
 */
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return formatDate(dateString);
};

/**
 * Format card number with masking (e.g., "**** **** **** 1234")
 */
export const formatCardNumber = (lastFour: string): string => {
  return `**** **** **** ${lastFour}`;
};

/**
 * Format full card number with spacing (e.g., "1234 5678 9012 3456")
 */
export const formatFullCardNumber = (cardNumber: string): string => {
  return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
};

/**
 * Format percentage with sign (e.g., "+5.2%", "-2.1%")
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
};

/**
 * Abbreviate large numbers (e.g., 1000 -> "1K", 1000000 -> "1M")
 */
export const abbreviateNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

/**
 * Format expiry date (MM/YY format)
 * Can accept either (month, year) or a string like "MM/YY" or "M/YYYY"
 */
export const formatExpiryDate = (
  monthOrDate: number | string,
  year?: number
): string => {
  if (typeof monthOrDate === 'string') {
    // Parse string format like "MM/YY", "M/YYYY", or "MM/YYYY"
    if (monthOrDate.includes('/')) {
      const parts = monthOrDate.split('/');
      const month = parts[0].padStart(2, '0');
      const yearPart = parts[1].slice(-2);
      return `${month}/${yearPart}`;
    }
    return monthOrDate;
  }

  if (year === undefined) {
    throw new Error('Year parameter is required when month is a number');
  }

  const monthStr = monthOrDate.toString().padStart(2, '0');
  const yearStr = year.toString().slice(-2);
  return `${monthStr}/${yearStr}`;
};