'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { MoreHoriz as MoreIcon, Wifi as WifiIcon } from '@mui/icons-material';
import { useWalletCards } from '@/app/lib/hooks/use-wallet';

export default function WalletSection() {
  const { data: cards, isLoading, isError } = useWalletCards();

  if (isLoading) {
    return (
      <Card>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (isError || !cards || cards.length === 0) {
    return (
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Wallet
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              No cards found
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Wallet
          </Typography>
          <IconButton size="small">
            <MoreIcon />
          </IconButton>
        </Box>

        {/* Cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {cards.slice(0, 2).map((card, index) => (
            <Box
              key={card.id}
              sx={{
                background:
                  index === 0
                    ? 'linear-gradient(135deg, #1B212D 0%, #2D3748 100%)'
                    : 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                borderRadius: 3,
                p: 2.5,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 160,
              }}
            >
              {/* Top Row - Bank Name and WiFi Icon */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 0.5 }}>
                    {card.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 11 }}>
                    {card.bank}
                  </Typography>
                </Box>
                <WifiIcon sx={{ fontSize: 24, transform: 'rotate(90deg)', opacity: 0.6 }} />
              </Box>

              {/* Chip Icon */}
              <Box
                sx={{
                  width: 40,
                  height: 30,
                  borderRadius: 1,
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  mb: 2,
                }}
              />

              {/* Card Number */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  letterSpacing: 2,
                  mb: 2,
                  fontSize: 16,
                }}
              >
                {card.cardNumber}
              </Typography>

              {/* Bottom Row - Expiry and Logo */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ opacity: 0.8, fontSize: 11 }}>
                  {String(card.expiryMonth).padStart(2, '0')}/{String(card.expiryYear).slice(-2)}
                </Typography>
                {card.network === 'Visa' && (
                  <Box
                    sx={{
                      bgcolor: 'white',
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography sx={{ color: '#1434CB', fontWeight: 700, fontSize: 16 }}>VISA</Typography>
                  </Box>
                )}
                {card.network === 'Mastercard' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: -0.5 }}>
                    <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: '#EB001B' }} />
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: '#F79E1B',
                        ml: -1.5,
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          ))}

          {/* Hidden Cards Indicator */}
          {cards.length > 2 && (
            <Box
              sx={{
                p: 2,
                textAlign: 'center',
                border: '1px dashed #E5E7EB',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#F9FAFB',
                },
              }}
            >
              <Typography variant="body2" sx={{ color: '#78778B' }}>
                +{cards.length - 2} more cards
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
