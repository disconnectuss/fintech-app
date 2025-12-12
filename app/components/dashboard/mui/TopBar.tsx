'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '@/app/lib/auth-context';

const DRAWER_WIDTH = 240;

export default function TopBar() {
  const { user, signOut, isLoading } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    signOut();
  };

  // Debug: Log user data
  React.useEffect(() => {
    console.log('TopBar - User:', user);
    console.log('TopBar - isLoading:', isLoading);
  }, [user, isLoading]);

  // Get user name - check different possible field names
  const userName = user?.name || user?.fullName || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        bgcolor: 'var(--color-surface-subtle)',
        boxShadow: 'none',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
        {/* Page Title */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Dashboard
        </Typography>

        {/* Right Side - Search, Notifications, Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Search */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              '&:hover': {
                borderColor: 'var(--color-border-subtle)',
              },
              width: { xs: 40, sm: 200, md: 300 },
              transition: 'all 0.2s',
            }}
          >
            <Box
              sx={{
                padding: '0 12px',
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SearchIcon sx={{ color: 'var(--color-text-secondary)' }} />
            </Box>
            <InputBase
              placeholder="Search..."
              sx={{
                color: 'var(--color-text-primary)',
                width: '100%',
                '& .MuiInputBase-input': {
                  padding: '8px 8px 8px 48px',
                  fontSize: 14,
                },
              }}
            />
          </Box>

          {/* Notifications */}
          <IconButton
            sx={{
              bgcolor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              '&:hover': {
                bgcolor: 'var(--color-surface)',
                borderColor: 'var(--color-border-subtle)',
              },
            }}
          >
            <Badge badgeContent={3} color="error" variant="dot">
              <NotificationsIcon sx={{ color: 'var(--color-text-secondary)' }} />
            </Badge>
          </IconButton>

          {/* User Profile */}
          <Box
            onClick={handleMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              bgcolor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 2,
              px: 1.5,
              py: 0.75,
              '&:hover': {
                bgcolor: 'var(--color-surface-muted)',
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'var(--color-primary)',
                color: 'var(--color-text-primary)',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {getInitials(userName)}
            </Avatar>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {userName}
            </Typography>
            <ArrowDownIcon sx={{ color: 'var(--color-text-secondary)', fontSize: 20 }} />
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              mt: 1,
              '& .MuiPaper-root': {
                borderRadius: 2,
                minWidth: 220,
                boxShadow: '0 4px 6px -1px var(--color-shadow-soft)',
              },
            }}
          >
            {/* User Info Header */}
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {userName}
              </Typography>
              <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>
                {userEmail}
              </Typography>
            </Box>
            <Divider />

            {/* Menu Items */}
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: 'var(--color-danger)' }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: 'var(--color-danger)' }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
