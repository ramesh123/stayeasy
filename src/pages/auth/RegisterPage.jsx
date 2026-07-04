import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Chip, Stack,
  AppBar, Toolbar, IconButton, CircularProgress, Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ROLES, useAuth } from '../../store/authStore';

const ROLE_OPTIONS = [
  { value: ROLES.END_USER, label: '🧑 Tenant', desc: 'Looking for a room' },
  { value: ROLES.HOSTEL_OWNER, label: '🏨 Hostel owner', desc: 'Manage hostel listings' },
  { value: ROLES.BACHELOR_OWNER, label: '🏠 Room owner', desc: 'Rent bachelor rooms' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', email: '', role: ROLES.END_USER });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    if (form.name.trim().length < 2) return 'Name must be at least 2 characters';
    if (form.phone.replace(/\D/g, '').length !== 10) return 'Enter a valid 10-digit phone number';
    return '';
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/otp', { state: { phone: form.phone, from: 'register', userData: form } });
    }, 800);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left brand panel — desktop only */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '40%',
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
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 280, mx: 'auto', mb: 3 }}>
            Join thousands of tenants and owners on StayEasy
          </Typography>
          <Stack spacing={1} sx={{ textAlign: 'left' }}>
            {['Free to join and use', 'Direct contact with owners', 'Verified listings only'].map(t => (
              <Box key={t} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: '#4CAF50', fontSize: 18 }}>✓</Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>{t}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Right form area */}
      <Box sx={{ flex: 1, bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="static" color="transparent" elevation={0}
          sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
        >
          <Toolbar>
            <IconButton edge="start" onClick={() => navigate('/')}><ArrowBackIcon /></IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>Create account</Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ flex: 1, display: 'flex', alignItems: { md: 'center' }, justifyContent: 'center' }}>
          <Box sx={{ p: 2.5, width: '100%', maxWidth: 500 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Typography
              variant="h4" fontWeight={700}
              sx={{ mb: 2.5, display: { xs: 'none', md: 'block' } }}
            >
              Create your account
            </Typography>

            <TextField
              fullWidth label="Full name"
              value={form.name} onChange={set('name')}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField label="Code" value="+91" sx={{ width: 80 }} InputProps={{ readOnly: true }} />
              <TextField
                fullWidth label="Phone number" value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
              />
            </Box>
            <TextField
              fullWidth label="Email (optional)" type="email"
              value={form.email} onChange={set('email')}
              sx={{ mb: 2.5 }}
            />

            <Typography variant="subtitle2" gutterBottom>I am a</Typography>
            <Stack spacing={1} sx={{ mb: 3 }}>
              {ROLE_OPTIONS.map(r => (
                <Box
                  key={r.value}
                  onClick={() => setForm(p => ({ ...p, role: r.value }))}
                  sx={{
                    p: 1.5, borderRadius: 2, cursor: 'pointer',
                    border: '2px solid',
                    borderColor: form.role === r.value ? 'primary.main' : 'divider',
                    bgcolor: form.role === r.value ? 'primary.light' : 'background.paper',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'all .15s',
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight={600}>{r.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{r.desc}</Typography>
                  </Box>
                  {form.role === r.value && (
                    <Chip label="Selected" size="small" color="primary" />
                  )}
                </Box>
              ))}
            </Stack>

            <Button
              fullWidth variant="contained" size="large"
              onClick={handleSubmit} disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Send OTP to verify →'}
            </Button>
            <Typography variant="body2" textAlign="center" sx={{ mt: 2, color: 'text.secondary' }}>
              Already have an account?{' '}
              <Typography
                component="span" color="primary.main" fontWeight={600}
                sx={{ cursor: 'pointer' }} onClick={() => navigate('/login')}
              >
                Login
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
