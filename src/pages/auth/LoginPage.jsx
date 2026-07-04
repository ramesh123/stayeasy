import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Divider,
  AppBar, Toolbar, IconButton, CircularProgress,
  InputAdornment,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneIcon from '@mui/icons-material/Phone';
import { ROLES } from '../../store/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/otp', { state: { phone, from: 'login', userData: { role: ROLES.END_USER } } });
    }, 700);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left brand panel — desktop only */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '45%',
          background: 'linear-gradient(160deg, #1976D2 0%, #1256A0 55%, #26A69A 100%)',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <Box sx={{ position: 'absolute', bottom: -80, left: -40, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <Box sx={{ fontSize: 56, mb: 2 }}>🏠</Box>
          <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, mb: 1 }}>StayEasy</Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 300, mx: 'auto' }}>
            Your trusted platform for finding hostels and bachelor rooms
          </Typography>
        </Box>
      </Box>

      {/* Right form area */}
      <Box
        sx={{
          flex: 1,
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppBar
          position="static" color="transparent" elevation={0}
          sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
        >
          <Toolbar>
            <IconButton edge="start" onClick={() => navigate('/')}><ArrowBackIcon /></IconButton>
            <Typography variant="h6" sx={{ ml: 1, display: { md: 'block' } }}>Login</Typography>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: { md: 'center' },
            justifyContent: 'center',
          }}
        >
          <Box sx={{ p: 3, width: '100%', maxWidth: 440, pt: { xs: 4, md: 2 } }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              {/* Mobile: show brand; Desktop: show heading */}
              <Box sx={{ display: { md: 'none' } }}>
                <Box sx={{ fontSize: 52, mb: 1 }}>🏠</Box>
                <Typography variant="h3" color="primary.main" fontWeight={800}>
                  StayEasy
                </Typography>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Typography variant="h3" color="text.primary" fontWeight={800}>
                  Welcome back 👋
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Login to your account
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                label="Code" value="+91"
                sx={{ width: 80 }}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth label="Phone number"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              fullWidth variant="contained" size="large"
              onClick={handleSend} disabled={phone.length < 10 || loading}
              sx={{ py: 1.5, mb: 1.5 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Send OTP'}
            </Button>

            <Typography variant="body2" textAlign="center" color="text.secondary">
              New here?{' '}
              <Typography
                component="span" color="primary.main" fontWeight={600}
                sx={{ cursor: 'pointer' }} onClick={() => navigate('/register')}
              >
                Create account
              </Typography>
            </Typography>

            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" color="text.secondary">Or continue with</Typography>
            </Divider>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              <Button variant="outlined" startIcon={<span>🔵</span>} sx={{ py: 1.25 }}>Google</Button>
              <Button variant="outlined" startIcon={<span>📘</span>} sx={{ py: 1.25 }}>Facebook</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
