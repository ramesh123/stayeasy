'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, AppBar, Toolbar, IconButton, Typography, TextField,
  Button, Grid, Chip, Stack, Divider, Snackbar, Alert,
  CircularProgress, Card, CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AmenityChip from '../../components/common/AmenityChip';
import AppLayout from '../../components/layout/AppLayout';

const GENDER_OPTIONS = [
  { value: 'Boys', emoji: '👦' },
  { value: 'Girls', emoji: '👧' },
  { value: 'Both', emoji: '👥' },
];

const AMENITIES = ['WiFi', 'Food', 'Parking', 'Laundry', 'Power Backup', 'CCTV', 'Hot Water', 'Security'];

export default function AddHostelPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', ownerName: '', mobile: '', email: '',
    gender: 'Boys', city: '', area: '', pincode: '', landmark: '',
    description: '',
  });
  const [amenities, setAmenities] = useState(['WiFi', 'Food', 'CCTV', 'Security']);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const toggleAmenity = (a) => {
    setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'Hostel name is required';
    if (!form.ownerName) e.ownerName = 'Owner name is required';
    if (!form.mobile || form.mobile.length < 10) e.mobile = 'Valid 10-digit mobile required';
    if (!form.city) e.city = 'City is required';
    if (!form.area) e.area = 'Area is required';
    if (!form.pincode || form.pincode.length !== 6) e.pincode = 'Valid 6-digit pincode required';
    if (form.description.length < 30) e.description = 'Description must be at least 30 characters';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.push('/owner/dashboard'), 1500);
    }, 1000);
  };

  return (
    <AppLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 4 }}>
        <AppBar
          position="sticky" color="default" elevation={0}
          sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
        >
          <Toolbar>
            <IconButton edge="start" onClick={() => router.back()}><ArrowBackIcon /></IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>Add hostel</Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
          <Grid container spacing={3}>
            {/* Left column */}
            <Grid item xs={12} md={7}>
              <Card sx={{ mb: 2.5 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Basic information
                  </Typography>
                  <TextField
                    fullWidth label="Hostel name"
                    value={form.name} onChange={set('name')}
                    error={!!errors.name} helperText={errors.name}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth label="Owner name"
                    value={form.ownerName} onChange={set('ownerName')}
                    error={!!errors.ownerName} helperText={errors.ownerName}
                    sx={{ mb: 2 }}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth label="Mobile number"
                        value={form.mobile}
                        onChange={e => setForm(p => ({ ...p, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                        error={!!errors.mobile} helperText={errors.mobile}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth label="Email" type="email"
                        value={form.email} onChange={set('email')}
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Hostel type</Typography>
                  <Stack direction="row" spacing={1}>
                    {GENDER_OPTIONS.map(g => (
                      <Chip
                        key={g.value}
                        label={`${g.emoji} ${g.value}`}
                        variant={form.gender === g.value ? 'filled' : 'outlined'}
                        color={form.gender === g.value ? 'primary' : 'default'}
                        onClick={() => setForm(p => ({ ...p, gender: g.value }))}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ mb: 2.5 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Address
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth label="City"
                        value={form.city} onChange={set('city')}
                        error={!!errors.city} helperText={errors.city}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth label="Area / Locality"
                        value={form.area} onChange={set('area')}
                        error={!!errors.area} helperText={errors.area}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth label="Pincode"
                        value={form.pincode}
                        onChange={e => setForm(p => ({ ...p, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                        error={!!errors.pincode} helperText={errors.pincode}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth label="Landmark (optional)"
                        value={form.landmark} onChange={set('landmark')}
                      />
                    </Grid>
                  </Grid>

                  {/* Map placeholder */}
                  <Box
                    sx={{
                      height: 140, borderRadius: 2, mt: 2,
                      background: 'linear-gradient(135deg, #E8EEF4 0%, #D0DFF0 40%, #C5D5E8 100%)',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      border: '1.5px dashed', borderColor: 'primary.light',
                      cursor: 'pointer', '&:hover': { borderColor: 'primary.main' },
                    }}
                  >
                    <Box sx={{ fontSize: 32, mb: 0.5 }}>📍</Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      Tap to select location on map
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      Lat/Lng auto-filled after selection
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Right column */}
            <Grid item xs={12} md={5}>
              <Card sx={{ mb: 2.5 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Amenities
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" sx={{ gap: 1 }}>
                    {AMENITIES.map(a => (
                      <AmenityChip
                        key={a} label={a}
                        selected={amenities.includes(a)}
                        onClick={() => toggleAmenity(a)}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ mb: 2.5 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Description
                  </Typography>
                  <TextField
                    fullWidth multiline rows={4}
                    label="About your hostel"
                    value={form.description} onChange={set('description')}
                    error={!!errors.description} helperText={errors.description}
                    placeholder="Describe your hostel, nearby landmarks, rules, and facilities..."
                  />
                </CardContent>
              </Card>

              <Card sx={{ mb: 2.5 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Photos
                  </Typography>
                  <Box
                    sx={{
                      border: '2px dashed', borderColor: 'divider',
                      borderRadius: 2, p: 3, textAlign: 'center',
                      cursor: 'pointer', '&:hover': { borderColor: 'primary.main' },
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: 36, color: 'text.disabled', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">Upload hostel photos</Typography>
                    <Typography variant="caption" color="text.disabled">
                      Minimum 3 photos required
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Button
                fullWidth variant="contained" size="large"
                onClick={handleSubmit} disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Save hostel'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Snackbar
          open={success} autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success">Hostel saved successfully!</Alert>
        </Snackbar>
      </Box>
    </AppLayout>
  );
}
