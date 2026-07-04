import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, Divider, Avatar,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useAuth, ROLES } from '../../store/authStore';

const USER_NAV = [
  { label: 'Home', icon: <HomeIcon />, path: '/home' },
  { label: 'Search', icon: <SearchIcon />, path: '/search' },
  { label: 'Saved', icon: <FavoriteIcon />, path: '/favorites' },
  { label: 'Bookings', icon: <BookmarkIcon />, path: '/bookings' },
  { label: 'Profile', icon: <PersonIcon />, path: '/profile' },
];

const OWNER_NAV = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/owner/dashboard' },
  { label: 'Add Hostel', icon: <ApartmentIcon />, path: '/owner/add-hostel' },
  { label: 'Add Room', icon: <AddCircleIcon />, path: '/owner/add-room' },
  { label: 'Manage Rooms', icon: <ManageAccountsIcon />, path: '/owner/rooms' },
];

export const SIDEBAR_WIDTH = 260;

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, role, isAuthenticated } = useAuth();

  const isOwner = role === ROLES.HOSTEL_OWNER || role === ROLES.BACHELOR_OWNER;
  const navItems = isOwner ? OWNER_NAV : USER_NAV;
  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase() || '';

  return (
    <Box
      component="nav"
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1200,
        overflowY: 'auto',
      }}
    >
      {/* Brand */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 42, height: 42,
              background: 'linear-gradient(135deg, #1976D2, #26A69A)',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, flexShrink: 0,
            }}
          >
            🏠
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800} color="primary.main" lineHeight={1.1}>
              StayEasy
            </Typography>
            <Typography variant="caption" color="text.disabled">Find your perfect stay</Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Nav Items */}
      <List sx={{ flex: 1, px: 1.5, pt: 1.5 }}>
        {navItems.map(item => {
          const active = pathname.startsWith(item.path);
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  bgcolor: active ? 'primary.light' : 'transparent',
                  color: active ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    bgcolor: active ? 'primary.light' : 'action.hover',
                  },
                  '& .MuiListItemIcon-root': {
                    color: active ? 'primary.main' : 'text.secondary',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 38 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: active ? 700 : 400,
                  }}
                />
                {active && (
                  <Box
                    sx={{
                      width: 4, height: 20, bgcolor: 'primary.main',
                      borderRadius: 2,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* User info footer */}
      {isAuthenticated ? (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              bgcolor: 'primary.main', width: 36, height: 36,
              fontSize: 13, fontWeight: 700, flexShrink: 0,
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} noWrap>{user?.name}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {role === ROLES.END_USER ? 'Tenant' : 'Property Owner'}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary">Browsing as guest</Typography>
        </Box>
      )}
    </Box>
  );
}
