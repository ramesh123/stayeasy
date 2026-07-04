import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, Typography,
  AppBar, Toolbar, CircularProgress, Alert,
  Paper, Grow, Fade, Radio, RadioGroup, FormControlLabel,
} from '@mui/material';
import { ROLES, useAuth } from '../../store/authStore';
import MarketingPanel from '../../components/splash/MarketingPanel';

const ROLE_OPTIONS = [
  { value: ROLES.END_USER, label: 'Tenant', desc: 'Looking for a room' },
  { value: ROLES.HOSTEL_OWNER, label: 'Hostel Owner', desc: 'Manage hostel listings' },
  { value: ROLES.BACHELOR_OWNER, label: 'Room Sharing', desc: 'Rent bachelor rooms' },
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
            onClick={() => navigate('/login')}
            variant="outlined"
            size="small"
            sx={{
              fontWeight: 600, textTransform: 'none', borderRadius: '20px',
              minWidth: 'auto', px: { xs: 1.25, sm: 2 },
            }}
          >
            Login
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
            <MarketingPanel
              title="Join StayEasy Today"
              subtitle="Create your free account to search, save and connect with verified owners in seconds."
            />
          </Box>
        </Fade>

        {/* Right: register card */}
        <Box sx={{ width: { xs: '100%', md: '55%' }, display: 'flex', justifyContent: 'center' }}>
          <Grow in timeout={500}>
            <Paper
              elevation={0}
              sx={{
                width: '100%',
                maxWidth: 500,
                borderRadius: '24px',
                p: { xs: 3, sm: 4 },
                boxShadow: '0 20px 60px rgba(25,118,210,0.14)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

              <Typography variant="h3" fontWeight={800} gutterBottom>
                Create your account
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Join StayEasy to find or list your perfect stay.
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
              <RadioGroup
                row
                value={form.role}
                onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: 1, mb: 3 }}
              >
                {ROLE_OPTIONS.map(r => (
                  <FormControlLabel
                    key={r.value}
                    value={r.value}
                    control={<Radio size="small" />}
                    label={
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{r.label}</Typography>
                        <Typography variant="caption" color="text.secondary">{r.desc}</Typography>
                      </Box>
                    }
                    sx={{
                      flex: { xs: '1 1 calc(50% - 8px)', sm: 1 },
                      m: 0, py: 1, pr: 1, borderRadius: 2,
                      border: '2px solid',
                      borderColor: form.role === r.value ? 'primary.main' : 'divider',
                      bgcolor: form.role === r.value ? 'primary.light' : 'background.paper',
                      transition: 'all .15s',
                      alignItems: 'center',
                    }}
                  />
                ))}
              </RadioGroup>

              <Button
                fullWidth variant="contained" size="large"
                onClick={handleSubmit} disabled={loading}
                sx={{ py: 1.5, borderRadius: '14px' }}
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
            </Paper>
          </Grow>
        </Box>
      </Box>
    </Box>
  );
}
