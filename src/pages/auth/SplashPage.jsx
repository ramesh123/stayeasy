import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Stack } from '@mui/material';
import { useAuth } from '../../store/authStore';

const FEATURES = [
  { icon: '🔍', text: 'Search hostels & PG rooms near you' },
  { icon: '💬', text: 'Contact owners directly via call or WhatsApp' },
  { icon: '❤️', text: 'Save your favourite listings' },
  { icon: '✅', text: 'Verified listings with real details' },
];

export default function SplashPage() {
  const navigate = useNavigate();
  const { loginAsGuest } = useAuth();

  const handleGuest = () => {
    loginAsGuest();
    navigate('/home');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left brand panel — desktop only */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '50%',
          background: 'linear-gradient(160deg, #1976D2 0%, #1256A0 55%, #26A69A 100%)',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <Box sx={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

        <Box sx={{ position: 'relative', textAlign: 'center', maxWidth: 440 }}>
          <Box
            sx={{
              width: 80, height: 80,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '22px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40, mb: 2.5, mx: 'auto',
              border: '2px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(8px)',
            }}
          >
            🏠
          </Box>
          <Typography variant="h1" sx={{ color: '#fff', fontWeight: 800, fontSize: '2.75rem', mb: 1 }}>
            StayEasy
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400, mb: 4, lineHeight: 1.5 }}>
            Find hostels & bachelor rooms near you in seconds
          </Typography>

          <Stack spacing={1.5}>
            {FEATURES.map(f => (
              <Box key={f.text} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textAlign: 'left' }}>
                <Box sx={{ fontSize: 20, width: 32, flexShrink: 0, textAlign: 'center' }}>{f.icon}</Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>{f.text}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Right form panel */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          // Mobile: gradient background
          background: {
            xs: 'linear-gradient(160deg, #1976D2 0%, #1256A0 60%, #26A69A 100%)',
            md: 'background.paper',
          },
          bgcolor: { md: 'background.paper' },
          p: { xs: 4, md: 6 },
        }}
      >
        {/* Mobile-only brand mark */}
        <Box sx={{ display: { md: 'none' }, textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 90, height: 90,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 44, mb: 2, mx: 'auto',
              border: '2px solid rgba(255,255,255,0.35)',
              backdropFilter: 'blur(8px)',
            }}
          >
            🏠
          </Box>
          <Typography variant="h1" sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '2rem', sm: '2.5rem' }, mb: 0.75 }}>
            StayEasy
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 280, mx: 'auto' }}>
            Find hostels & bachelor rooms near you in seconds
          </Typography>
        </Box>

        {/* Desktop heading */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'center', mb: 4, width: '100%', maxWidth: 380 }}>
          <Typography variant="h3" color="text.primary" fontWeight={800} mb={0.75}>
            Welcome back 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in or create an account to get started
          </Typography>
        </Box>

        <Stack spacing={1.5} sx={{ width: '100%', maxWidth: 380 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              py: 1.5, fontWeight: 700,
              background: { xs: '#fff', md: 'primary.main' },
              color: { xs: 'primary.main', md: '#fff' },
              '&:hover': {
                background: { xs: 'rgba(255,255,255,0.92)', md: 'primary.dark' },
              },
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              py: 1.5, fontWeight: 700,
              borderColor: { xs: 'rgba(255,255,255,0.5)', md: 'primary.main' },
              color: { xs: '#fff', md: 'primary.main' },
              '&:hover': {
                borderColor: { xs: '#fff', md: 'primary.dark' },
                background: { xs: 'rgba(255,255,255,0.08)', md: 'primary.light' },
              },
            }}
          >
            Create account
          </Button>
          <Button
            variant="text"
            onClick={handleGuest}
            sx={{
              color: { xs: 'rgba(255,255,255,0.75)', md: 'text.secondary' },
              fontWeight: 400, fontSize: '0.8125rem',
            }}
          >
            Continue as guest
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
