import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';

const NAV_ITEMS = [
  { label: 'Home', icon: <HomeIcon />, path: '/home' },
  { label: 'Search', icon: <SearchIcon />, path: '/search' },
  { label: 'Saved', icon: <FavoriteIcon />, path: '/favorites' },
  { label: 'Bookings', icon: <BookmarkIcon />, path: '/bookings' },
  { label: 'Profile', icon: <PersonIcon />, path: '/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const value = NAV_ITEMS.findIndex(n => pathname.startsWith(n.path));

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100 }}
      elevation={8}
    >
      <BottomNavigation
        value={value === -1 ? 0 : value}
        onChange={(_, idx) => navigate(NAV_ITEMS[idx].path)}
        showLabels
      >
        {NAV_ITEMS.map(item => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            sx={{ '&.Mui-selected': { color: 'primary.main' } }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
