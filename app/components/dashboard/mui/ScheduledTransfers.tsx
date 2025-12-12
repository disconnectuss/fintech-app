'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Link as MuiLink,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useScheduledTransfers } from '@/app/lib/hooks/use-transfers';
import { formatDateTime } from '@/app/lib/utils/formatters';

export default function ScheduledTransfers() {
  const { data: transfers, isLoading, isError } = useScheduledTransfers();

  if (isLoading) {
    return (
      <Card>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (isError || !transfers || transfers.length === 0) {
    return (
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Scheduled Transfers
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              No scheduled transfers
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Scheduled Transfers
          </Typography>
          <MuiLink
            href="/transfers"
            sx={{
              fontSize: 13,
              color: 'var(--info-500)',
              textDecoration: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            View All →
          </MuiLink>
        </Box>

        {/* Transfers List */}
        <List sx={{ p: 0 }}>
          {transfers.map((transfer, index) => {
            const recipientName = transfer.name || transfer.recipientName || 'Unknown';
            const avatarUrl = transfer.image || transfer.recipientAvatar;
            const scheduledDate = transfer.date || transfer.scheduledDate || new Date().toISOString();

            return (
              <ListItem
                key={transfer.id}
                sx={{
                  px: 0,
                  py: 2,
                  borderBottom: index === transfers.length - 1 ? 'none' : '1px solid var(--surface-soft)',
                  '&:hover': {
                    bgcolor: 'var(--surface-muted)',
                    borderRadius: 2,
                    px: 2,
                    mx: -2,
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={avatarUrl}
                    alt={recipientName}
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'var(--brand-primary)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {recipientName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {recipientName}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                      {formatDateTime(scheduledDate)}
                    </Typography>
                  }
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    ml: 2,
                  }}
                >
                  - {transfer.currency}
                  {Math.abs(transfer.amount).toLocaleString()}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
