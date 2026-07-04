import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Button, Typography, AppBar, Toolbar, IconButton,
  CircularProgress, Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth, ROLES } from '../../store/authStore';

export default function OtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const state = location.state || {};
  const phone = state.phone || '9876543210';
  const userData = state.userData || {};

  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 3) document.getElementById(`otp-${idx + 1}`)?.focus();
    if (!val && idx > 0) document.getElementById(`otp-${idx - 1}`)?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pasted.length === 4) setOtp(pasted.split(''));
  };

  const handleVerify = () => {
    if (otp.some(v => !v)) { setError('Enter all 4 digits'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const role = userData.role || ROLES.END_USER;
      login({ name: userData.name || 'User', phone, role });
      if (role === ROLES.END_USER) navigate('/home');
      else navigate('/owner/dashboard');
    }, 1000);
  };

  const mins = String(Math.floor(timer / 60)).padStart(2, '0');
  const secs = String(timer % 60).padStart(2, '0');

  const OtpForm = (
    <Box sx={{ textAlign: 'center', width: '100%', maxWidth: 400 }}>
      <Box sx={{ fontSize: 64, mb: 2, display: { md: 'none' } }}>📱</Box>
      <Typography variant="h4" fontWeight={700} mb={1}>Enter OTP</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        We sent a 4-digit code to +91 {phone}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>{error}</Alert>}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }} onPaste={handlePaste}>
        {otp.map((val, idx) => (
          <input
            key={idx} id={`otp-${idx}`} maxLength={1} value={val}
            onChange={e => handleChange(idx, e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Backspace' && !val && idx > 0)
                document.getElementById(`otp-${idx - 1}`)?.focus();
            }}
            style={{
              width: 56, height: 64, textAlign: 'center', fontSize: 24,
              fontWeight: 800, border: `2px solid ${val ? '#1976D2' : '#E2E8F0'}`,
              borderRadius: 10, color: '#1976D2', outline: 'none',
              background: val ? '#E3F0FC' : '#fff', transition: 'all .15s',
            }}
          />
        ))}
      </Box>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Expires in{' '}
        <Typography component="span" color="primary.main" fontWeight={700} variant="body2">
          {mins}:{secs}
        </Typography>
      </Typography>

      <Button
        fullWidth variant="contained" size="large"
        onClick={handleVerify} disabled={otp.some(v => !v) || loading}
        sx={{ py: 1.5, mb: 1.5 }}
      >
        {loading ? <CircularProgress size={22} color="inherit" /> : 'Verify OTP'}
      </Button>
      <Button fullWidth variant="text" disabled={timer > 0} onClick={() => setTimer(120)}>
        {timer > 0 ? `Resend in ${mins}:${secs}` : 'Resend OTP'}
      </Button>
    </Box>
  );

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
          <Box sx={{ fontSize: 64, mb: 2 }}>📱</Box>
          <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, mb: 1 }}>Verify your number</Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 280, mx: 'auto' }}>
            We use OTP verification to keep your account safe and secure
          </Typography>
        </Box>
      </Box>

      {/* Right form area */}
      <Box sx={{ flex: 1, bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="static" color="transparent" elevation={0}
          sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
        >
          <Toolbar>
            <IconButton edge="start" onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>Verify phone</Typography>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flex: 1, display: 'flex', alignItems: 'center',
            justifyContent: 'center', p: 3,
          }}
        >
          {OtpForm}
        </Box>
      </Box>
    </Box>
  );
}
