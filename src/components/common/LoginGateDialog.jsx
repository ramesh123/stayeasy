import React, { useState } from 'react';
import {
  Dialog, DialogContent, Box, Typography, TextField,
  Button, IconButton, InputAdornment, CircularProgress,
  useMediaQuery, useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import { useAuth, ROLES } from '../../store/authStore';

export default function LoginGateDialog({ open, onClose, onSuccess, pendingAction }) {
  const { login } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);

  const handleSendOtp = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      const t = setInterval(() => {
        setTimer(prev => { if (prev <= 1) { clearInterval(t); return 0; } return prev - 1; });
      }, 1000);
    }, 1000);
  };

  const handleOtpChange = (idx, val) => {
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 3) document.getElementById(`gate-otp-${idx + 1}`)?.focus();
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({ name: 'User', phone, role: ROLES.END_USER });
      onSuccess?.();
      onClose();
    }, 1000);
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <Dialog
      open={open} onClose={onClose}
      fullWidth maxWidth="xs"
      PaperProps={{
        sx: {
          // Mobile: bottom sheet style; desktop: centered dialog
          borderRadius: isMobile ? '20px 20px 0 0' : '16px',
          m: isMobile ? 0 : 'auto',
          position: isMobile ? 'fixed' : 'relative',
          bottom: isMobile ? 0 : 'auto',
          width: '100%',
        },
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <Box sx={{ width: 40, height: 4, bgcolor: 'divider', borderRadius: 2 }} />
          </Box>
        )}
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12 }} size="small">
          <CloseIcon />
        </IconButton>

        {step === 'phone' && (
          <>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box sx={{ fontSize: 48, mb: 1 }}>🔐</Box>
              <Typography variant="h5" fontWeight={700} mb={0.5}>
                Login to contact owner
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pendingAction === 'call'
                  ? "Get the owner's number after login"
                  : 'Chat via WhatsApp after login'}
              </Typography>
            </Box>
            <TextField
              fullWidth label="Phone number" value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ fontSize: 18 }} /> +91
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth variant="contained" size="large"
              onClick={handleSendOtp} disabled={phone.length < 10 || loading}
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Send OTP →'}
            </Button>
          </>
        )}

        {step === 'otp' && (
          <>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box sx={{ fontSize: 48, mb: 1 }}>📱</Box>
              <Typography variant="h5" fontWeight={700} mb={0.5}>Enter OTP</Typography>
              <Typography variant="body2" color="text.secondary">Sent to +91 {phone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', mb: 2 }}>
              {otp.map((val, idx) => (
                <input
                  key={idx} id={`gate-otp-${idx}`} maxLength={1} value={val}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  style={{
                    width: 52, height: 56, textAlign: 'center', fontSize: 22,
                    fontWeight: 700, border: '2px solid #E2E8F0', borderRadius: 8,
                    color: '#1976D2', outline: 'none',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#1976D2')}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                />
              ))}
            </Box>
            <Typography
              variant="caption" color="text.secondary"
              sx={{ textAlign: 'center', display: 'block', mb: 2 }}
            >
              OTP expires in{' '}
              <Typography component="span" color="primary.main" fontWeight={700} variant="caption">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </Typography>
            </Typography>
            <Button
              fullWidth variant="contained" size="large"
              onClick={handleVerify}
              disabled={otp.some(v => !v) || loading}
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Verify & Continue'}
            </Button>
            <Button fullWidth variant="text" sx={{ mt: 1 }} disabled={timer > 0}>
              {timer > 0
                ? `Resend in ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                : 'Resend OTP'}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
