'use client';

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Receipt as ReceiptIcon,
  Description as DescriptionIcon,
  AccountBalanceWallet as WalletIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-context';
import type { NavItem } from '@/app/lib/types';

const DRAWER_WIDTH = 240;

const navItems: NavItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', section: 'main' },
  { text: 'Transactions', icon: <ReceiptIcon />, path: '/transactions', section: 'main' },
  { text: 'Invoices', icon: <DescriptionIcon />, path: '/invoices', section: 'main' },
  { text: 'My Wallets', icon: <WalletIcon />, path: '/wallets', section: 'main' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings', section: 'main' },
  { text: 'Help', icon: <HelpIcon />, path: '/help', section: 'bottom' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const mainNavItems = navItems.filter((item) => item.section === 'main');
  const bottomNavItems = navItems.filter((item) => item.section === 'bottom');

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid var(--color-border)',
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: 'var(--color-surface-dark)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ color: 'var(--color-text-inverted)', fontWeight: 700, fontSize: 18 }}>F</Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Fintech
        </Typography>
      </Box>

      {/* Main Navigation */}
      <List sx={{ px: 2, flex: 1 }}>
        {mainNavItems.map((item) => {
          const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  '&:hover': {
                    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-primary-soft)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    minWidth: 40,
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Navigation */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <List>
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.path || pathname?.startsWith(`${item.path}/`);

            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    backgroundColor: isActive ? 'var(--color-primary-soft-medium)' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive
                        ? 'var(--color-primary-soft-strong)'
                        : 'var(--color-overlay-light)',
                    },
                    '& .MuiListItemIcon-root': {
                      color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                      minWidth: 40,
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}

          {/* Logout */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                color: 'var(--color-text-secondary)',
                '&:hover': {
                  backgroundColor: 'var(--color-danger-soft)',
                  color: 'var(--color-danger)',
                  '& .MuiListItemIcon-root': {
                    color: 'var(--color-danger)',
                  },
                },
                '& .MuiListItemIcon-root': {
                  color: 'var(--color-text-secondary)',
                  minWidth: 40,
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
