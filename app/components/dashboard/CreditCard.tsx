import { Card as CardType } from '@/app/lib/types';
import { formatCardNumber, formatExpiryDate } from '@/app/lib/utils/formatters';

interface CreditCardProps {
  card: CardType;
}

export default function CreditCard({ card }: CreditCardProps) {
  // Determine gradient based on card type or use custom color
  const gradientClass = card.color
    ? ''
    : card.type === 'credit'
    ? 'bg-gradient-to-br from-[#2d2d44] via-[#252540] to-[#1f1f33]'
    : 'bg-gradient-to-br from-[#3d3d54] via-[#353550] to-[#2f2f43]';

  // Get card holder name from bank name
  const holderName = card.cardHolder || card.holderName || card.bank?.split('|')[0]?.trim() || 'Cardholder';

  // Determine brand logo based on network
  const network = card.network || card.brand;
  const brandLogo =
    network?.toLowerCase() === 'visa' ? (
      <div className="text-white text-xl font-bold">VISA</div>
    ) : network?.toLowerCase() === 'mastercard' ? (
      <div className="flex gap-1">
        <div className="w-6 h-6 rounded-full bg-red-500 opacity-80" />
        <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80 -ml-3" />
      </div>
    ) : null;

  return (
    <div
      className={`${gradientClass} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer relative overflow-hidden`}
      style={{
        backgroundColor: card.color || undefined,
        aspectRatio: '1.586',
        minWidth: '280px',
        maxWidth: '360px',
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Top Row: Card/Bank Name + Brand Logo */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium opacity-80">{card.name || card.bankName}</p>
            <p className="text-xs opacity-60 mt-1">
              {card.type === 'credit' ? 'Credit' : 'Debit'} Card
            </p>
          </div>
          {brandLogo}
        </div>

        {/* Middle: Contactless Icon + Card Number */}
        <div className="space-y-4">
          {/* Contactless Icon */}
          <div className="flex justify-start">
            <svg
              className="w-8 h-8 opacity-60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              />
            </svg>
          </div>

          {/* Card Number */}
          <p className="text-lg font-mono tracking-wider">
            {card.cardNumber || (card.lastFourDigits ? formatCardNumber(card.lastFourDigits) : '•••• •••• •••• ••••')}
          </p>
        </div>

        {/* Bottom Row: Holder Name + Expiry */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs opacity-60 mb-1">Card Holder</p>
            <p className="text-sm font-medium uppercase">{holderName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-60 mb-1">Expires</p>
            <p className="text-sm font-medium font-mono">
              {card.expiryDate
                ? formatExpiryDate(card.expiryDate)
                : formatExpiryDate(`${card.expiryMonth}/${card.expiryYear}`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
