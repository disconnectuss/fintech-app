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
      <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Wallet
          </Typography>
          <IconButton size="small">
            <MoreIcon />
          </IconButton>
        </Box>

        {/* Cards Stack */}
        <Box sx={{ position: 'relative', height: { xs: 280, sm: 310 } }}>
          {cards.slice(0, 2).reverse().map((card, index) => {
            const isTopCard = index === 0;
            const bankLabel = card.bank ? card.bank.replace(/maglo/gi, 'Fintech') : '';
            return (
              <Box
                key={card.id}
                sx={{
                  position: 'absolute',
                  top: isTopCard ? 150 : 0,
                  left: 0,
                  right: 0,
                  background: isTopCard
                    ? 'linear-gradient(135deg, rgba(128, 128, 128, 0.85) 0%, rgba(100, 100, 100, 0.85) 100%)'
                    : 'linear-gradient(135deg, var(--surface-dark) 0%, var(--surface-dark-alt) 100%)',
                  borderRadius: 3,
                  p: { xs: 1.5, sm: 2 },
                  color: 'var(--text-inverted)',
                  overflow: 'hidden',
                  minHeight: { xs: 140, sm: 150 },
                  transform: isTopCard ? 'scale(0.93)' : 'scale(1)',
                  transformOrigin: 'top center',
                  opacity: isTopCard ? 0.6 : 1,
                  zIndex: index === 0 ? 2 : 1,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: isTopCard ? 'scale(0.93) translateY(-5px)' : 'scale(1) translateY(-5px)',
                    opacity: 1,
                  },
                }}
              >
              {/* Top Row - Bank Name and WiFi Icon */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 2, sm: 3 } }}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 0.5, fontSize: { xs: 10, sm: 11 } }}>
                    {card.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: 10, sm: 11 } }}>
                    {bankLabel}
                  </Typography>
                </Box>
                <WifiIcon sx={{ fontSize: { xs: 20, sm: 24 }, transform: 'rotate(90deg)', opacity: 0.6 }} />
              </Box>

              {/* Chip Icon */}
              <Box
                sx={{
                  width: { xs: 36, sm: 40 },
                  height: { xs: 26, sm: 30 },
                  borderRadius: 1,
                  border: '1.5px solid var(--overlay-chip)',
                  mb: { xs: 1.5, sm: 2 },
                }}
              />

              {/* Card Number */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  letterSpacing: { xs: 1, sm: 2 },
                  mb: { xs: 1.5, sm: 2 },
                  fontSize: { xs: 14, sm: 16 },
                }}
              >
                {card.cardNumber}
              </Typography>

              {/* Bottom Row - Expiry and Logo */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: 10, sm: 11 } }}>
                  {String(card.expiryMonth).padStart(2, '0')}/{String(card.expiryYear).slice(-2)}
                </Typography>
                {card.network === 'Visa' && (
                  <Box
                    sx={{
                      bgcolor: 'var(--surface-base)',
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography sx={{ color: 'var(--visa-blue)', fontWeight: 700, fontSize: 16 }}>VISA</Typography>
                  </Box>
                )}
                {card.network === 'Mastercard' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: -0.5 }}>
                    <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'var(--mastercard-red)' }} />
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: 'var(--mastercard-orange)',
                        ml: -1.5,
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          );
          })}
        </Box>

        {/* Hidden Cards Indicator */}
        {cards.length > 2 && (
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              border: '1px dashed var(--border-dashed)',
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'var(--surface-muted)',
              },
            }}
          >
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              +{cards.length - 2} more cards
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
