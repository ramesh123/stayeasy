import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Chip, Stack,
  AppBar, Toolbar, IconButton, CircularProgress, Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ROLES, useAuth } from '../../store/authStore';
import MarketingPanel from '../../components/splash/MarketingPanel';

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
          width: '45%',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF3FC 55%, #DCEEFB 100%)',
          flexDirection: 'column',
          justifyContent: 'center',
          p: { md: 5, lg: 6 },
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 3 }}>
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
        <MarketingPanel
          title="Join StayEasy Today"
          subtitle="Create your free account to search, save and connect with verified owners in seconds."
        />
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
