import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, InputBase, IconButton, Button, Paper,
  Avatar, Menu, MenuItem, Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../store/authStore';
import LocationPickerDialog from '../common/LocationPickerDialog';

const NAV_LINKS = [
  { label: 'Search', path: '/search' },
  { label: 'Saved', path: '/favorites' },
  { label: 'Bookings', path: '/bookings' },
];

export default function AppHeader() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [city, setCity] = useState('Hyderabad');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase() || 'U';

  const handleLogout = () => {
    setMenuAnchor(null);
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ bgcolor: 'primary.main', pt: { xs: 2, md: 3 }, pb: 0 }}>
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', mb: 1.5,
          maxWidth: 1200, mx: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            onClick={() => navigate('/home')}
            sx={{
              width: 36, height: 36, borderRadius: '10px',
              bgcolor: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0, cursor: 'pointer',
            }}
          >
            🏠
          </Box>
          <Box>
            <Box
              onClick={() => setPickerOpen(true)}
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 0.3,
                cursor: 'pointer',
              }}
            >
              <LocationOnIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }} />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                {city}
              </Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }} />
            </Box>
            <Typography
              variant="h5"
              sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              Find your stay
            </Typography>
          </Box>
        </Box>

        {/* Desktop nav links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
          {NAV_LINKS.map(link => (
            <Typography
              key={link.path}
              onClick={() => navigate(link.path)}
              sx={{
                color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '0.9rem',
                cursor: 'pointer', '&:hover': { color: '#fff' },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Box>

        {isAuthenticated ? (
          <>
            <Box
              onClick={(e) => setMenuAnchor(e.currentTarget)}
              sx={{ display: 'flex', alignItems: 'center', gap: 0.75, cursor: 'pointer', flexShrink: 0 }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.25)', fontSize: 13, fontWeight: 700 }}>
                {initials}
              </Avatar>
              <Typography
                sx={{ display: { xs: 'none', sm: 'block' }, color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}
              >
                {user?.name}
              </Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.85)' }} />
            </Box>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={() => { setMenuAnchor(null); navigate('/profile'); }}>
                <PersonIcon fontSize="small" sx={{ mr: 1.25 }} /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1.25 }} /> Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            onClick={() => navigate('/login')}
            variant="outlined"
            size="small"
            sx={{
              color: '#fff', borderColor: 'rgba(255,255,255,0.6)',
              textTransform: 'none', fontWeight: 600, borderRadius: '20px',
              px: 2, flexShrink: 0,
              '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Login
          </Button>
        )}
      </Box>

      {/* Search bar */}
      <Box sx={{ px: { xs: 2, md: 4 }, pb: 2, maxWidth: 1200, mx: 'auto' }}>
        <Paper
          sx={{
            p: '8px 14px', display: 'flex', alignItems: 'center',
            gap: 1, borderRadius: '24px',
          }}
          elevation={2}
        >
          <SearchIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
          <InputBase
            placeholder={`Search in ${city}, area or hostel name…`}
            sx={{ flex: 1, fontSize: '0.875rem' }}
            onFocus={() => navigate('/search')}
          />
          <IconButton
            size="small"
            onClick={() => navigate('/search')}
            sx={{ color: 'primary.main' }}
          >
            <TuneIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Paper>
      </Box>

      <LocationPickerDialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        currentCity={city}
        onSelect={setCity}
      />
    </Box>
  );
}
