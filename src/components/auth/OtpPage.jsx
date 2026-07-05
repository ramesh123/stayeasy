'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box, Button, Typography, AppBar, Toolbar,
  CircularProgress, Alert, Paper, Grow, Fade,
} from '@mui/material';
import { useAuth, ROLES } from '../../store/authStore';
import MarketingPanel from '../../components/splash/MarketingPanel';

export default function OtpPage() {
  const router = useRouter();
  const { login, pendingAuth } = useAuth();
  const phone = pendingAuth?.phone || '9876543210';
  const userData = pendingAuth?.userData || {};

  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  // Verify OTP navigates conditionally after an async step — prefetch both possible destinations.
  useEffect(() => {
    router.prefetch('/home');
    router.prefetch('/owner/dashboard');
  }, [router]);

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
      if (role === ROLES.END_USER) router.push('/home');
      else router.push('/owner/dashboard');
    }, 1000);
  };

  const mins = String(Math.floor(timer / 60)).padStart(2, '0');
  const secs = String(timer % 60).padStart(2, '0');

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
            component={Link}
            href="/home"
            sx={{ display: 'flex', alignItems: 'center', gap: 1.25, cursor: 'pointer', textDecoration: 'none' }}
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
            <MarketingPanel
              title="Verify Your Number"
              subtitle="We use OTP verification to keep your account safe and secure."
            />
          </Box>
        </Fade>

        {/* Right: OTP card */}
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
                textAlign: 'center',
              }}
            >
              <Box sx={{ fontSize: 52, mb: 1.5 }}>📱</Box>
              <Typography variant="h3" fontWeight={800} gutterBottom>
                Enter OTP
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
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
                sx={{ py: 1.5, mb: 1.5, borderRadius: '14px' }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Verify OTP'}
              </Button>
              <Button fullWidth variant="text" disabled={timer > 0} onClick={() => setTimer(120)}>
                {timer > 0 ? `Resend in ${mins}:${secs}` : 'Resend OTP'}
              </Button>
            </Paper>
          </Grow>
        </Box>
      </Box>
    </Box>
  );
}
