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
      <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 1.5, sm: 2 } }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Scheduled Transfers
          </Typography>
          <MuiLink
            href="/transfers"
            sx={{
              fontSize: { xs: 12, sm: 13 },
              color: 'var(--info-500)',
              textDecoration: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>View All →</Box>
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>View All</Box>
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
                  py: { xs: 1.5, sm: 2 },
                  borderBottom: index === transfers.length - 1 ? 'none' : '1px solid var(--surface-soft)',
                  '&:hover': {
                    bgcolor: 'var(--surface-muted)',
                    borderRadius: 2,
                    px: { xs: 1, sm: 2 },
                    mx: { xs: -1, sm: -2 },
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={avatarUrl}
                    alt={recipientName}
                    sx={{
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      bgcolor: 'var(--brand-primary)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: { xs: 13, sm: 14 },
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
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: { xs: 13, sm: 14 } }}>
                      {recipientName}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: { xs: 11, sm: 12 } }}>
                      {formatDateTime(scheduledDate)}
                    </Typography>
                  }
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    ml: { xs: 1, sm: 2 },
                    fontSize: { xs: 13, sm: 14 },
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
