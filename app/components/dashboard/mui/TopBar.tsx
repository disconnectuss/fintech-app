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
  ListItemText,
  ListItemAvatar,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Receipt as ReceiptIcon,
  SwapHoriz as TransferIcon,
  CreditCard as CardIcon,
} from '@mui/icons-material';
import { useAuth } from '@/app/lib/auth-context';
import { searchAPI } from '@/app/lib/api';
import type { SearchResult } from '@/app/lib/types';

const DRAWER_WIDTH = 240;

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { user, signOut, isLoading } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [searchAnchorEl, setSearchAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const searchBoxRef = React.useRef<HTMLDivElement>(null);

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

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.trim().length > 1) {
      setIsSearching(true);
      setSearchAnchorEl(searchBoxRef.current);
      try {
        const response = await searchAPI.search(value);
        setSearchResults(response.results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
      setSearchAnchorEl(null);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleSearchClose = () => {
    setSearchAnchorEl(null);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return <ReceiptIcon />;
      case 'transfer':
        return <TransferIcon />;
      case 'card':
        return <CardIcon />;
      default:
        return <ReceiptIcon />;
    }
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
        width: { xs: '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { xs: 0, sm: `${DRAWER_WIDTH}px` },
        bgcolor: 'var(--surface-subtle)',
        boxShadow: 'none',
        borderBottom: '1px solid var(--border-base)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
        {/* Left Side - Menu Icon (Mobile) + Page Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{
              display: { xs: 'block', sm: 'none' },
              color: 'var(--text-primary)',
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Page Title */}
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            Dashboard
          </Typography>
        </Box>

        {/* Right Side - Search, Notifications, Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Search */}
          <Box sx={{ position: 'relative' }}>
            <Box
              ref={searchBoxRef}
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                position: 'relative',
                borderRadius: 2,
                backgroundColor: 'var(--surface-base)',
                border: '1px solid var(--border-base)',
                '&:hover': {
                  borderColor: 'var(--border-subtle)',
                },
                '&:focus-within': {
                  borderColor: 'var(--brand-primary)',
                  boxShadow: '0 0 0 2px var(--brand-soft)',
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
                {isSearching ? (
                  <CircularProgress size={16} sx={{ color: 'var(--text-secondary)' }} />
                ) : (
                  <SearchIcon sx={{ color: 'var(--text-secondary)' }} />
                )}
              </Box>
              <InputBase
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchChange}
                sx={{
                  color: 'var(--text-primary)',
                  width: '100%',
                  '& .MuiInputBase-input': {
                    padding: '8px 8px 8px 48px',
                    fontSize: 14,
                  },
                }}
              />
            </Box>

            {/* Search Results Dropdown */}
            <Menu
              anchorEl={searchAnchorEl}
              open={Boolean(searchAnchorEl)}
              onClose={handleSearchClose}
              sx={{
                mt: 1,
                '& .MuiPaper-root': {
                  width: { xs: 280, sm: 320, md: 400 },
                  maxHeight: 400,
                  borderRadius: 2,
                  boxShadow: '0 4px 6px -1px var(--shadow-soft)',
                },
              }}
            >
              {searchResults.length === 0 && !isSearching && (
                <MenuItem disabled>
                  <Typography variant="body2" color="text.secondary">
                    No results found
                  </Typography>
                </MenuItem>
              )}

              {searchResults.map((result) => (
                <MenuItem
                  key={result.id}
                  onClick={handleSearchClose}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'var(--surface-muted)',
                    },
                  }}
                >
                  <ListItemAvatar>
                    {result.image ? (
                      <Avatar src={result.image} sx={{ width: 40, height: 40 }} />
                    ) : (
                      <Avatar sx={{ bgcolor: 'var(--brand-soft)', color: 'var(--brand-primary)' }}>
                        {getResultIcon(result.type)}
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={result.title}
                    secondary={result.subtitle}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                    secondaryTypographyProps={{
                      fontSize: 12,
                      color: 'var(--text-secondary)',
                    }}
                  />
                  {result.amount && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: result.amount > 0 ? 'var(--success-500)' : 'var(--text-primary)',
                      }}
                    >
                      {result.amount > 0 ? '+' : ''}
                      {result.currency}
                      {Math.abs(result.amount).toFixed(2)}
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Notifications */}
          <IconButton
            sx={{
              bgcolor: 'var(--surface-base)',
              border: '1px solid var(--border-base)',
              '&:hover': {
                bgcolor: 'var(--surface-base)',
                borderColor: 'var(--border-subtle)',
              },
            }}
          >
            <Badge badgeContent={3} color="error" variant="dot">
              <NotificationsIcon sx={{ color: 'var(--text-secondary)' }} />
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
              bgcolor: 'var(--surface-base)',
              border: '1px solid var(--border-base)',
              borderRadius: 2,
              px: 1.5,
              py: 0.75,
              '&:hover': {
                bgcolor: 'var(--surface-muted)',
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'var(--brand-primary)',
                color: 'var(--text-primary)',
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
                color: 'var(--text-primary)',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {userName}
            </Typography>
            <ArrowDownIcon sx={{ color: 'var(--text-secondary)', fontSize: 20 }} />
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
                boxShadow: '0 4px 6px -1px var(--shadow-soft)',
              },
            }}
          >
            {/* User Info Header */}
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {userName}
              </Typography>
              <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
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
            <MenuItem onClick={handleLogout} sx={{ color: 'var(--danger-500)' }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: 'var(--danger-500)' }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
