import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Divider,
  AppBar, Toolbar, CircularProgress,
  InputAdornment, Paper, Grow, Fade,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { ROLES } from '../../store/authStore';
import MarketingPanel from '../../components/splash/MarketingPanel';

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
            onClick={() => navigate('/home')}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.25, cursor: 'pointer' }}
          >
            <Box
              sx={{
                width: 38, height: 38, borderRadius: '10px',
                background: 'linear-gradient(135deg, #1976D2, #26A69A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0,
              }}
            >
              🏠
            </Box>
            <Typography variant="h6" fontWeight={800} color="primary.main">
              StayEasy
            </Typography>
          </Box>

          <Button
            onClick={() => navigate('/register')}
            variant="outlined"
            size="small"
            sx={{
              fontWeight: 600, textTransform: 'none', borderRadius: '20px',
              minWidth: 'auto', px: { xs: 1.25, sm: 2 },
            }}
          >
            Register
          </Button>
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
        {/* Left: marketing section — desktop only */}
        <Fade in timeout={600}>
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: '45%' }}>
            <MarketingPanel />
          </Box>
        </Fade>

        {/* Right: login card */}
        <Box sx={{ width: { xs: '100%', md: '55%' }, display: 'flex', justifyContent: 'center' }}>
          <Grow in timeout={500}>
            <Paper
              elevation={0}
              sx={{
                width: '100%',
                maxWidth: 440,
                borderRadius: '24px',
                p: { xs: 3, sm: 4 },
                boxShadow: '0 20px 60px rgba(25,118,210,0.14)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h3" fontWeight={800} gutterBottom>
                Welcome back 👋
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Login to your account to continue.
              </Typography>

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
                sx={{ py: 1.5, mb: 1.5, borderRadius: '14px' }}
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
            </Paper>
          </Grow>
        </Box>
      </Box>
    </Box>
  );
}
