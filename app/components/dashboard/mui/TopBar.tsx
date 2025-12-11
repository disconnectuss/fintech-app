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
        bgcolor: '#F5F5F5',
        boxShadow: 'none',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
        {/* Page Title */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1B212D' }}>
          Dashboard
        </Typography>

        {/* Right Side - Search, Notifications, Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Search */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              '&:hover': {
                borderColor: '#D1D5DB',
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
              <SearchIcon sx={{ color: '#78778B' }} />
            </Box>
            <InputBase
              placeholder="Search..."
              sx={{
                color: '#1B212D',
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
              bgcolor: 'white',
              border: '1px solid #E5E7EB',
              '&:hover': {
                bgcolor: 'white',
                borderColor: '#D1D5DB',
              },
            }}
          >
            <Badge badgeContent={3} color="error" variant="dot">
              <NotificationsIcon sx={{ color: '#78778B' }} />
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
              bgcolor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: 2,
              px: 1.5,
              py: 0.75,
              '&:hover': {
                bgcolor: '#F9FAFB',
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#C8EE44',
                color: '#1B212D',
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
                color: '#1B212D',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {userName}
            </Typography>
            <ArrowDownIcon sx={{ color: '#78778B', fontSize: 20 }} />
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
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            {/* User Info Header */}
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1B212D' }}>
                {userName}
              </Typography>
              <Typography variant="caption" sx={{ color: '#78778B' }}>
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
            <MenuItem onClick={handleLogout} sx={{ color: '#ef4444' }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: '#ef4444' }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
