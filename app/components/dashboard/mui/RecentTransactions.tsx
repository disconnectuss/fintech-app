'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import { useTransactions } from '@/app/lib/hooks/use-transactions';
import { formatRelativeDate } from '@/app/lib/utils/formatters';

export default function RecentTransactions() {
  const { data: transactions, isLoading, isError } = useTransactions(5);

  if (isLoading) {
    return (
      <Card>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (isError || !transactions || transactions.length === 0) {
    return (
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Recent Transaction
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
            <Typography variant="body2" color="text.secondary">
              No transactions found
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
            Recent Transaction
          </Typography>
          <MuiLink
            href="/transactions"
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

        {/* Mobile List View */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {transactions.map((transaction) => {
            const isExpense = transaction.type === 'expense' || transaction.amount < 0;
            const displayAmount = Math.abs(transaction.amount);

            return (
              <Box
                key={transaction.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 2,
                  borderBottom: '1px solid var(--border-base)',
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                  <Avatar
                    src={transaction.image}
                    alt={transaction.business}
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'var(--surface-soft)',
                    }}
                  >
                    {transaction.business?.[0] || 'T'}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>
                      {transaction.name || transaction.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: 11 }}>
                      {transaction.business}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: isExpense ? 'var(--text-primary)' : 'var(--success-500)',
                      fontSize: 14,
                    }}
                  >
                    {isExpense ? '-' : '+'}${displayAmount.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: 11 }}>
                    {formatRelativeDate(transaction.date)}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Desktop Table View */}
        <TableContainer sx={{ display: { xs: 'none', md: 'block' } }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                  NAME/BUSINESS
                </TableCell>
                <TableCell sx={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                  TYPE
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}
                >
                  AMOUNT
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}
                >
                  DATE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => {
                const isExpense = transaction.type === 'expense' || transaction.amount < 0;
                const displayAmount = Math.abs(transaction.amount);

                return (
                  <TableRow
                    key={transaction.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { bgcolor: 'var(--surface-muted)' },
                    }}
                  >
                    {/* Name/Business */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          src={transaction.image}
                          alt={transaction.business}
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: 'var(--surface-soft)',
                          }}
                        >
                          {transaction.business?.[0] || 'T'}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                            {transaction.name || transaction.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                            {transaction.business}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      <Chip
                        label={transaction.type || transaction.category || 'Other'}
                        size="small"
                        sx={{
                          bgcolor: 'var(--surface-soft)',
                          color: 'var(--text-secondary)',
                          fontWeight: 500,
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      />
                    </TableCell>

                    {/* Amount */}
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: isExpense ? 'var(--text-primary)' : 'var(--success-500)',
                        }}
                      >
                        {isExpense ? '-' : '+'}${displayAmount.toLocaleString()}
                      </Typography>
                    </TableCell>

                    {/* Date */}
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                        {formatRelativeDate(transaction.date)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
