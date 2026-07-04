'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, AppBar, Toolbar, Typography, Button, Fade } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAuth } from '../../store/authStore';
import LocationPickerDialog from '../../components/common/LocationPickerDialog';
import MarketingPanel from '../../components/splash/MarketingPanel';
import SearchCard from '../../components/splash/SearchCard';

export default function SplashPage() {
  const router = useRouter();
  const { loginAsGuest } = useAuth();
  const [city, setCity] = useState('Hyderabad');
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSearch = () => {
    loginAsGuest();
    router.push('/search');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF3FC 55%, #DCEEFB 100%)',
      }}
    >
      {/* Header */}
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar
          variant="dense"
          sx={{ justifyContent: 'space-between', maxWidth: 1280, mx: 'auto', width: '100%' }}
        >
          <Box
            onClick={() => router.push('/home')}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.25, cursor: 'pointer' }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1976D2, #26A69A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              🏠
            </Box>
            <Typography variant="h6" fontWeight={800} color="primary.main">
              StayEasy
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 1 } }}>
            <Button
              onClick={() => router.push('/login')}
              sx={{
                color: 'text.primary', fontWeight: 600, textTransform: 'none',
                minWidth: 'auto', px: { xs: 0.75, sm: 1.5 },
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => router.push('/register')}
              variant="outlined"
              size="small"
              sx={{
                fontWeight: 600, textTransform: 'none', borderRadius: '20px',
                minWidth: 'auto', px: { xs: 1, sm: 2 },
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              }}
            >
              Register
            </Button>
            <Button
              onClick={() => setPickerOpen(true)}
              startIcon={<LocationOnIcon fontSize="small" />}
              endIcon={<KeyboardArrowDownIcon fontSize="small" />}
              aria-haspopup="dialog"
              sx={{
                color: 'text.primary', fontWeight: 600, textTransform: 'none',
                minWidth: 'auto', px: { xs: 0.75, sm: 1.5 },
                '& .MuiButton-endIcon': { ml: { xs: 0, sm: 0.5 } },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{city}</Box>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Body */}
      <Box
        sx={{
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 3, md: 5 },
          py: { xs: 3, md: 4 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          gap: { xs: 4, md: 4 },
        }}
      >
        {/* Left: marketing section */}
        <Fade in timeout={600}>
          <Box sx={{ width: { xs: '100%', md: '45%' } }}>
            <MarketingPanel />
          </Box>
        </Fade>

        {/* Right: search card */}
        <Box sx={{ width: { xs: '100%', md: '55%' }, display: 'flex', justifyContent: 'center' }}>
          <SearchCard city={city} onCityChange={setCity} onSearch={handleSearch} />
        </Box>
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
